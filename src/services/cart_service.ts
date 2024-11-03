import axiosConfig from "@/config/axios";
import { IResponse } from "@/interfaces/IResponse";
import { errorToast } from "./toast_service";
import { getUserInfo } from "./session_service";

export async function getCartsByUserId(): Promise<IResponse> {
    try {
        const { id } = getUserInfo();
        const req = await axiosConfig.get(`/carts/${id}`);

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

export async function deleteCart(menuId: string, note: string | undefined = undefined): Promise<IResponse> {
    try {
        const { id } = getUserInfo();
        const req = await axiosConfig.delete(`/carts`, {
            data: {
                menu_id: menuId,
                note,
                user_id: id
            }
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

export async function createCart(menuId: string, note: string | undefined = undefined): Promise<IResponse> {
    try {
        const { id } = getUserInfo();
        const req = await axiosConfig.post(`/carts`, {
            menu_id: menuId,
            note,
            user_id: id
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