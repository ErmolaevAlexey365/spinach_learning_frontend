export interface IAccountUserLoginBody {
  companyUserId: number;
  serviceUserAccountId: number;
  password: string;
  dictionaryId: number;
}
export interface ICreateParserBody {
  filter: string;
  serviceUserAccountId: number;
  title: string;
  description: string;
  companyUserId: number;
  timer: number;
  dictionaryId: null;
}
export interface IProfileEditDataBody {
  firstname: string;

  lastname: string;
  avatar: string;
}

export interface IStartAndStopWorkerBody {
  serviceUserAccountId: number;
  parserId: number;
  companyUserId: number;
}
export interface ISubmitAccountsFormBody {
  companyUserId: number;
  serviceId: number;
  email: string;
  password: string;
  description: string;
}
