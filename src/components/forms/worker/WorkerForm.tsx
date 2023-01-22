import React from "react";


import OptionsWorkerForm from "./OptionsWorkerForm";
import InputsWorkerForm from "./InputsWorkerForm";
import FixedFooterWorkerForm from "./FixedFooterWorkerForm";
import {Typography} from "@mui/material";
import {IScratchFormProps} from "../../../interfaces/interfaces";




const WorkerForm = ({clickHandlerForCloseModal}:IScratchFormProps) => {
  return (
    <div >
        <Typography variant="h5" component="h4" >Add worker</Typography>
      <InputsWorkerForm />

      <OptionsWorkerForm />
      <FixedFooterWorkerForm clickHandlerForCloseModal={clickHandlerForCloseModal}/>
    </div>
  );
};

export default WorkerForm;
