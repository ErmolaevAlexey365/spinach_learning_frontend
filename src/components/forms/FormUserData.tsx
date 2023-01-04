import React from "react";
import styles from "../../styles/profile/profile.module.css";
import { Avatar, Button, TextField } from "@mui/material";
import photo from "../../assets/img/CatFive.jpg";
import CreateIcon from "@mui/icons-material/Create";
import { IFormPropsUserData } from "../../interfaces/IFormPropsUserData";

//Я пробовала переписать валидацию с помощью yup resolver, но столкнулась с тем, что пользователь может отредактировать
//только одно поле, тогда второе считается пустым и запрос не отправляется, поэтому сделала все таки без useForm

const FormUserData = ({
  clickHandlerForCansel,
  clickHandlerForSubmit,
  userData,
  setUserData,
  setIsDisabled,
  isDisabled,
}: IFormPropsUserData) => {
  function editHandler() {
    setIsDisabled(!isDisabled);
  }
  return (
    <div className={styles.user_data_form}>
      <div className={styles.avatar_and_editButton}>
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
        disabled={isDisabled ? false : true}
        value={userData.firstname}
        onChange={(e) => {
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
        disabled={isDisabled ? false : true}
        value={userData.lastname}
        error={!userData.lastname}
        helperText={!userData.lastname ? "Required filed!" : " "}
        onChange={(e) => {
          setUserData({ ...userData, lastname: e.target.value });
        }}
        defaultValue={userData.lastname}
      />
      {isDisabled ? (
        <div className={styles.buttons_canselSave}>
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
