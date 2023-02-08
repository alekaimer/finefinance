import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../config/consts";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  loadingUserStorage: boolean;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const { CLIENT_ID } = process.env;
  const { REDIRECT_URI } = process.env;

  const [user, setUser] = useState<User>({} as User);
  const [loadingUserStorage, setLoadingUserStorage] = useState(true);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });

      if (response.type === "success") {
        const { access_token } = response.params;

        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );

        const userInfo = await userInfoResponse.json();

        const userLogged = {
          id: String(userInfo.id),
          name: `${userInfo.given_name} ${userInfo.family_name}`,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {

        const name = credential.fullName!.givenName!;
        // const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged = {
          id: String(credential.user),
          name,
          email: credential.email!,
          photo: undefined,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function loadUserStorageData() {
    const userStorage = await AsyncStorage.getItem(USER_KEY);

    if (userStorage) {
      const userLogged = JSON.parse(userStorage) as User;
      setUser(userLogged);
    }

    setLoadingUserStorage(false);
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(USER_KEY);
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        loadingUserStorage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  
  return context;
}

export { AuthContext, AuthProvider, useAuth };
