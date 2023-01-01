import axios from "axios";
let Token = JSON.parse(localStorage.getItem("Token") || "[{}] ");

const userInstance = axios.create({
  baseURL: "http://localhost:5000/api/user",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "",
    Authorization: "Bearer " + Token,
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
  async auth(code: string) {
    try {
      return userInstance.get(`/login/${code}`);
    } catch (error: any) {
      return error.response;
    }
  },

  async edit(body: any) {
    try {
      return userInstance.patch("/edit", body);
    } catch (error: any) {
      return error.response;
    }
  },
  async getUserData() {
    try {
      return userInstance.get("");
    } catch (error: any) {
      return error.response;
    }
  },
};
