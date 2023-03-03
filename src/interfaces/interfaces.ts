import React from "react";

export interface IFormInput {
  email: string;
  password: string;
}
export interface IFormPropsUserData {
  clickHandlerForCansel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  clickHandlerForSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userData: any;
  setUserData: any;
  setIsDisabled: (isDisabled: boolean) => void;
  isDisabled: boolean;
}
export interface IFormAuth {
  submitAuthCode: any;
  authCode: string[];
  setAuthCode: (authCode: string[]) => void;
  isValidCode: boolean;
}
export interface IPropsForFormLogin {
  submitForm: (data: IFormInput) => void;
  isValidLogin: boolean;
  setIsValidLogin: (isValidLogin: boolean) => void;
}

export interface IOpenModalButton {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  submitForm: (data: any) => void;
  upworkAccounts: string[];
}

export interface IOpenPasswordModal {
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (isPasswordModalOpen: boolean) => void;
  accountUserName: string;
  accountUserId: number;
}

export interface IScratchFormProps {
  clickHandlerForCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isModalOpen: boolean;
  submitForm: (data: any) => void;
  upworkAccounts: string[];
}
export interface IAccountsFormProps {
  submitAccountsForm: (data: IFormInput) => void;
}

export interface IUserAccountProps {
  id: number;
  name: string;
  avatar: string;
  description: string;
  getAccounts: () => void;
}

export interface IWorkerData {
  timer: number;
  account: number;
  title: string;
  description: string;
  enableScoring: boolean[] | string[];
  amount: string[] | boolean[];
  category2_uid: string[] | boolean[];
  client_hires: string[] | boolean[];
  connect_price: string[] | boolean[];
  contractor_tier: string[] | boolean[];
  duration_v3: string[] | boolean[];
  freelancers_needed: string[] | boolean[];
  hourly_rate: string[] | boolean[];
  location: string[] | string;
  payment_verified: string[] | boolean[];
  previous_clients: string[] | boolean[];
  proposals: string[] | boolean[];
  q: string[] | string;
  t: string[] | boolean[];
  timezones: string[] | string;
  user_location_match: string[] | number[];
  workload: string[] | boolean[];
  sorting: string;
}

export interface IWorkersData {
  title: string;
  id: number;
  status: string;
  description: string;
  removeWorker: () => void;
  serviceUserAccount: any;
}
export interface IWorkersProps {
  title: string;
  status: string;
  description: string;
  id: number;
  getWorkers: () => void;
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (isPasswordModalOpen: boolean) => void;
  accountId: number;
  accountName: string;
  setAccountUserName: (accountUserName: string) => void;
  setAccountUserId: (accountUserId: number) => void;
}

export interface IWorkerModalPassword {
  password: string;
}

export interface IJobs {
  title: string;
  postedOn: string;
  description: string;
  skills: string;
  scoring: number;
  url: string;
}
