import React, { useContext } from "react";
import { Context } from "../../context/context";
import FormLogin from "../../components/forms/FormLogin";
import { userService } from "../../components/service/userInstance";
import {
  IError,
  ISubmitEmailAndPassword,
} from "../../interfaces/commonInterfaces";

interface ISubmitLoginFormResponse {
  data: {
    token: string;
  };
}

const Login = () => {
  const [isValidLogin, setIsValidLogin] = React.useState<boolean>(false);

  const context = useContext(Context);

  async function submitLoginForm(data: ISubmitEmailAndPassword) {
    await userService
      .login({
        email: data.email,
        password: data.password,
      })
      .then((response: ISubmitLoginFormResponse) => {
        context.setIsUserLogin(true);

        context.setToken(response.data.token);

        setIsValidLogin(false);
      })

      .catch(function (error: IError) {
        if (error.response.status >= 400) {
          setIsValidLogin(true);
        }
      });
  }

  return (
    <FormLogin
      submitLoginForm={submitLoginForm}
      isValidLogin={isValidLogin}
      setIsValidLogin={setIsValidLogin}
    ></FormLogin>
  );
};

export default Login;
