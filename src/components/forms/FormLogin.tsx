import React from "react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import IFormInput from "../../interfaces/IFormInput";
import IPropsForFormLogin from "../../interfaces/IPropsForFormLogin";
import styles from '../../pages/login/Login.module.css'





const FormLogin = ({ submitForm, isValidLogin }: IPropsForFormLogin) => {
  const schema = yup
    .object({
      email: yup
        .string()
        .required("This is a required field")
        .matches(/.+@.+\..+/i, "Enter correct email! "),
      password: yup.string().required("This is a required field"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  console.log(isValidLogin);
  return (
    <form className={styles.login_form} onSubmit={handleSubmit(submitForm)}>
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
            {...field}
          />
        )}
      />
      {isValidLogin ? <p> User with that email don't exist!</p> : ""}
      <Button
        variant="contained"
        size="small"
        type="submit"
        sx={{
          width: 150,
          marginTop: 2,
          background: "#6495ed",
        }}
      >
        Log in
      </Button>
    </form>
  );
};

export default FormLogin;
