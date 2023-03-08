import React from "react";
import styles from "../../styles/profile/profile.module.css";
import { Avatar, Button, TextField } from "@mui/material";
import photo from "../../assets/img/CatFive.jpg";
import CreateIcon from "@mui/icons-material/Create";

interface IGetUsersData {
  id?: number;
  email?: string;
  firstname?: string;
  lastname?: string;
}

export interface IFormUserDataProps {
  clickHandlerForCansel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  clickHandlerForSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userData: IGetUsersData;
  setUserData: (elem: IGetUsersData) => void;
  setIsDisabled: (isDisabled: boolean) => void;
  isDisabled: boolean;
}

const FormUserData = ({
  clickHandlerForCansel,
  clickHandlerForSubmit,
  userData,
  setUserData,
  setIsDisabled,
  isDisabled,
}: IFormUserDataProps) => {
  function editHandler() {
    setIsDisabled(!isDisabled);
  }
  return (
    <div className={styles.userData_form}>
      <div className={styles.avatarAndEdit_buttons}>
        <Avatar
          alt="Remy Sharp"
          src={photo}
          sx={{ "&:hover": { width: 56, height: 56 } }}
        />
        <button onClick={editHandler}>
          <CreateIcon />
        </button>
      </div>

      <p>ID</p>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        margin="none"
        disabled
        defaultValue={userData.id}
      />
      <p>Email</p>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        margin="none"
        disabled
        defaultValue={userData.email}
      />
      <p>Firstname</p>

      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        margin="none"
        defaultValue={userData.firstname}
        disabled={!isDisabled}
        value={userData.firstname}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUserData({ ...userData, firstname: e.target.value });
        }}
        error={!userData.firstname}
        helperText={!userData.firstname ? "Required filed!" : ""}
      />
      <p>Lastname</p>

      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        margin="none"
        disabled={!isDisabled}
        value={userData.lastname}
        error={!userData.lastname}
        helperText={!userData.lastname ? "Required filed!" : " "}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUserData({ ...userData, lastname: e.target.value });
        }}
        defaultValue={userData.lastname}
      />
      {isDisabled ? (
        <div className={styles.canselSave_buttons}>
          <Button
            variant="contained"
            size="small"
            onClick={clickHandlerForCansel}
          >
            Cansel
          </Button>
          <Button
            variant="contained"
            size="small"
            type="submit"
            onClick={clickHandlerForSubmit}
          >
            Save
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormUserData;
