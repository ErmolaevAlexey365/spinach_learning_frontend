import React, {useState} from 'react';
import styles from "../../styles/dashboard/dashboard.module.css";
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ScratcherModal from "../../components/modals/ScratcherModal";


const Dashboard = () => {
const [isModalOpen,setIsModalOpen]=useState<boolean>(false);
    return (
        <div>


            <SidebarMenu />
<AddCircleOutlinedIcon  sx={{fontSize:'90px'}} className={styles.plus_button} onClick={()=>setIsModalOpen(!isModalOpen)}/>
            <ScratcherModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />
        </div>
    );
};

export default Dashboard;