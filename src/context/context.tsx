import React, { createContext } from "react";


type AuthContextType = {
  isUserLogin: boolean | null;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isUserAuth: boolean | null;
  setIsUserAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType | any>(null);
