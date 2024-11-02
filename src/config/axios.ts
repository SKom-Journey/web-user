import axios from "axios";
import apiConfig from "./api";

const axiosConfig = axios.create({
    baseURL: apiConfig.baseUrl,
    timeout: 20000
});

export default axiosConfig;