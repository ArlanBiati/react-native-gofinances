import fetchMock from 'jest-fetch-mock';
import { act, renderHook } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import { AuthProvider, useAuth } from "./auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-apple-authentication', () => {});

jest.mock('expo-auth-session');

fetchMock.enableMocks();

const userTest = {
  id: 'any_id',
  email: 'arlan.gustavo.biati@gmail.com',
  name: 'Arlan',
  photo: 'any_photo.png'
};

describe('Auth Hook', () => {

  beforeEach(async () => {
    const userCollectionKey = '@gofinances:user';
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockResolvedValueOnce({
      type: 'success',
        params: {
          access_token: 'google-token'
        }
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();

  });

  it('user should not connect if cancel authentication with Google', async () => {

    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockResolvedValueOnce({
      id: 'any_id',
      email: 'arlan.gustavo.biati@gmail.com'
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');

  });

  it('should be error with incorrectly Google parameters', async () => {

    // const googleMocked = jest.mocked(startAsync as any);

    // googleMocked.mockResolvedValueOnce({
    //   id: 'any_id',
    //   email: 'arlan.gustavo.biati@gmail.com'
    // });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    try {
      await act(async () => result.current.signInWithGoogle());
    } catch (error) {
      expect(result.current.user).toEqual({});
    };
  });
});