import React from 'react';
import styles from "../../styles/dashboard/dashboard.module.css";
import {IWorkersProps} from "../../interfaces/interfaces";

const Workers = ({ title }:IWorkersProps) => {
  return (
    <div className={styles.WorkersHead}>
        {title}
      <div className={styles.Workers}>hhhh</div>
    </div>
  );
};

export default Workers;