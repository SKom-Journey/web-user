import localStorageConfig from "@/config/localstorage";
import { IMenuOrder } from "@/interfaces/IMenuOrder";
import deleteMenu from "./delete_menu";

export default function storeMenu(menu: IMenuOrder) {

    // DELETE IF TOTAL IS 0
    if(menu.total === 0) {
        deleteMenu(menu.id);
        return;
    }

    let menus = localStorage.getItem(localStorageConfig.menu);
    let previousMenus: IMenuOrder[] = []; 

    if(menus != null) {
        previousMenus = JSON.parse(menus);
        const getById = previousMenus.findIndex(p => p.id == menu.id);
        if(getById != -1) {
            previousMenus[getById].total = menu.total;
            previousMenus[getById].price = menu.price;
            previousMenus[getById].note = menu.note;
            previousMenus[getById].title = menu.title;
            localStorage.setItem(localStorageConfig.menu, JSON.stringify(previousMenus));
            return;
        }
    }

    localStorage.setItem(localStorageConfig.menu, JSON.stringify([...previousMenus, menu]));
}