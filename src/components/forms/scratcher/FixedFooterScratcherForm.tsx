import React from 'react';
import styles from "../../../styles/dashboard/dashboard.module.css";
import {Button, TextField} from "@mui/material";
import {IScratchFormProps} from "../../../interfaces/interfaces";

const FixedFooterScratcherForm = ({clickHandlerForCloseModal}:IScratchFormProps) => {
    return (

            <div className={styles.fixed_modal_footer}>
                <TextField size="small" label="Sorting"   select />
                <div className={styles.footer_buttons}>
                    <Button variant="contained" onClick={clickHandlerForCloseModal} >Close</Button>
                    <Button variant="contained" >Add</Button>
                </div>
            </div>

    );
};

export default FixedFooterScratcherForm;