import React, { createContext } from "react";

type AuthContextType = {
  isUserLogin: boolean | null;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isUserAuth: boolean | null;
  setIsUserAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

