import localStorageConfig from "@/config/localstorage";
import { IMenuOrder } from "@/interfaces/IMenuOrder";

export default function storeMenu(menu: IMenuOrder) {
    let menus = localStorage.getItem(localStorageConfig.menu);
    let previousMenus: IMenuOrder[] = []; 

    if(menus != null) {
        previousMenus = JSON.parse(menus);
    }

    localStorage.setItem(localStorageConfig.menu, JSON.stringify([...previousMenus, menu]));
}