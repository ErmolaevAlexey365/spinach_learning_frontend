import React from 'react';
import styles from "../../../styles/dashboard/dashboard.module.css";
import {FormControlLabel, FormGroup, Switch, TextField} from "@mui/material";

const InputsScratcherForm = () => {
    return (
        <>
            <div className={styles.scratcherForm_input}>
                <TextField placeholder="Title" />

                <TextField id="outlined-select-currency" select label="Set timer" />

                <TextField placeholder="Description" multiline rows={2} maxRows={4} />

                <TextField
                    id="outlined-select-currency"
                    select
                    label="Upwork accounts"
                />
            </div>
            <FormGroup>
                <FormControlLabel
                    control={<Switch />}
                    label="Enable scoring"
                    className={styles.switch}
                />
            </FormGroup>
        </>
    );
};

export default InputsScratcherForm;