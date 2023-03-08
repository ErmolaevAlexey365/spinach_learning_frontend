import React, { useEffect, useMemo } from "react";
import styles from "../../styles/dashboard/dashboard.module.css";
import CloseIcon from "@mui/icons-material/Close";
import WorkerForm from "../forms/worker/WorkerForm";
import { IWorkerModalProps } from "../../interfaces/dashboardInterfaces";
import { createPortal } from "react-dom";

const WorkerModal = ({
  isModalOpen,
  setIsModalOpen,
  submitForm,
  upworkAccounts,
}: IWorkerModalProps) => {
  const modalRootElement = document.querySelector("#modal");

  const element = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (modalRootElement) modalRootElement.appendChild(element);
    return () => {
      if (modalRootElement) modalRootElement.removeChild(element);
    };
  }, []);

  const clickHandlerForCloseModal = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();

    setIsModalOpen(!isModalOpen);
  };
  if (isModalOpen) {
    return createPortal(
      <div
        className={styles.modals_open}
        onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) =>
          clickHandlerForCloseModal(e)
        }
      >
        <div
          className={styles.workerFormModal_div}
          onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) =>
            e.stopPropagation()
          }
        >
          <button
            className={styles.cross_button}
            onClick={clickHandlerForCloseModal}
          >
            {" "}
            <CloseIcon />
          </button>
          <WorkerForm
            clickHandlerForCloseModal={clickHandlerForCloseModal}
            isModalOpen={isModalOpen}
            submitForm={submitForm}
            upworkAccounts={upworkAccounts}
          />
        </div>
      </div>,
        element
    );
  }
  return null;
};

export default WorkerModal;
