import { act, renderHook } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./auth";

jest.mock('expo-apple-authentication', () => {});

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();

  });
});