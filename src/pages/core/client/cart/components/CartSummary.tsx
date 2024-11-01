import { LocationDotIcon, MoneyIcon } from "@/components/Icons";
import { OrderSummary } from "./OrderSummary";
import { IMenuOrder } from "@/interfaces/IMenuOrder";
import { Dispatch, FC, SetStateAction } from "react";

interface CartSummaryComponentProps {
    setOrders: Dispatch<SetStateAction<IMenuOrder[]>>;
    orders: IMenuOrder[];
}

export const CartSummary: FC<CartSummaryComponentProps> = ({
    setOrders,
    orders
}) => {
    return(
        <div className="mt-4">
            <div className="shadow-lg rounded-lg border p-3 font-bold">
                <div className="mb-3 text-lg">
                    Order Placed
                    <span className="ml-1.5 text-sm">(_mjusteen)</span>
                </div>
                <div className="text-sm flex">
                    <div>
                        <LocationDotIcon />
                    </div>
                    <div className="ml-2 font-semibold">Table 12</div>
                </div>
            </div>
            
            <OrderSummary setOrders={setOrders} orders={orders} />

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