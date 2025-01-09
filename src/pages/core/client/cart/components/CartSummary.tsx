import { LocationDotIcon, MoneyIcon } from "@/components/Icons";
import { OrderSummary } from "./OrderSummary";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { getTableNumber } from "@/services/table_service";
import { getUserInfo } from "@/services/session_service";
import { ICart } from "@/interfaces/ICart";
import SupportedPayment from "./SupportedPayment";

interface CartSummaryComponentProps {
    setOrders: Dispatch<SetStateAction<ICart[]>>;
    setPaymentType: Dispatch<SetStateAction<string>>;
    paymentType: string;
    orders: ICart[];
    orderLoading: boolean;
}

export const CartSummary: FC<CartSummaryComponentProps> = ({
    setOrders,
    orders,
    orderLoading,
    setPaymentType,
    paymentType
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

            <div className="shadow-lg rounded-lg border px-3 py-4 justify-center items-center mt-5">
                <div className="flex justify-center text-lg items-center font-bold">
                    <div className="w-full">Payment Method</div>
                    <div className="flex justify-center items-center">
                        <MoneyIcon />
                        <select defaultValue={paymentType} onChange={(e) => setPaymentType(e.currentTarget.value)} className="text-sm px-1 outline-none">
                            <option value="cash">Cash</option>
                            <option value="cashless">Cashless</option>
                        </select>
                    </div>
                </div>

                <div className="text-slate-400 mt-5 text-sm w-full font-semibold italic">
                    {
                        paymentType == 'cash' && <>*Pay only after your order is served at your table</>
                    }

                    {
                        paymentType == 'cashless' && <div>
                            *Pay at first, then we will serve your order at your table. 
                            <SupportedPayment />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}