import axios from "axios";
import env from "../configs/environment";

const axiosClient = axios.create({
  baseURL: env.BASE_API_URL,
  timeout: 1000,
});

export default axiosClient;
