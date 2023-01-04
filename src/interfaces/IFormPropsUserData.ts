import React from "react";

export interface IFormPropsUserData {
    clickHandlerForCansel:(e: React.MouseEvent<HTMLButtonElement>) => void;
    clickHandlerForSubmit:(e: React.MouseEvent<HTMLButtonElement>) => void;
    userData:any;
    setUserData:any;
    setIsDisabled:any;
    isDisabled:boolean;
}