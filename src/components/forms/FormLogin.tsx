import React from "react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import styles from "../../styles/formLogin/login.module.css";
import { schema } from "../schemas/Schema";
import { ISubmitEmailAndPassword } from "../../interfaces/commonInterfaces";

interface IFormLoginProps {
  submitLoginForm: (data: ISubmitEmailAndPassword) => void;
  isValidLogin: boolean;
  setIsValidLogin: (isValidLogin: boolean) => void;
}

const FormLogin = ({
  submitLoginForm,
  isValidLogin,
  setIsValidLogin,
}: IFormLoginProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitEmailAndPassword>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  return (
    <form
      className={styles.login_form}
      onSubmit={handleSubmit(submitLoginForm)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            placeholder="Enter your email"
            margin="normal"
            size="small"
            error={!!errors.email}
            helperText={errors?.email?.message}
            onClick={() => setIsValidLogin(false)}
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            id="filled-basic"
            label="Password"
            variant="outlined"
            type="password"
            size="small"
            placeholder="Enter your password"
            margin="normal"
            error={!!errors.password}
            helperText={errors?.password?.message}
            onClick={() => setIsValidLogin(false)}
            {...field}
          />
        )}
      />
      {isValidLogin ? <p> User don't exist!</p> : ""}
      <Button
        variant="contained"
        size="small"
        type="submit"
        sx={{
          width: 150,
          background: "#6495ed",
        }}
      >
        Log in
      </Button>
    </form>
  );
};

export default FormLogin;
