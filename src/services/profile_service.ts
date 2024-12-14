import axiosConfig from "@/config/axios";
import { errorToast } from "./toast_service";
import { IResponse } from "@/interfaces/IResponse";

export async function getProfile(): Promise<IResponse<any>> {
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