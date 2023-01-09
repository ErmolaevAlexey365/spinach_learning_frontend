import React from "react";


import OptionsScratcherForm from "./OptionsScratcherForm";
import InputsScratcherForm from "./InputsScratcherForm";
import FixedFooterScratcherForm from "./FixedFooterScratcherForm";
import {Typography} from "@mui/material";
import {IScratchFormProps} from "../../../interfaces/interfaces";




const ScratcherForm = ({clickHandlerForCloseModal}:IScratchFormProps) => {
  return (
    <div >
        <Typography variant="h5" component="h4" >Add scratcher</Typography>
      <InputsScratcherForm />

      <OptionsScratcherForm />
      <FixedFooterScratcherForm clickHandlerForCloseModal={clickHandlerForCloseModal}/>
    </div>
  );
};

export default ScratcherForm;
