import axios from "axios";
import apiConfig from "./api";
import { errorToast } from "@/services/toast_service";
import { refreshSession } from "@/services/auth_service";

const axiosConfig = axios.create({
    baseURL: apiConfig.baseUrl,
    timeout: 20000,
    withCredentials: true
});

axiosConfig.interceptors.response.use(
    async (response) => {
        if(response.data.status == 'TOKEN_EXPIRED') {
            const data = await refreshSession();
            if(data.status == 'SUCCESS') {
                return axiosConfig(response.config);
            } else {
                throw new Error('Session Invalid!')
            }
        } else if(response.data.status == 'INVALID_TOKEN') {
            throw new Error('Session Invalid!')
        }
        return response;
    },
    (error) => {
        errorToast('Session Invalid!');
        localStorage.clear();
        location.href = '/auth/login';
        return Promise.reject(error);
    }
);

export default axiosConfig;