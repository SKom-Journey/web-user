import { IMenu } from "./IMenu";

export interface ICart {
    created_at: string;
    id: string;
    menu_id: string;
    note: string;
    quantity: number;
    user_id: string;

    menu?: IMenu;
}