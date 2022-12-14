import React, { useEffect, useRef, ClipboardEvent } from "react";

import styles from "../../styles/formAuth/formAuth.module.css";
import { IFormAuth } from "../../interfaces/interfaces";

const FormAuth = ({
  submitAuthCode,
  authCode,
  setAuthCode,
  isValidCode,
}: IFormAuth) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = React.useState<number>(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, [focus]);

  const copyAuthCode = (event: ClipboardEvent<HTMLInputElement>) => {
    let a = event.clipboardData?.getData("text").split("");

    const arr = [...a, ...authCode].slice(0, 6);
    setAuthCode(arr);
  };

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

  let counterFullInput = 0;
  for (let i = 0; i <= 5; i++) {
    if (authCode[i] !== "") {
      counterFullInput++;
    }
  }
  if (counterFullInput == 6) {
    submitAuthCode();
  }

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
                key={index}
                className={styles.grid_input}
                value={authCode[index]}
                maxLength={1}
                ref={index === focus ? inputRef : null}
                onChange={(e) => changeHandlerCode(e, index)}
                onPaste={copyAuthCode}
              />
            </React.Fragment>
          );
        })}
      </div>

      {!isValidCode ? (
        <p style={{ textAlign: "center" }}>Incorrect code</p>
      ) : (
        ""
      )}
    </form>
  );
};

export default FormAuth;
