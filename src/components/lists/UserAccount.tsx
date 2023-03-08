import React, { useContext } from "react";
import styles from "../../styles/accounts/accounts.module.css";
import { IError } from "../../interfaces/commonInterfaces";
import { Button } from "@mui/material";
import { userService } from "../service/userInstance";
import { Context } from "../../context/context";

interface IUserAccountProps {
  id: number;
  name: string;
  avatar: string;
  description: string;
  getAccounts: () => void;
}

const UserAccount = ({
  name,
  avatar,
  description,
  id,
  getAccounts,
}: IUserAccountProps) => {
  const context = useContext(Context);

  function handlerRemoveUserAccount() {
    removeUserAccount(id);
    getAccounts();
  }

  async function removeUserAccount(id: number) {
    await userService
      .deleteAccountsData(id, id, context.token)
      .then(() => {})
      .catch(function (error: IError) {
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }

  return (
    <div className={styles.user_account}>
      <img src={avatar} alt="avatar"/>
      <div>
        {" "}
        <h3>name:</h3>
        <p>{name}</p>
      </div>
      <div>
        <h3>description:</h3>
        <p>{description}</p>
      </div>
      <Button
        variant="contained"
        size="small"
        type="submit"
        sx={{ background: "#6495ed" }}
        onClick={handlerRemoveUserAccount}
      >
        remove
      </Button>
    </div>
  );
};

export default UserAccount;
