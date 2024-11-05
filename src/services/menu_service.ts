import axiosConfig from "@/config/axios";
import { IResponse } from "@/interfaces/IResponse";
import { errorToast } from "./toast_service";

export async function getMenus(keyword: string | undefined = undefined): Promise<IResponse> {
    try {
        const req = await axiosConfig.get("/menus", {
            params: {
                keyword
            }
        });

        if(req.data.error) {
            errorToast(req.data.data);
        }

        return req.data;
    } catch (error) {
        console.warn(error);
        errorToast();
        return {
            data: null,
            error: true,
            status: "ERROR"
        }
    }
}