import { act, renderHook } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import { AuthProvider, useAuth } from "./auth";

jest.mock('expo-apple-authentication', () => {});

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: {
          access_token: 'google-token'
        }
      }
    },
    // logInAsync: () => {
    //   return {
    //     type: 'success',
    //     user: {
    //       id: 'any_id',
    //       email: 'arlan.gustavo.biati@gmail.com',
    //       name: 'Arlan',
    //       photo: 'any_photo.png'
    //     }
    //   }
    // }
  }
});

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockReturnValue({
      type: 'success',
        params: {
          access_token: 'google-token'
        }
    });

    // googleMocked.mockReturnValue({
    //   type: 'success',
    //   user: {
    //     id: 'any_id',
    //     email: 'arlan.gustavo.biati@gmail.com',
    //     name: 'Arlan',
    //     photo: 'any_photo.png'
    //   }
    // });

    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve({
    //     id: `userInfo.id`,
    //     email: `userInfo.email`,
    //     name: `userInfo.given_name`,
    //     photo: `userInfo.picture`,
    //     locale: `userInfo.locale`,
    //     verified_email: `userInfo.verified_email`
    //   })
    // })) as jest.Mock;

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();

  });

  // it('user should not connect if cancel authentication with Google', async () => {

  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: AuthProvider
  //   });

  //   await act(async () => result.current.signInWithGoogle());

  //   expect(result.current.user).not.toHaveProperty('id');

  // });
});