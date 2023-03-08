import {
  IUpworkAccountsUsersInfo,
  IWorkerData,
} from "./workerFormInterfaces";

export interface IJobs {
  id: number;
  title: string;
  postedOn: string;
  description: string;
  skills: string;
  scoring: number;
  url: string;
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
export interface IGetJobsResponse {
  data: {
    jobs: IJobs[];
  };
}
export interface IWorkerModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  submitForm: (data: IWorkerData) => void;
  upworkAccounts: IUpworkAccountsUsersInfo[];
}
export interface IWorkerPasswordModalProps {
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (isPasswordModalOpen: boolean) => void;
  accountUserName: string;
  accountUserId: number;
}
export interface IGetAccountsDashboardResponse {
  data: IUpworkAccountsUsersInfo[];
}
export interface IGetWorkersResponse {
  data: IWorkersData[];
}
export interface IWorkersData {
  title: string;
  id: number;
  status: string;
  description: string;
  serviceUserAccount: {
    name: string;
    id: number;
  };
}
