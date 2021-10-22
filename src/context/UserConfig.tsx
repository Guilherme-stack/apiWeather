import React, { createContext, useState, useContext } from 'react';
type UserConfigContextProps = {
  userConfig: UserConfig | undefined;
  setUserConfig: any;
};

type UserConfigProviderProps = {
  children: React.ReactNode;
};

type UserConfig = {
  name: string;
  size: string;
};
const UserConfigContext = createContext({} as UserConfigContextProps);

export default function UserProvider({ children }: UserConfigProviderProps) {
  const [userConfig, setUserConfig] = useState({
    name: '',
    size: '',
  });
  return (
    <UserConfigContext.Provider
      value={{
        userConfig,
        setUserConfig,
      }}
    >
      {children}
    </UserConfigContext.Provider>
  );
}

export function useUserConfig() {
  const context = useContext(UserConfigContext);
  const { userConfig, setUserConfig } = context;
  return { userConfig, setUserConfig };
}
