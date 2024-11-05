import axiosConfig from "@/config/axios";
import { IResponse } from "@/interfaces/IResponse";
import { errorToast } from "./toast_service";

export async function getQrs(): Promise<IResponse> {
    try {
        const req = await axiosConfig.get("/qrs");

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

export async function createQr(number: string): Promise<IResponse> {
    try {
        const req = await axiosConfig.post("/qrs", {
            table_number: number
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