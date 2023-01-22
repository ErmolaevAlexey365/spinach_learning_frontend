import axios from "axios";

let Token = JSON.parse(localStorage.getItem("Token") || "[{}] ");

const userInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "",
    Authorization: "Bearer " + Token,
  },
});

export const userService = {
  async login(body: any) {
    try {
      return userInstance.post("/user/login", body);
    } catch (error: any) {
      return error.response;
    }
  },
  async auth(code: string) {
    try {
      return userInstance.get(`/user/login/${code}`);
    } catch (error: any) {
      return error.response;
    }
  },

  async edit(body: any) {
    try {
      return userInstance.patch("/user/edit", body);
    } catch (error: any) {
      return error.response;
    }
  },
  async getUserData() {
    try {
        return userInstance.get("/user");
    } catch (error: any) {
      return error.response;
    }
  },
  async postAccountsForm(body:any) {
    try {
      return userInstance.post("/service-user-account/add-user",body);
    } catch (error: any) {
      return error.response;
    }
  },
  async getAccountsData() {
    try {
      return userInstance.get('/service-user-account/company-accounts/1');
    } catch (error: any) {
      return error.response;
    }
  },
  async deleteAccountsData(companyUserId:number,serviceUserAccountId:number ) {
    try {



      return userInstance.delete('/service-user-account/delete',{
        data:{
          companyUserId,
          serviceUserAccountId,
        }
      });
    } catch (error: any) {
      return error.response;
    }
  },

};
