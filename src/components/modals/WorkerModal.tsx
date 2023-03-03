import React from "react";
import { IOpenModalButton } from "../../interfaces/interfaces";
import styles from "../../styles/dashboard/dashboard.module.css";
import CloseIcon from "@mui/icons-material/Close";
import WorkerForm from "../forms/worker/WorkerForm";

const WorkerModal = ({
  isModalOpen,
  setIsModalOpen,
  submitForm,
  upworkAccounts,
}: IOpenModalButton) => {
  const clickHandlerForCloseModal = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();

    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      {isModalOpen ? (
        <div
          className={styles.modal_open}
          onClick={(e) => clickHandlerForCloseModal(e)}
        >
          <div className={styles.form_div} onClick={(e) => e.stopPropagation()}>
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
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default WorkerModal;
