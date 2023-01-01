import React, { useContext } from "react";
import { AuthContext } from "../../context/context";
import FormAuth from "../../components/forms/FormAuth";
import { userService } from "../../components/service/userInstance";

const Authorization = () => {
  const [isValidCode, setIsValidCode] = React.useState<boolean>(true);
  const [authCode, setAuthCode] = React.useState<string[]>(
    new Array(6).fill("")
  );
  let code = authCode.join("");

  const authContext = useContext(AuthContext);

  async function submitAuthCode() {
    await userService
      .auth(code)

      .then((response: any) => {
        localStorage.setItem(
          "Token",
          JSON.stringify(response.data.accessToken)
        );

        if (authContext) {
          authContext.setIsUserAuth(true);
        }
      })
      .catch(function (error: any) {
        if (error.response) {
          setIsValidCode(false);
        }
      });
  }

  return (
    <FormAuth
      submitAuthCode={submitAuthCode}
      authCode={authCode}
      setAuthCode={setAuthCode}
      isValidCode={isValidCode}
    ></FormAuth>
  );
};

export default Authorization;
