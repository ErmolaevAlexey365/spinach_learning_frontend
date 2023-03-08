import React, { useEffect, useRef, ClipboardEvent } from "react";
import styles from "../../styles/formAuth/formAuth.module.css";

export interface IFormAuthProps {
  submitAuthCode: () => void;
  authCode: string[];
  setAuthCode: (authCode: string[]) => void;
  isValidCode: boolean;
}

const FormAuth = ({
  submitAuthCode,
  authCode,
  setAuthCode,
  isValidCode,
}: IFormAuthProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = React.useState<number>(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, [focus]);

  useEffect(() => {
    let count = 0;
    authCode.map((e) => {
      if (e) {
        count++;
      }
    });
    if (count === 6) {
      submitAuthCode();
    } else {
      return;
    }
  }, [authCode]);

  const keyPressHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.code === "Backspace" && (!authCode[index + 1] || !authCode[index])) {
      setFocus(index - 1);
    }
    if (e.code === "Backspace" && authCode[index]) {
      setFocus(index);
    }
  };

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
    setAuthCode(array);
    if (!array[index]) {
      return;
    } else {
      setFocus(index + 1);
    }
  };

  return (
    <form className={styles.auth_form}>
      <p style={{ textAlign: "center", fontSize: "20px" }}>
        Enter your auth code
      </p>
      <div className={styles.gridForCode}>
        {authCode.map((v: string, index: number) => {
          return (
            <React.Fragment>
              <input
                key={index}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  keyPressHandler(e, index)
                }
                className={styles.grid_input}
                value={authCode[index]}
                maxLength={1}
                ref={index === focus ? inputRef : null}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeHandlerCode(e, index)
                }
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
