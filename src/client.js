import axios from "axios";
import { getLocalStorageData } from "./utils/localstorage.js";

const jwtToken = getLocalStorageData("jwtToken");
const adminJwtToken = getLocalStorageData("adminJwtToken");

export const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://drive-pro-ba40d6b81e35.herokuapp.com/api"
      : "http://localhost:6969/api",
  headers: {
    authorization: `Bearer ${jwtToken}`,
  },
});

export const admin = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://drive-pro-ba40d6b81e35.herokuapp.com/api"
      : "http://localhost:6969/api/admin",
  headers: {
    authorization: `Bearer ${adminJwtToken}`,
  },
});

export const WEBSOCKET_URL = "wss://my-instructor-server.ts.r.appspot.com";
