import { createContext, ReactNode, useContext } from 'react';

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
};

const AuthContext = createContext({} as IAuthContextDataProps);

function AuthProvider({ children }:AuthProviderProps) {
  const user = {
    id: '1',
    name: 'Arlan Biati',
    email: 'arlan.gustavo.biati@gmail.com',
  };

  return (
    <AuthContext.Provider value={{
      user
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