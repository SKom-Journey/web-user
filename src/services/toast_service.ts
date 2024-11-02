import toastConfig from "@/config/toast";
import { toast } from "react-toastify";

export function successToast(message: string) {
    toast.success(message, toastConfig);
}

export function errorToast(message: string = "Something Wrong!") {
    toast.error(message, toastConfig);
}