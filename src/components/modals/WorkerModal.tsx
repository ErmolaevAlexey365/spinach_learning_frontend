import React from 'react';
import {IOpenModalButton} from "../../interfaces/interfaces";
import styles from '../../styles/dashboard/dashboard.module.css';
import CloseIcon from "@mui/icons-material/Close";

import WorkerFormComponents from "../forms/worker/WorkerForm";


const WorkerModal = ({  isModalOpen,setIsModalOpen }:IOpenModalButton) => {

  const clickHandlerForCloseModal = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.preventDefault()


      setIsModalOpen(!isModalOpen)


  };
  return (
    <>
      <div
        className={isModalOpen ? styles.modal_open : styles.modal_close} onClick={(e)=>clickHandlerForCloseModal(e)}

      >
        <div
          className={styles.form_div} onClick={(e)=>e.stopPropagation()}


        >
            <button className={styles.cross_button} onClick={clickHandlerForCloseModal}> <CloseIcon /></button>
            <WorkerFormComponents clickHandlerForCloseModal={clickHandlerForCloseModal}/>

        </div>

      </div>
    </>
  );
};

export default WorkerModal;