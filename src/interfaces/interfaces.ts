import React from "react";

export  interface IFormInput {
    email: string;
    password: string;
}
export interface IFormPropsUserData {
    clickHandlerForCansel:(e: React.MouseEvent<HTMLButtonElement>) => void;
    clickHandlerForSubmit:(e: React.MouseEvent<HTMLButtonElement>) => void;
    userData:any;
    setUserData:any;
    setIsDisabled:(isDisabled:boolean)=>void;
    isDisabled:boolean;
}
export  interface IFormAuth{
    submitAuthCode:any;
    authCode:string[];
    setAuthCode:(authCode:string[])=>void;
    isValidCode:boolean;
}
export interface IPropsForFormLogin{
    submitForm:(data: IFormInput)=>void;
    isValidLogin:boolean;
}

 export interface IMenuButton{
    setIsMenuOpen:(isMenuOpen:boolean)=>void;
    isMenuOpen:boolean;
}

export interface IOpenModalButton{
    isModalOpen:boolean;
    setIsModalOpen:(isModalOpen:boolean)=>void;
}
export interface IScratchFormProps{
    clickHandlerForCloseModal:(e: React.MouseEvent<HTMLButtonElement>)=>void;


}
