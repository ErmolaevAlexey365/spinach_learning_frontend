import React, {useState} from 'react';
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import styles from "../../styles/profile/profile.module.css";
import MenuIcon from "@mui/icons-material/Menu";

const Accounts = () => {
    const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)
    return (
        <div>
            <button className={styles.menu_button} onClick={()=>setIsMenuOpen(!isMenuOpen)}><MenuIcon/></button>
            accounts page
            <SidebarMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}></SidebarMenu>
        </div>
    );
};

export default Accounts;