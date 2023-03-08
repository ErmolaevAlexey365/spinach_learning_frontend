import React from "react";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ISubmitEmailAndPassword } from "../../interfaces/commonInterfaces";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { schema } from "../schemas/Schema";
import styles from "../../styles/accounts/accounts.module.css";

interface IAccountsFormProps {
  submitAccountsForm: (data: ISubmitEmailAndPassword) => void;
}

const AccountsForm = ({ submitAccountsForm }: IAccountsFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitEmailAndPassword>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitAccountsForm)}
        className={styles.accounts_form}
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
              id="outlined-basic"
              label="Password"
              variant="outlined"
              placeholder="Enter your password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              size="small"
              type="password"
              {...field}
            />
          )}
        />
        <Button
          variant="contained"
          size="small"
          type="submit"
          sx={{
            width: 90, background: "#6495ed",
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AccountsForm;
