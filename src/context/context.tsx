import React, {createContext} from "react";

type AuthContextType = {
  isUserLogin: boolean | null;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isUserAuth: boolean | null;
  setIsUserAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen:boolean;
  setIsMenuOpen:React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | any>(null);

