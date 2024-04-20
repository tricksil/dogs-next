'use client';

import logout from '@/actions/logout';
import validarToken from '@/actions/validate-token';
import React from 'react';
type User = {
  id: number;
  nome: string;
  username: string;
  email: string;
};
type IUserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = React.createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null)
    throw new Error('useContext deve estar dentro do Provider');
  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [userState, setUser] = React.useState<User | null>(user);

  React.useEffect(() => {
    async function validate() {
      const { ok } = await validarToken();
      if (!ok) {
        await logout();
        setUser(null);
      }
    }
    if (userState) validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
