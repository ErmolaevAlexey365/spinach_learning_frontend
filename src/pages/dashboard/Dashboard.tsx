import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/dashboard/dashboard.module.css";
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import WorkerModal from "../../components/modals/WorkerModal";
import Workers from "../../components/lists/Workers";
import { sortDataInputsAndWorkerCheckbox } from "../../utils/dataSorting";
import { userService } from "../../components/service/userInstance";
import { Context } from "../../context/context";
import { IWorkersData } from "../../interfaces/interfaces";
import WorkerPasswordModal from "../../components/modals/WorkerPasswordModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [workerData, setWorkerData] = useState<IWorkersData[]>([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [upworkAccounts, setUpworkAccounts] = useState<string[]>([]);
  const [accountUserName, setAccountUserName] = useState<string>("");
  const [accountUserId, setAccountUserId] = useState<number>(0);

  const context = useContext(Context);

  async function submitForm(data: any) {
    let arrayData = sortDataInputsAndWorkerCheckbox(data);
    await userService
      .createParser(
        {
          filter: arrayData[1],
          serviceUserAccountId: arrayData[0].account,
          title: arrayData[0].title,
          description: arrayData[0].description,
          companyUserId: 1,
          timer: arrayData[0].timer,
          dictionaryId: null,
        },
        context.token
      )
      .then((response: any) => {
        getWorkers();
        setIsModalOpen(false);
      })
      .catch(function (error: any) {
          if (error.response.data.description === "Cannot verify token") {
              context.setIsUserLogin(false);
              context.setIsUserAuth(false);
          }
      });
  }

  async function getWorkers() {
    await userService
      .getAllParsers(context.token)
      .then((response: any) => {
        setWorkerData(response.data);
      })
      .catch(function (error: any) {
          if (error.response.data.description === "Cannot verify token") {
              context.setIsUserLogin(false);
              context.setIsUserAuth(false);
          }
      });
  }

  useEffect(() => {
    if (isModalOpen) {
      getAccounts();
    }
  }, [isModalOpen]);

  useEffect(() => {
    getWorkers();
  }, []);

  async function getAccounts() {
    await userService
      .getAccountsData(context.token)
      .then((response: any) => {
        setUpworkAccounts(response.data);
      })
      .catch(function (error: any) {
          if (error.response.data.description === "Cannot verify token") {
              context.setIsUserLogin(false);
              context.setIsUserAuth(false);
          }
      });
  }

  return (
    <div>
      <SidebarMenu />

      <div className={styles.workers}>
        {workerData.map((e: IWorkersData) => {
          return (
            <>
              <Workers
                description={e.description}
                title={e.title}
                status={e.status}
                id={e.id}
                key={e.id}
                getWorkers={getWorkers}
                setIsPasswordModalOpen={setIsPasswordModalOpen}
                isPasswordModalOpen={isPasswordModalOpen}
                accountId={e.serviceUserAccount.id}
                accountName={e.serviceUserAccount.name}
                setAccountUserName={setAccountUserName}
                setAccountUserId={setAccountUserId}
              />
            </>
          );
        })}
      </div>

      <AddCircleOutlinedIcon
        sx={{ fontSize: "90px" }}
        className={styles.plus_button}
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
      <WorkerModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        submitForm={submitForm}
        upworkAccounts={upworkAccounts}
      />
      <WorkerPasswordModal
        isPasswordModalOpen={isPasswordModalOpen}
        setIsPasswordModalOpen={setIsPasswordModalOpen}
        accountUserName={accountUserName}
        accountUserId={accountUserId}
      />
    </div>
  );
};

export default Dashboard;
