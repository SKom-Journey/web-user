import { IMenu } from "./IMenu";

export interface IOrder {
    id?: string;
    items: IOrderItem[];
    user_id: string;
    user_name: string;
    table_number: string;
    created_at?: string;
}

export interface IOrderItem {
    id: string;
    note: string;
    total: number;
    detail: IMenu
}