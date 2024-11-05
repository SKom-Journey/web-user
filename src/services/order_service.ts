import axiosConfig from "@/config/axios";
import { IResponse } from "@/interfaces/IResponse";
import { errorToast } from "./toast_service";
import { IOrder } from "@/interfaces/IOrder";

export async function createOrder(data: IOrder): Promise<IResponse> {
    try {
        const req = await axiosConfig.post("/orders", data);

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