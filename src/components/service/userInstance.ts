import axios from "axios";

const userInstance = axios.create({
  baseURL: "http://localhost:5000/api/user",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "",
  },
});

export const userService = {
  async login(body: any) {
    try {
      return userInstance.post("/login", body);
    } catch (error: any) {
      return error.response;
    }
  },
  async auth(headers: any, code: string) {
    try {
      let headersObject = {
        headers,
      };

      return userInstance.get(`/login/${code}`, headersObject);
    } catch (error: any) {
      return error.response;
    }
  },
};
