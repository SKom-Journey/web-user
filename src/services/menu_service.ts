import axiosConfig from "@/config/axios";
import { errorToast } from "./toast_service";
import { IMenu } from "@/interfaces/IMenu";

export const getMenuWithCategory = async (keyword: string | undefined = undefined) => {
    try {
        const req = await axiosConfig.get("/menus", {
            params: {
                keyword
            }
        });
        return req.data;
    } catch (error) {
        console.error(error);
        errorToast(); 
        throw error; 
    }
}

export const getMenus = async () => {
    try {
        const req = await axiosConfig.get("/menus/all");
        return req.data;
    } catch (error) {
        console.error(error);
        errorToast(); 
        throw error; 
    }
}

export const createMenus = async (menuData: IMenu) => {
    try {
       const req = await axiosConfig.post(`/menus`, menuData);
       return req.data; 
    } catch (error) {
       console.error(error);
       errorToast(); 
       throw error; 
    }
} 

export const updateMenus = async (menu_id: string,menuData: IMenu) => {
    try {
       const req = await axiosConfig.put(`/menus/${menu_id}`, menuData);
       return req.data; 
    } catch (error) {
       console.error(error);
       errorToast(); 
       throw error; 
    }
} 

export const deleteMenus = async (menu_id: string) => {
    try {
        const req = await axiosConfig.delete(`/menus/${menu_id}`);
        return req.data;
    } catch (error) {
        console.error(error);
        errorToast(); 
        throw error; 
    }
}

export async function getMenuById(id: string) {
    try {
        const req = await axiosConfig.get(`/menus/${id}`);
        return req.data;
    } catch (error) {
        errorToast();
        return {
            data: null,
            error: true,
            status: "ERROR"
        }
    }
}