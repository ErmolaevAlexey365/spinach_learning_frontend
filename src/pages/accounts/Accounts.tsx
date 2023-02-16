import React, {useContext, useEffect, useState} from "react";
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import AccountsForm from "../../components/forms/AccountsForm";
import { IFormInput, IUserAccountProps } from "../../interfaces/interfaces";
import { userService } from "../../components/service/userInstance";
import UserAccount from "../../components/lists/UserAccount";

import Loader from "../../components/loader/Loader";
import {AuthContext} from "../../context/context";

const Accounts = () => {
  const [accountUserData, setAccountUserData] = useState<IUserAccountProps[]>(
    []
  );
  const [isLoadGetAccounts, setIsLoadGetAccounts] = useState<boolean>(false);
  const [isLoadSubmitAccounts, setIsLoadSubmitAccounts] =
    useState<boolean>(false);
    const authContext = useContext(AuthContext);

  async function getAccounts() {
    setIsLoadGetAccounts(true);
    await userService
      .getAccountsData(authContext.token)
      .then((response: any) => {
        setIsLoadGetAccounts(false);
        setAccountUserData(response.data);

      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  useEffect(() => {
    getAccounts();
  }, []);

  async function submitAccountsForm(data: IFormInput) {
    setIsLoadSubmitAccounts(true);
    await userService
      .postAccountsForm({
        companyUserId: 1,
        serviceId: 1,
        email: data.email,
        password: data.password,
        description: "Account description",
      }, authContext.token)

      .then((response: any) => {
        setIsLoadSubmitAccounts(false);
        getAccounts();
      })
      .catch(function (error: any) {
          if(error.response.data.description==='Service user account already exist') {
              setIsLoadSubmitAccounts(false);


          }
      });
  }

  return (
    <div>
      <AccountsForm submitAccountsForm={submitAccountsForm} />
      <h2 style={{ marginLeft: "20px" }}>Accounts</h2>
      {isLoadGetAccounts || isLoadSubmitAccounts ? (
        <Loader />
      ) : (
        accountUserData.map((e: IUserAccountProps, index: number) => {

          return (
            <UserAccount
              getAccounts={getAccounts}
              id={e.id}
              key={index}
              name={e.name}
              avatar={e.avatar}
              description={e.description}
            />
          );
        })
      )}

      <SidebarMenu />
    </div>
  );
};

export default Accounts;
