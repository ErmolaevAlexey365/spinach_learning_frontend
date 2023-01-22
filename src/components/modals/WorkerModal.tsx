import React from 'react';
import {IOpenModalButton} from "../../interfaces/interfaces";
import styles from '../../styles/dashboard/dashboard.module.css';
import CloseIcon from "@mui/icons-material/Close";
import WorkerForm from "../forms/worker/WorkerForm";


const WorkerModal = ({  isModalOpen,setIsModalOpen }:IOpenModalButton) => {

  const clickHandlerForCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

      setIsModalOpen(!isModalOpen)


  };
  return (
    <>
      <div
        className={isModalOpen ? styles.modal_open : styles.modal_close}

      >
        <div
          className={styles.form_div}

        >
            <button className={styles.cross_button} onClick={clickHandlerForCloseModal}> <CloseIcon /></button>
            <WorkerForm clickHandlerForCloseModal={clickHandlerForCloseModal}/>

        </div>

      </div>
    </>
  );
};

export default WorkerModal;