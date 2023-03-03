import React, { useContext, useEffect, useState } from "react";
import { userService } from "../../components/service/userInstance";
import FormUserData from "../../components/forms/FormUserData";
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import { Context } from "../../context/context";

const Profile = () => {
  const [userData, setUserData] = useState<any>([{}]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const context = useContext(Context);

  async function getUsersData() {
    await userService
      .getUserData(context.token)
      .then((response: any) => {
        setUserData({
          ...userData,
          id: response.data.id,
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
        });
        setIsLoading(false);
      })
      .catch(function (error: any) {
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }

  useEffect(() => {
    getUsersData();
  }, []);

  async function changeData() {
    if (!userData.firstname || !userData.lastname) {
      setIsDisabled(true);
      return;
    }
    await userService
      .edit(
        {
          firstname: userData.firstname,
          lastname: userData.lastname,
          avatar: "123",
        },
        context.token
      )
      .then((response: any) => {
        setIsDisabled(!isDisabled);
      })
      .catch(function (error: any) {
        if (error.response.data.description === "Cannot verify token") {
          context.setIsUserLogin(false);
          context.setIsUserAuth(false);
        }
      });
  }

  const clickHandlerForSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changeData();
  };
  const clickHandlerForCansel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
    getUsersData();
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FormUserData
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            userData={userData}
            setUserData={setUserData}
            clickHandlerForSubmit={clickHandlerForSubmit}
            clickHandlerForCansel={clickHandlerForCansel}
          ></FormUserData>
          <SidebarMenu></SidebarMenu>
        </>
      )}
    </>
  );
};

export default Profile;
