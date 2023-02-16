import React, {useContext, useState} from 'react';
import styles from "../../styles/dashboard/dashboard.module.css";
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import WorkerModal from "../../components/modals/WorkerModal";
import Workers from "../../components/lists/Workers";
import {sortDataInputsAndWorkerCheckbox} from "../../utils/dataSorting";
import {userService} from "../../components/service/userInstance";
import {AuthContext} from "../../context/context";
import {IWorkerData} from "../../interfaces/interfaces";


const Dashboard = () => {
const [isModalOpen,setIsModalOpen]=useState<boolean>(false);
const [workerData, setWorkerData] = useState<IWorkerData[]>([])

    const authContext = useContext(AuthContext);
    async function submitForm (data: any) {
        let arrayData = sortDataInputsAndWorkerCheckbox(data);
        await userService
            .createParser(
                {
                    filter: arrayData[1],
                    serviceUserAccountId: 1,
                    title: arrayData[0].title,
                    description: arrayData[0].description,
                    companyUserId: 1,
                    timer: arrayData[0].timer,
                    dictionaryId: 1,
                },
                authContext.token
            )
            .then((response: any) => {
              setWorkerData([...workerData,response.data])
                setIsModalOpen(false)


            })
            .catch(function (error: any) {
                console.log(error.response);
            });
    }


    return (
        <div >
            <SidebarMenu />

            {workerData.map((e:IWorkerData)=> {
              return  <Workers
              title={e.title}
              />
            })}

<AddCircleOutlinedIcon  sx={{fontSize:'90px'}} className={styles.plus_button} onClick={()=>setIsModalOpen(!isModalOpen)}/>
            <WorkerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} submitForm={submitForm}  />
        </div>
    );
};

export default Dashboard;