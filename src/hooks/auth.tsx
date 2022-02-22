import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

import * as Google from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthProviderProps {
  children: ReactNode;
};

interface UserProps {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

interface IAuthContextDataProps {
  user: UserProps;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
};

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
};

const AuthContext = createContext({} as IAuthContextDataProps);

function AuthProvider({ children }:AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const collectionKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await Google.startAsync({ authUrl }) as AuthorizationResponse

      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)

        const userInfo = await response.json();

        const userLoggedIn = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        }

        setUser(userLoggedIn);
        await AsyncStorage.setItem(collectionKey, JSON.stringify(userLoggedIn));
      }

    } catch (error) {
      throw new Error(error as string);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if(credential) {
        const userLoggedIn = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: `https://ui-avatars.com/api/?name=${credential.fullName!.givenName!}&length=1`
        }

        setUser(userLoggedIn);
        await AsyncStorage.setItem(collectionKey, JSON.stringify(userLoggedIn));
      }

    } catch (error) {
      throw new Error(error as string);
    }
  }

  async function signOut() {
    setUser({} as UserProps);
    await AsyncStorage.removeItem(collectionKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(collectionKey)

      if(userStorage) {
        const userLogged = JSON.parse(userStorage) as UserProps;
        setUser(userLogged);
      }
      setUserStorageLoading(false);
    }
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
      signInWithApple,
      signOut,
      userStorageLoading
    }}>
      { children }
    </AuthContext.Provider>
  )
};

function useAuth() {
  const context = useContext(AuthContext);
  return context
}

export { AuthProvider, useAuth }