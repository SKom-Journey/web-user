import axiosConfig from "@/config/axios";
import { errorToast } from "./toast_service";
import { getUserInfo } from "./session_service";

export async function createTransaction() {
    try {
        const { id } = getUserInfo();

        const req = await axiosConfig.post("/transactions", {
            "user_id": id
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