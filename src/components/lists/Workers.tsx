import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/dashboard/dashboard.module.css";
import { IError } from "../../interfaces/commonInterfaces";
import VertMenu from "../buttons/verticalMenu/VertMenu";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import { userService } from "../service/userInstance";
import { Context } from "../../context/context";
import Jobs from "./Jobs";
import Loader from "../loader/Loader";
import {
  IGetJobsResponse,
  IJobs,
  IWorkersProps,
} from "../../interfaces/dashboardInterfaces";

const Workers = ({
  title,
  status,
  description,
  id,
  getWorkers,
  isPasswordModalOpen,
  setIsPasswordModalOpen,
  accountId,
  accountName,
  setAccountUserName,
  setAccountUserId,
}: IWorkersProps) => {
  const context = useContext(Context);

  const options = ["Delete"];

  const [job, setJob] = useState<IJobs[]>(
    JSON.parse(localStorage.getItem(`${id}`) || "[]") || []
  );
  const [startWorkerLoading, setStartWorkerLoading] = useState<boolean>(false);

  async function startWorker() {
    setStartWorkerLoading(true);
    await userService
      .startParser(
        {
          serviceUserAccountId: accountId,
          parserId: id,
          companyUserId: 1,
        },
        context.token
      )
      .then(() => {
        getWorkers();
      })
      .catch(function (error: IError) {
        setStartWorkerLoading(false);
        if (
          error.response.data.description ===
          "Service user account must be started"
        ) {
          localStorage.setItem("isAccountStarted", JSON.stringify(false));
          clickForStart();
        }
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }
  async function stopWorker() {
    await userService
      .stopParser(
        {
          serviceUserAccountId: accountId,
          parserId: id,
          companyUserId: 1,
        },
        context.token
      )
      .then(() => {
        getWorkers();
      })
      .catch(function (error: IError) {
        if (
          error.response.data.description ===
          "Service user account must be started"
        ) {
          localStorage.setItem("isAccountStarted", JSON.stringify(false));
          clickForStop();
        }
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }

  async function getJobs() {
    await userService
      .getParsersById(1, id, context.token)
      .then((response: IGetJobsResponse) => {
        localStorage.setItem(`${id}`, JSON.stringify(response.data.jobs));
        setJob(response.data.jobs);
        if (response.data.jobs.length != 0) {
          setStartWorkerLoading(false);
          getWorkers();
        }
      })
      .catch(function (error: IError) {
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }

  useEffect(() => {
    let timer = setInterval(() => {
      if (status === "started") {
        getJobs();
      }
    }, 5000);
    if (status === "stopped") {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [status]);

  function clickForStart() {
    if (
      JSON.parse(localStorage.getItem("isAccountStarted") || "false ") == false
    ) {
      setAccountUserName(accountName);
      setAccountUserId(accountId);
      setIsPasswordModalOpen(!isPasswordModalOpen);
    } else {
      startWorker();
    }
  }

  function clickForStop() {
    if (
      JSON.parse(localStorage.getItem("isAccountStarted") || "false ") == false
    ) {
      setAccountUserName(accountName);
      setAccountUserId(accountId);
      setIsPasswordModalOpen(!isPasswordModalOpen);
    } else {
      stopWorker();
    }
  }

  async function removeWorker() {
    await userService
      .deleteParser(id, accountId, 1, context.token)
      .then(() => {
        getWorkers();
        localStorage.removeItem(`${id}`);
      })
      .catch(function (error: IError) {
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }

  return (
    <>
      <div className={styles.worker}>
        <div className={styles.worker_head}>
          <p>{title}</p>
          {status === "stopped" ? (
            <div className={styles.stopStart_button}>
              {" "}
              <button onClick={clickForStart}>
                <PlayCircleFilledWhiteOutlinedIcon />
              </button>
              start
            </div>
          ) : (
            <div>
              <button onClick={clickForStop}>
                <PauseCircleOutlineOutlinedIcon />
              </button>
              stop
            </div>
          )}
          <VertMenu options={options} removeWorker={removeWorker} />
        </div>
        <div className={styles.workerBodyInfo}>
          <p>
            <b>Status:</b> {status}
          </p>
          <p>
            <b>New jobs:</b>{" "}
          </p>
          <p>
            <b>Jobs count:</b>
          </p>
          <p>
            <b>Description:</b>
            {description}
          </p>

          <hr/>

          {!startWorkerLoading ? (
            job.map((el: IJobs) => {
              return (
                <Jobs
                  id={id}
                  key={el.id}
                  title={el.title}
                  description={el.description}
                  postedOn={el.postedOn}
                  skills={el.skills}
                  scoring={el.scoring}
                  url={el.url}
                />
              );
            })
          ) : (
            <>
              <div style={{ height: "200px", width: "auto" }}>
                <Loader />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Workers;
