import axiosConfig from "@/config/axios";
import { IResponse } from "@/interfaces/IResponse";
import { errorToast } from "./toast_service";

export async function register(email: string, password: string): Promise<IResponse> {
    try {
        const req = await axiosConfig.post("/auths/users/register", {
            email,
            password
        });

        if(req.data.error) {
            errorToast(req.data.data);
        }

        return req.data;
    } catch (error) {
        console.error(error);
        errorToast();
        return {
            data: null,
            error: true,
            status: "ERROR"
        }
    }
}

export async function login(email: string, password: string): Promise<IResponse> {
    try {
        const req = await axiosConfig.post("/auths/users/login", {
            email,
            password
        });

        if(req.data.error) {
            errorToast(req.data.data);
        }

        return req.data;
    } catch (error) {
        console.error(error);
        errorToast();
        return {
            data: null,
            error: true,
            status: "ERROR"
        }
    }
}

export async function loginAdmin(username: string, password: string): Promise<IResponse> {
    try {
        const req = await axiosConfig.post("/auths/admins/login", {
            username,
            password
        });

        if(req.data.error) {
            errorToast(req.data.data);
        }

        return req.data;
    } catch (error) {
        console.error(error);
        errorToast();
        return {
            data: null,
            error: true,
            status: "ERROR"
        }
    }
}