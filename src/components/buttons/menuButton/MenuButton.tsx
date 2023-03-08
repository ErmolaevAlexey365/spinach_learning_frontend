import React, { useContext } from "react";
import styles from "../../../styles/profile/profile.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Context } from "../../../context/context";

const MenuButton = () => {
  const context = useContext(Context);
  return (
      <div className={styles.menu_button_div}><button
          className={styles.menu_button}
          onClick={() => context.setIsMenuOpen(!context.isMenuOpen)}
      >
        <MenuIcon />
      </button></div>

  );
};

export default MenuButton;
