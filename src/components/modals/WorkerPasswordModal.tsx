import React, { useContext, useEffect, useMemo, useState } from "react";
import { IError } from "../../interfaces/commonInterfaces";
import styles from "../../styles/dashboard/dashboard.module.css";
import { Button, FormHelperText, TextField } from "@mui/material";
import { userService } from "../service/userInstance";
import { Context } from "../../context/context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import Loader from "../loader/Loader";
import { IWorkerPasswordModalProps } from "../../interfaces/dashboardInterfaces";
import { createPortal } from "react-dom";

interface IWorkerPasswordModalForm {
  password: string;
}

const WorkerPasswordModal = ({
  isPasswordModalOpen,
  setIsPasswordModalOpen,
  accountUserName,
  accountUserId,
}: IWorkerPasswordModalProps) => {
  const [invalidPasswordError, setInvalidPasswordError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<IWorkerPasswordModalForm>({
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

  const modalPasswordRootElement = document.querySelector("#modal");

  const element = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (modalPasswordRootElement) modalPasswordRootElement.appendChild(element);
    return () => {
      if (modalPasswordRootElement)
        modalPasswordRootElement.removeChild(element);
    };
  }, []);

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
      .then(() => {
        setIsLoading(false);
        setIsPasswordModalOpen(false);
        localStorage.setItem("isAccountStarted", JSON.stringify(true));
      })
      .catch(function (error: IError) {
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
  if (isPasswordModalOpen) {
    return createPortal(
      <div
        className={styles.modals_open}
        onClick={(e: React.MouseEvent<HTMLDivElement>) =>
          clickHandlerForClosePasswordModal(e)
        }
      >
        <form
          className={styles.password_form}
          onSubmit={handleSubmit((data: any) => {
            accountUserLogin(data);
          })}
          onClick={(e: React.FormEvent<HTMLFormElement>) => e.stopPropagation()}
        >
          <h3>Please enter a password from {accountUserName} Upwork account</h3>

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
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                clickHandlerForClosePasswordModal(e)
              }
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
      </div>,
      element
    );
  }
  return null;
};

export default WorkerPasswordModal;
