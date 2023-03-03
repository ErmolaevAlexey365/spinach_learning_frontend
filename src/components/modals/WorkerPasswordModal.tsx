import React, { useContext, useState } from "react";
import {
  IOpenPasswordModal,
  IWorkerModalPassword,
} from "../../interfaces/interfaces";
import styles from "../../styles/dashboard/dashboard.module.css";
import { Button, FormHelperText, TextField } from "@mui/material";
import { userService } from "../service/userInstance";
import { Context } from "../../context/context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import Loader from "../loader/Loader";

const WorkerPasswordModal = ({
  isPasswordModalOpen,
  setIsPasswordModalOpen,
  accountUserName,
  accountUserId,
}: IOpenPasswordModal) => {
  const [invalidPasswordError, setInvalidPasswordError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<IWorkerModalPassword>({
    mode: "onSubmit",
    resolver: yupResolver(
      yup
        .object({
          password: yup.string().required("This is a required field"),
        })
        .required()
    ),
  });

  const context = useContext(Context);

  const clickHandlerForClosePasswordModal = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();

    setIsPasswordModalOpen(!isPasswordModalOpen);
    setInvalidPasswordError("");
    setIsLoading(false);
    reset();
  };

  async function accountUserLogin(data: any) {
    setIsLoading(true);
    await userService
      .accountUserLogin(
        {
          companyUserId: 1,
          serviceUserAccountId: accountUserId,
          password: data.password,
          dictionaryId: 1,
        },
        context.token
      )
      .then((response: any) => {
        setIsLoading(false);
        setIsPasswordModalOpen(false);
        localStorage.setItem("isAccountStarted", JSON.stringify(true));
      })
      .catch(function (error: any) {
        if (
          error.response.data.description ===
          "Service user account invalid password"
        ) {
          setInvalidPasswordError(error.response.data.description);
        }
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
        setIsLoading(false);
      });
  }

  return (
    <>
      {isPasswordModalOpen ? (
        <div
          className={styles.modal_open}
          onClick={(e) => clickHandlerForClosePasswordModal(e)}
        >
          <form
            className={styles.password_form}
            onSubmit={handleSubmit((data: any) => {
              accountUserLogin(data);
            })}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>
              Please enter a password from {accountUserName} Upwork account
            </h3>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Enter a password"
                  variant="outlined"
                  size="small"
                  type="password"
                  onClick={() => setInvalidPasswordError("")}
                  error={!!errors.password}
                  {...field}
                />
              )}
            />
            <FormHelperText
              style={{ background: "#e5f4ff", margin: "0", color: "#d32f2f" }}
            >
              {invalidPasswordError ? (
                <p>{invalidPasswordError}</p>
              ) : (
                <p>{errors.password?.message}</p>
              )}
            </FormHelperText>
            {isLoading ? <Loader /> : ""}

            <div className={styles.password_form_buttons}>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => clickHandlerForClosePasswordModal(e)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                type="submit"
                onSubmit={accountUserLogin}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default WorkerPasswordModal;
