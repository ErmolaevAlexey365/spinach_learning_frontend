import React, { useContext } from "react";
import styles from "../../styles/accounts/accounts.module.css";
import { IUserAccountProps } from "../../interfaces/interfaces";
import { Button } from "@mui/material";
import { userService } from "../service/userInstance";
import { Context } from "../../context/context";

const UserAccount = ({
  name,
  avatar,
  description,
  id,
  getAccounts,
}: IUserAccountProps) => {
  const context = useContext(Context);

  function handlerRemoveUserAccount(e: React.MouseEvent<HTMLButtonElement>) {
    removeUserAccount(id);
    getAccounts();
  }

  async function removeUserAccount(id: number) {
    await userService
      .deleteAccountsData(id, id, context.token)
      .then((response: any) => {})
      .catch(function (error: any) {
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }

  return (
    <div className={styles.userAccount}>
      <img src={avatar} />
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
