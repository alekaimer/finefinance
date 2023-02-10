import fetchMock from "jest-fetch-mock";
import { act, renderHook } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import { AuthContext, AuthProvider, useAuth } from "./auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../config/consts";

jest.mock("expo-apple-authentication", () => {});

jest.mock("expo-auth-session");

fetchMock.enableMocks();

describe("Auth Hook", () => {
  beforeEach(async () => {
    await AsyncStorage.removeItem(USER_KEY);
  });

  it("should be able to sign in with Google account existing", async () => {
    const googleMocked = jest.mocked(startAsync as any);
    googleMocked.mockResolvedValueOnce({
      type: "success",
      params: {
        accessToken: "any_token",
      },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "any_id",
        email: "john.doe@email.com",
        given_name: "John",
        family_name: "Doe",
        picture: "any_photo.png",
      })
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
    expect(result.current.user.email).toBeTruthy();
    expect(result.current.user.name).toBeTruthy();
    expect(result.current.user.id).toBeTruthy();
  });

  it("Should not connect if user cancel authentication with Google", async () => {
    const googleMocked = jest.mocked(startAsync as any);
    googleMocked.mockResolvedValueOnce({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });

  it("Should be error with incorrectly Google parameters", async () => {
    // const googleMocked = jest.mocked(startAsync as any);
    // googleMocked.mockRejectedValue({});

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
