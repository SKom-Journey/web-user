import { IMenu } from "./IMenu";

export interface IChat {
    id: string;
    created_at: string;
    user_message: string;
    user_id: string;
    items: string[];
    menus: IMenu[];
}