import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/context";
import "../../components/forms/FormAuth.module.css";
import FormAuth from "../../components/forms/FormAuth";

const Authorization = () => {
  const [isValidCode, setIsValidCode] = React.useState<boolean>(true);
  const [authCode, setAuthCode] = React.useState<string[]>(
    new Array(6).fill("")
  );
  let code = authCode.join("");

  const authContext = useContext(AuthContext);
  let Token: string | null;
  if (authContext) {
    Token = authContext.token;
  }

  async function submitAuthCode() {
    try {
      await axios
        .get(`http://localhost:5000/api/user/login/${code}`, {
          headers: { Authorization: "Bearer " + Token },
        })
        .then((response) => {
          if (authContext) {
            authContext.setIsUserAuth(true);
          }
        });
    } catch (e) {
      console.log("err");
      setIsValidCode(false);
    }
  }

  return (
    <FormAuth
      submitAuthCode={submitAuthCode}
      authCode={authCode}
      setAuthCode={setAuthCode}
    ></FormAuth>
  );
};

export default Authorization;
