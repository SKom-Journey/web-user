import localStorageConfig from "@/config/localstorage";
import { IMenuOrder } from "@/interfaces/IMenuOrder";

export default function deleteMenu(id: string) {
    let menus = localStorage.getItem(localStorageConfig.menu);

    if(menus != null) {
        const previousMenus: IMenuOrder[] = JSON.parse(menus);
        const filteredMenu = previousMenus.filter(p => p.id != id);
        localStorage.setItem(localStorageConfig.menu, JSON.stringify(filteredMenu));
    }
}