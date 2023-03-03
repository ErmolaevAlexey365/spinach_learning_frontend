import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "../src/pages/login/Login";
import Authorization from "../src/pages/authorization/Authorization";
import { BrowserRouter } from "react-router-dom";
import { Context } from "../src/context/context";
import Profile from "../src/pages/profile/Profile";
import Dashboard from "../src/pages/dashboard/Dashboard";
import Accounts from "../src/pages/accounts/Accounts";
import Dictionaries from "../src/pages/dictionaries/Dictionaries";

const App = () => {
  const [isUserLogin, setIsUserLogin] = React.useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUserAuth, setIsUserAuth] = React.useState<boolean>(
    JSON.parse(localStorage.getItem("Auth") || "false ")
  );

  useEffect(() => {
    localStorage.setItem("Auth", JSON.stringify(isUserAuth));
  }, [isUserAuth]);

  const [token, setToken] = useState<string>(
    JSON.parse(localStorage.getItem("tokenContext") || "[{}]")
  );

  useEffect(() => {
    localStorage.setItem("tokenContext", JSON.stringify(token));
  }, [token]);

  return (
    <Context.Provider
      value={{
        isUserLogin,
        setIsUserLogin,

        isUserAuth,
        setIsUserAuth,
        isMenuOpen,
        setIsMenuOpen,

        token,
        setToken,
      }}
    >
      <BrowserRouter>
        {isUserAuth ? (
          <Routes>
            <Route path="/*" element={<Navigate to={"/profile"} replace />} />
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
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
    </Context.Provider>
  );
};

export default App;
