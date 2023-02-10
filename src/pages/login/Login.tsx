import React, { useContext } from "react";
import { AuthContext } from "../../context/context";
import FormLogin from "../../components/forms/FormLogin";

import { userService } from "../../components/service/userInstance";
import { IFormInput } from "../../interfaces/interfaces";

const Login = () => {
  const [isValidLogin, setIsValidLogin] = React.useState<boolean>(false);

  const authContext = useContext(AuthContext);

  async function submitForm(data: IFormInput) {
    await userService
      .login({
        email: data.email,
        password: data.password,
      })

      .then((response: any) => {
        if (authContext) {
          authContext.setIsUserLogin(true);
        }
        authContext.setToken(response.data.token)






        setIsValidLogin(false);
      })

      .catch(function (error: any) {
        if (error.response.status >= 400) {
          setIsValidLogin(true);
        }
      });
  }


  return (
    <FormLogin submitForm={submitForm} isValidLogin={isValidLogin}></FormLogin>
  );
};

export default Login;
