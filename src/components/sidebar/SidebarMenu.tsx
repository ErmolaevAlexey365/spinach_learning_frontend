import List from "@mui/material/List";
import React, {useContext} from "react";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styles from "../../styles/sidebarMenu/sidebarMenu.module.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/context";
import { NavLink } from "react-router-dom";
import MenuButton from "../buttons/menuButton/MenuButton";

const SidebarMenu = () => {

  const authContext = useContext(AuthContext);
  const clickHandlerLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("Token");
    authContext.setIsUserAuth(false);
    authContext.setIsUserLogin(false);
  };


  return (
      <>
      <MenuButton ></MenuButton>
    <div className={authContext.isMenuOpen ? styles.sidebar_open : styles.sidebar_close}>
      <button
        className={styles.cross_button}
        onClick={() => authContext.setIsMenuOpen(!authContext.isMenuOpen)}
      >
        <CloseIcon />
      </button>
      <List
        sx={{
          width: 300,
        }}
      >
        <NavLink to="/profile">
          {({ isActive }) => (
            <ListItemButton
              className={isActive ? styles.activeLink : undefined}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          )}
        </NavLink>

        <NavLink to="/dashboard">
          {({ isActive }) => (
            <ListItemButton
              className={isActive ? styles.activeLink : undefined}
            >
              <ListItemIcon>
                <GridViewIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          )}
        </NavLink>

        <NavLink to="/accounts">
          {({ isActive }) => (
            <ListItemButton
              className={isActive ? styles.activeLink : undefined}
            >
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItemButton>
          )}
        </NavLink>
        <NavLink to="/dictionaries">
          {({ isActive }) => (
            <ListItemButton
              className={isActive ? styles.activeLink : undefined}
            >
              <ListItemIcon>
                <CollectionsBookmarkOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dictionaries" />
            </ListItemButton>
          )}
        </NavLink>
      </List>
      <Button
        className={styles.log_out_button}
        variant="contained"
        onClick={clickHandlerLogOut}
      >
        Log out
      </Button>
    </div>
      </>
  );
};

export default SidebarMenu;
