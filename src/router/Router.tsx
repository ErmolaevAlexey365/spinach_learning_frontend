import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";

import Login from "../pages/login/Login";
import Authorization from "../pages/authorization/Authorization";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/context";
import MainPage from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";
import Accounts from "../pages/accounts/Accounts";
import Dictionaries from "../pages/dictionaries/Dictionaries";

const Router = () => {
  const [isUserLogin, setIsUserLogin] = React.useState<boolean>(false);
  const [isUserAuth, setIsUserAuth] = React.useState<boolean>(
    JSON.parse(localStorage.getItem("Auth") || "false ")
  );

  useEffect(() => {
    localStorage.setItem("Auth", JSON.stringify(isUserAuth));
  }, [isUserAuth]);

  return (
    <AuthContext.Provider
      value={{
        isUserLogin,
        setIsUserLogin,

        isUserAuth,
        setIsUserAuth,
      }}
    >
      <BrowserRouter>
        {isUserAuth ? (
          <Routes>
            <Route path="/*" element={<Navigate to="/profile" replace />} />
            <Route path="/profile" element={<MainPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/dictionaries" element={<Dictionaries />} />
          </Routes>
        ) : isUserLogin ? (
          <Routes>
            <Route path="/*" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Authorization />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Router;
