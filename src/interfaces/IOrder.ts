export interface IOrder {
    items: IOrderItem[];
    user_id: string;
    table_number: string;
}

export interface IOrderItem {
    id: string;
    note: string;
    total: number;
}