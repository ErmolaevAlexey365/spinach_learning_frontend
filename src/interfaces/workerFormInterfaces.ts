import React from "react";

export interface IWorkerFormProps {
  isModalOpen: boolean;
  clickHandlerForCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
  submitForm: (data: IWorkerData) => void;
  upworkAccounts: IUpworkAccountsUsersInfo[];
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
export interface ITimezones {
  value: string;
  label: string;
  checked: boolean;
  count: number;
}
export interface ILocations {
  uid: string;
  label: string;
  subRegionUid: string;
  regionUid: string;
  value: string;
  type: string;
  checked: boolean;
  count: number;
}
export interface IUpworkAccountsUsersInfo {
  id: number;
  name: string;
}
export interface IDataForCheckboxes {
  name?: any;
  value?: string;
  label?: string;
  placeholder?: string;
}
