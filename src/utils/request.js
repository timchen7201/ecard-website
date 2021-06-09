import axios from "axios";
import {} from "../appContext";
import Constant from '../constants'
// Modify server url here
const baseURL = Constant.SERVER_URL
// const baseURL = "https://app.freshio.me";
const request = axios.create({ baseURL: baseURL });

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.error(error);
    }
    // Customize error handling
    return Promise.reject(error);
  }
);

export default request;
