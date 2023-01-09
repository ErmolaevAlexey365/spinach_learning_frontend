import React from "react";
import styles from "../../../styles/profile/profile.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IMenuButton } from "../../../interfaces/interfaces";

const MenuButton = ({ setIsMenuOpen, isMenuOpen }: IMenuButton) => {
  return (
    <button
      className={styles.menu_button}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
