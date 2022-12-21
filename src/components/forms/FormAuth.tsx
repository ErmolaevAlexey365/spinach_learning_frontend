import React, { useEffect, useRef } from "react";
import IFormAuth from "../../interfaces/IPropsForFormAuth";
import styles from '../forms/FormAuth.module.css'


const FormAuth = ({ submitAuthCode, authCode, setAuthCode }: IFormAuth) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = React.useState<number>(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, [focus]);

  const changeHandlerCode = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const array = [...authCode];
    array[index] = e.target.value;
    setFocus(index + 1);
    setAuthCode(array);
    if (!array[index]) setFocus(index - 1);
    else setFocus(index + 1);
  };

  const clickHandlerCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitAuthCode();
  };
  return (
    <form className={styles.auth_form}>
      <p style={{ textAlign: "center", fontSize: "20px" }}>
        Enter your auth code
      </p>
      <div className={styles.grid_for_code}>
        {authCode.map((v, index) => {
          return (
            <React.Fragment>
              <input
                className={styles.grid_input}
                value={authCode[index]}
                maxLength={1}
                ref={index === focus ? inputRef : null}
                onChange={(e) => changeHandlerCode(e, index)}
              />
            </React.Fragment>
          );
        })}
      </div>

      <button className={styles.login_button} onClick={clickHandlerCode}>
        Submit
      </button>
    </form>
  );
};

export default FormAuth;
