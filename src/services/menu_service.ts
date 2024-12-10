import axiosConfig from "@/config/axios";
import { IResponse } from "@/interfaces/IResponse";
import { errorToast } from "./toast_service";
import { IMenu } from "@/interfaces/IMenu";

export const getMenus = async (keyword: string | undefined = undefined): Promise<IResponse<IMenu[]>> => {
    try {
        const req = await axiosConfig.get("/menus/all", {
            params: {
                keyword
            }
        });

        if (req.data.error) {
            errorToast(req.data.data); 
        }
        
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
        return req
    } catch (error) {
        console.error(error);
        errorToast(); 
        throw error; 
    }
}

export async function getMenuById(id: string): Promise<IResponse> {
    try {
        const req = await axiosConfig.get(`/menus/${id}`);

        if(req.data.error) {
            errorToast(req.data.data);
        }

        return req.data;
    } catch (error) {
        console.warn(error);
        errorToast();
        return {
            data: null,
            error: true,
            status: "ERROR"
        }
    }
}