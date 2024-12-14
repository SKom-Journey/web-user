import axiosConfig from "@/config/axios";
import { errorToast } from "./toast_service";
import { IResponse } from "@/interfaces/IResponse";
import { IUser } from "@/interfaces/IUser";
import { getUserInfo } from "./session_service";

export async function getProfile(): Promise<IResponse<IUser | null>> {
    try {
        const req = await axiosConfig.get("/me");

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

export async function updateUserName(name: string): Promise<IResponse<IUser | null>> {
    try {
        const { id } = getUserInfo();
        const req = await axiosConfig.put(`/users/${id}`, {
            name
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