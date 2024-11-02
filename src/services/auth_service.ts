import axiosConfig from "@/config/axios";
import { IResponse } from "@/interfaces/IResponse";

export default async function register(email: string, password: string): Promise<IResponse> {
    try {
        const req = await axiosConfig.post("/auths/users/register", {
            email,
            password
        });

        return req.data;
    } catch (error) {
        console.error(error);
        return {
            data: null,
            error: true,
            status: "ERROR"
        }
    }
}