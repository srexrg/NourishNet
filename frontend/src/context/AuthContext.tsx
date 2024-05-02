/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";
type AuthContextValue = {
  authUser: any;
  setAuthUser: React.Dispatch<any>;
};
export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userFromLocalStorage = localStorage.getItem("user");
  const initialAuthUser = userFromLocalStorage
    ? JSON.parse(userFromLocalStorage)
    : null;
  const [authUser, setAuthUser] = useState(initialAuthUser);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
