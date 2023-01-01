import React, {useState} from 'react';
import styles from "../../styles/profile/profile.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenu from "../../components/sidebar/SidebarMenu";

const Dashboard = () => {
    const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)
    return (
        <div>
            dashboard page
            <button className={styles.menu_button} onClick={()=>setIsMenuOpen(!isMenuOpen)}><MenuIcon/></button>
            <SidebarMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}></SidebarMenu>
        </div>
    );
};

export default Dashboard;