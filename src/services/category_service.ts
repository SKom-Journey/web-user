import axiosConfig from "@/config/axios";
import { errorToast } from "./toast_service";

export async function deleteCategory(id: string) {
    try {
        const req = await axiosConfig.delete(`/categories/${id}`);

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

export async function createCategory(name: string) {
    try {
        const req = await axiosConfig.post(`/categories`, {
            name
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

export async function updateCategoryName(id: string, name: string) {
    try {
        const req = await axiosConfig.put(`/categories/${id}`, {
            name
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

export async function getCategories() {
    try {
        const req = await axiosConfig.get(`/categories`);

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