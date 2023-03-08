import List from "@mui/material/List";
import React, { useContext } from "react";
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
import { Context } from "../../context/context";
import { NavLink } from "react-router-dom";
import MenuButton from "../buttons/menuButton/MenuButton";

const SidebarMenu = () => {
  const context = useContext(Context);
  const clickHandlerLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.setToken("");
    context.setIsUserAuth(false);
    context.setIsUserLogin(false);
  };

  return (
    <>
      <MenuButton></MenuButton>
      <div
        className={
          context.isMenuOpen ? styles.sidebar_div_open : styles.sidebar_div_close
        }
      >
        <div className={styles.sidebar}>
          <button
            className={styles.cross_button}
            onClick={() => context.setIsMenuOpen(!context.isMenuOpen)}
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
            className={styles.logout_button}
            variant="contained"
            onClick={clickHandlerLogOut}
          >
            Log out
          </Button>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
