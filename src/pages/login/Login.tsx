import React, { useContext } from "react";
import { Context } from "../../context/context";
import FormLogin from "../../components/forms/FormLogin";
import { userService } from "../../components/service/userInstance";
import { IFormInput } from "../../interfaces/interfaces";

const Login = () => {
  const [isValidLogin, setIsValidLogin] = React.useState<boolean>(false);

  const context = useContext(Context);

  async function submitForm(data: IFormInput) {
    await userService
      .login({
        email: data.email,
        password: data.password,
      })
      .then((response: any) => {
        context.setIsUserLogin(true);

        context.setToken(response.data.token);

        setIsValidLogin(false);
      })

      .catch(function (error: any) {
        if (error.response.status >= 400) {
          setIsValidLogin(true);
        }
      });
  }

  return (
    <FormLogin
      submitForm={submitForm}
      isValidLogin={isValidLogin}
      setIsValidLogin={setIsValidLogin}
    ></FormLogin>
  );
};

export default Login;
