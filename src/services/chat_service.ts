import axiosConfig from "@/config/axios";
import { IResponse } from "@/interfaces/IResponse";
import { errorToast } from "./toast_service";
import { getUserInfo } from "./session_service";

export async function getUserChats(): Promise<IResponse<any>> {
    try {
        const req = await axiosConfig.get(`/chats/${getUserInfo().id}`);

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

export async function deleteUserChats(): Promise<IResponse<any>> {
    try {
        const req = await axiosConfig.delete(`/chats/${getUserInfo().id}`);

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