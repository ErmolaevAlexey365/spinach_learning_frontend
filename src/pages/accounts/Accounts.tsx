import React, { useContext, useEffect, useState } from "react";
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import AccountsForm from "../../components/forms/AccountsForm";
import {
  IError,
  ISubmitEmailAndPassword,
} from "../../interfaces/commonInterfaces";
import { userService } from "../../components/service/userInstance";
import UserAccount from "../../components/lists/UserAccount";

import Loader from "../../components/loader/Loader";
import { Context } from "../../context/context";

interface IAccountUserData {
  id: number;
  name: string;
  avatar: string;
  description: string;
  getAccounts: () => void;
}
interface IGetAccountsResponse {
  data: IAccountUserData[];
}

const Accounts = () => {
  const [accountUserData, setAccountUserData] = useState<IAccountUserData[]>(
    []
  );
  const [isLoadGetAccounts, setIsLoadGetAccounts] = useState<boolean>(false);
  const [isLoadSubmitAccounts, setIsLoadSubmitAccounts] =
    useState<boolean>(false);
  const context = useContext(Context);

  async function getAccounts() {
    setIsLoadGetAccounts(true);
    await userService
      .getAccountsData(context.token)
      .then((response: IGetAccountsResponse) => {
        setIsLoadGetAccounts(false);
        setAccountUserData(response.data);
      })
      .catch(function (error: IError) {
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }

  useEffect(() => {
    getAccounts();
  }, []);

  async function submitAccountsForm(data: ISubmitEmailAndPassword) {
    setIsLoadSubmitAccounts(true);
    await userService
      .postAccountsForm(
        {
          companyUserId: 1,
          serviceId: 1,
          email: data.email,
          password: data.password,
          description: "Account description",
        },
        context.token
      )

      .then(() => {
        setIsLoadSubmitAccounts(false);
        getAccounts();
      })
      .catch(function (error: IError) {
        if (
          error.response.data.description ===
          "Service user account already exist"
        ) {
          setIsLoadSubmitAccounts(false);
        }
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }

  return (
    <div>
      <SidebarMenu />
      <AccountsForm submitAccountsForm={submitAccountsForm} />
      <h2 style={{ marginLeft: "20px" }}>Accounts</h2>
      {isLoadGetAccounts || isLoadSubmitAccounts ? (
        <Loader />
      ) : (
        accountUserData.map((e: IAccountUserData) => {
          return (
            <UserAccount
              getAccounts={getAccounts}
              id={e.id}
              key={e.id}
              name={e.name}
              avatar={e.avatar}
              description={e.description}
            />
          );
        })
      )}
    </div>
  );
};

export default Accounts;
