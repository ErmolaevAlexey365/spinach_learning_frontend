import React, { useContext } from "react";
import { AuthContext } from "../../context/context";
import  styles from '../menu/Menu.module.css'


const Menu = () => {
  const authContext = useContext(AuthContext);
  const clickHandlerLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (authContext) {
      authContext.setIsUserAuth(false);
      authContext.setIsUserLogin(false)
    }
  };
  return (
    <div>
      <button className={styles.log_out_button} onClick={clickHandlerLogOut}>
        {" "}
        Log out{" "}
      </button>
      Hi Lesha!
    </div>
  );
};

export default Menu;
