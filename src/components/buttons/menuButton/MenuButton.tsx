import React, {useContext} from "react";
import styles from "../../../styles/profile/profile.module.css";
import MenuIcon from "@mui/icons-material/Menu";

import {AuthContext} from "../../../context/context";

const MenuButton = () => {
  const authContext = useContext(AuthContext);
  return (
    <button
      className={styles.menu_button}
      onClick={() => authContext.setIsMenuOpen(!authContext.isMenuOpen)}
    >
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
