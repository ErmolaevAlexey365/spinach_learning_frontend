import axios from "axios";



const userInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "",

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
  async auth(code: string, token: string) {
    try {
      return userInstance.get(`/user/login/${code}`, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },

  async edit(body: any, token: string) {
    try {
      return userInstance.patch("/user/edit", body, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },
  async getUserData(token: string) {
    try {
      return userInstance.get("/user", {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },
  async postAccountsForm(body: any, token: string) {
    try {
      return userInstance.post("/service-user-account/add-user", body, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },
  async getAccountsData(token: string) {
    try {
      return userInstance.get("/service-user-account/company-accounts/1", {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },
  async deleteAccountsData(
    companyUserId: number,
    serviceUserAccountId: number,
    token: string
  ) {
    try {
      return userInstance.delete("/service-user-account/delete", {
        data: {
          companyUserId,
          serviceUserAccountId,
        },
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },

  async createParser(body: any, token: string) {
    try {
      return userInstance.post("/parser/create", body, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },
  async startParser(body: any, token: string) {
    try {
      return userInstance.post("/parser/start", body, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },
  async getAllParsers( token: string) {
    try {
      return userInstance.get("/parser/all", {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },

  async deleteParser(
  parserId: number,
  serviceUserAccountId: number ,
  companyUserId: number,
      token: string
  ) {
    try {
      return userInstance.delete("/parser/delete", {
        data: {
          parserId,
          serviceUserAccountId,
          companyUserId,
        },
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },
  async accountUserLogin(body: any, token: string) {
    try {
      return userInstance.post("/service-user-account/login", body, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },
  async stopParser(body: any, token: string) {
    try {
      return userInstance.post("/parser/stop", body, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
},
  async getParsersById(companyUserId:number,parserId:number, token: string) {
    try {
      return userInstance.get(`/parser?companyUserId=${companyUserId}&parserId=${parserId}`, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error: any) {
      return error.response;
    }
  },
}

