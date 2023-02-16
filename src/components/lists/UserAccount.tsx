import React, {useContext} from "react";
import styles from "../../styles/accounts/accounts.module.css";
import { IUserAccountProps } from "../../interfaces/interfaces";
import { Button } from "@mui/material";
import {userService} from "../service/userInstance";
import {AuthContext} from "../../context/context";



const UserAccount = ({
  name,
  avatar,
  description,
  id,
  getAccounts,
}: IUserAccountProps) => {
  function handlerRemoveUserAccount(e: React.MouseEvent<HTMLButtonElement>) {
    removeUserAccount(id);
    getAccounts();
  }
    const authContext = useContext(AuthContext);

  async function removeUserAccount(id: number) {
    await userService
      .deleteAccountsData(id, id,authContext.token)
      .then((response: any) => {})
      .catch(function (error: any) {
        console.log(error);
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
