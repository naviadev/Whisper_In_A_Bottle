import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000";

const returnInstance = (headers?: AxiosRequestHeaders): AxiosInstance =>
  axios.create({
    baseURL: SERVER_URL,
    headers: headers,
  });

export default returnInstance;
