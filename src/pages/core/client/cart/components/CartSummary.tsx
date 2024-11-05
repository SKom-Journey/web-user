import { LocationDotIcon, MoneyIcon } from "@/components/Icons";
import { OrderSummary } from "./OrderSummary";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { getTableNumber } from "@/services/table_service";
import { getUserInfo } from "@/services/session_service";
import { ICart } from "@/interfaces/ICart";

interface CartSummaryComponentProps {
    setOrders: Dispatch<SetStateAction<ICart[]>>;
    orders: ICart[];
    orderLoading: boolean;
}

export const CartSummary: FC<CartSummaryComponentProps> = ({
    setOrders,
    orders,
    orderLoading
}) => {
    const [table, setTable] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(getUserInfo().name);
        setTable(getTableNumber()!);
    }, []);

    return(
        <div className="mt-2">
            <div className="shadow-lg rounded-lg border p-3 font-bold">
                <div className="mb-3 text-lg">
                    Order Placed
                    <span className="ml-1.5 text-sm">({username})</span>
                </div>
                <div className="text-sm flex">
                    <div>
                        <LocationDotIcon />
                    </div>
                    <div className="ml-2 font-semibold">Table {table}</div>
                </div>
            </div>
            
            <OrderSummary orderLoading={orderLoading} setOrders={setOrders} orders={orders} />

            <div className="shadow-lg rounded-lg flex border px-3 py-4 justify-center text-lg items-center font-bold mt-5">
                <div className="w-full">Payment Method</div>
                <div className="flex justify-center items-center">
                    <MoneyIcon />
                    <div className="ml-2 text-sm">Cash</div>
                </div>
            </div>
        </div>
    )
}