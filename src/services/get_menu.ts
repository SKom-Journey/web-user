import localStorageConfig from "@/config/localstorage";
import { IMenuOrder } from "@/interfaces/IMenuOrder";

export default function getMenu(): IMenuOrder[] {
    let menus = localStorage.getItem(localStorageConfig.menu);
    return JSON.parse(menus ?? "[]");
}