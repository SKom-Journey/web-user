import toastConfig from "@/config/toast";
import { toast } from "react-toastify";

export function successToast(message: string = "Success") {
    toast.success(message, toastConfig);
}

export function errorToast(message: string = "Something Wrong!") {
    toast.error(message, toastConfig);
}

export function warningToast(message: string = "Warning") {
    toast.warning(message, toastConfig);
}