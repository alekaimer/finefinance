import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";

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
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = "226896288477-fl5gko03qbvqqafn866brjrm6fbf2bpd.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@alekaimer/gofinance";
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

        console.log(userInfo); //remove this line in production environment

        setUser({
          id: userInfo.id,
          name: `${userInfo.given_name} ${userInfo.family_name}`,
          email: userInfo.email,
          photo: userInfo.picture,
        });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthContext, AuthProvider, useAuth };
