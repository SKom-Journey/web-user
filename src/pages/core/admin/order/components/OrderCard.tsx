import { IOrder } from "@/interfaces/IOrder";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { DateTime } from "luxon";
import { ClockIcon } from "@/components/Icons";
import Logo from "@/assets/images/ryomu-logo.png"
import localizeNumber from "@/utils/localize_number";
import Spinnner from "@/components/Spinner";
import { finishOrder } from "@/services/order_service";

interface OrderCardProps {
    order: IOrder;
    setOrders: Dispatch<SetStateAction<IOrder[]>>;
}

const OrderCard: FC<OrderCardProps> = ({
    order,
    setOrders
}) =>  {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function clickFinishOrder() {
        setIsLoading(true);
        await finishOrder(order.id!);
        setOrders(p => p.filter(o => o.id != order.id));
        setIsLoading(false);
    }

    return <div className="w-1/3 p-4">
        <div className="bg-white shadow-lg rounded-lg">
            <div className="flex border border-b p-4 justify-between">
                <div className="bg-yellow-200 text-yellow-500 font-semibold py-1 text-sm px-3 border border-yellow-400 border-2 rounded-lg">
                    #{order.table_number}
                </div>
                
                <div className="bg-gray-200 text-gray-500 font-semibold py-1 text-sm px-3 border border-gray-400 rounded-lg">
                    <ClockIcon /> <span className="ml-1">{DateTime.fromISO(order.created_at!).toFormat("HH:mm:ss")}</span>
                </div>
            </div>

            <div className="px-2 py-4 border border-b">
                {
                    order.items.map((m, i) => <div key={i} className="flex items-center my-4">
                        <div className="px-3">x{m.total}</div>
                        <div className="w-20">
                            <img className="w-12 h-12 rounded-lg" src={m.detail.img} alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <div>{m.detail.title}</div>
                            <div className="text-slate-500 text-xs mt-1.5">Note: {m.note == "" ? '-' : m.note}</div>
                        </div>
                        <div className="w-32 px-3">
                            Rp.{localizeNumber(m.detail.price)}
                        </div>
                    </div>)
                }
            </div>

            <div className="flex items-center border border-b p-4 justify-between">
                <div className="font-semibold py-1 px-3 text-md">
                    Total Price
                </div>
                
                <div className="font-semibold text-xl">
                    Rp.{localizeNumber(order.items.reduce((a, b) => a + b.detail.price, 0))}
                </div>
            </div>
            
            <div className="flex items-center p-4 justify-between border border-b">
                <div className="items-center py-1 px-3 text-md flex">
                    <div>
                        <img className="w-12" src={Logo} alt="" />
                    </div>
                    <div className="px-3">
                        <div className="text-sm text-slate-500">Customer Name</div>
                        <div className="text-lg mt-.5 font-semibold">{order.user_name}</div>
                    </div>
                </div>
                
                <div className="font-semibold">
                    <button disabled={isLoading} onClick={clickFinishOrder} title="Finish Order" className="hover:bg-red-900 rounded-lg shadow text-white px-6 py-2 bg-red-700">
                        {
                            isLoading && <Spinnner />
                        }
                        {
                            !isLoading && <>Finish</>
                        }
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default OrderCard;