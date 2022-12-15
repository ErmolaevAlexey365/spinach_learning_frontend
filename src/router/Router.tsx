import React from "react";
import { Navigate, Route, Routes } from "react-router";

import Login from "../pages/login/Login";
import Authorization from "../pages/authorization/Authorization";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../components/context/context";
import Menu from "../pages/menu/Menu";


const Router = () => {
  const [isUserLogin, setIsUserLogin] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>(" ");
  const [isUserAuth, setIsUserAuth] = React.useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        isUserLogin,
        setIsUserLogin,
        token,
        setToken,
        isUserAuth,
        setIsUserAuth,
      }}
    >
      <BrowserRouter>
        {isUserAuth ? (
          <Routes>
            <Route path="/*" element={<Navigate to="/Menu" replace />} />
            <Route path="/Menu" element={<Menu />} />
          </Routes>
        ) : isUserLogin ? (
          <Routes>
            <Route path="/*" element={<Navigate to="/Auth" replace />} />
            <Route path="/Auth" element={<Authorization />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/Login" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Router;
