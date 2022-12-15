import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../components/context/context";
import "../login/Login.css";

const Authorization = () => {
  const [code, setCode] = React.useState<string>("");
  const [isValidCode, setIsValidCode] = React.useState<boolean>(true);
  const changeHandlerCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const clickHandlerCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitAuthCode();
  };
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
    <form className="login_form">
      <input
        style={{ borderColor: `${!isValidCode ? "red" : "black"}` }}
        className="login_input"
        type="text"
        placeholder="Enter code"
        value={code}
        onChange={changeHandlerCode}
      ></input>
      {!isValidCode ? <p>Incorrect code</p> : ""}
      <button className="login_button" onClick={clickHandlerCode}>
        Submit
      </button>
    </form>
  );
};

export default Authorization;
