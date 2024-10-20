import { EditIcon } from "@/components/Icons";
import { IMenuOrder } from "@/interfaces/IMenuOrder";
import { Dispatch, FC, Fragment, SetStateAction, useEffect } from "react";
import CartSVG from "@/assets/svg/cart.svg";

interface OrderSummaryComponentProps {
    setOrders: Dispatch<SetStateAction<IMenuOrder[]>>;
    orders: IMenuOrder[];
}

export const OrderSummary: FC<OrderSummaryComponentProps> = ({
    setOrders,
    orders
}) => {
    useEffect(() => {
        // console.log(orders);
    }, []);

    if(orders.length === 0) {
        return (
            <div className="py-8 shadow-lg rounded-lg border p-3 font-bold mt-5 flex flex-wrap items-center justify-center">
                <img className="w-1/2" src={CartSVG} alt="" />
                <center className="mt-4 text-lg w-full">No orders found yet...</center>
            </div>
        )
    }

    return (
        <div className="shadow-lg rounded-lg border p-3 font-bold mt-5">
            <div className="mb-1 text-lg">Order Summary</div>

            <div className="text-sm flex flex-wrap font-semibold">
                {
                    orders.map((o, i) => (
                        <Fragment key={i}>
                            <div className="w-full flex mt-4">
                                <div className="w-1/12">{o.total}x</div>
                                <div className="w-full truncate">
                                    {o.title}
                                </div>
                                <div className="w-4/12 text-right">
                                    Rp.{o.price}
                                </div>
                            </div>

                            <div className="w-full text-xs text-slate-400 mt-2 flex justify-center items-center">
                                <div className="mr-1">Note:</div>
                                <div className="w-full truncate">{o.note.length > 0 ? o.note : '-'}</div>
                                <div className="ml-2 text-sm">
                                    <button title="Edit note" type="button">
                                        <EditIcon />
                                    </button>
                                </div>
                            </div>
                        </Fragment>
                    ))
                }
            </div>

            <div className="text-lg flex font-bold mt-1 text-green-500 mt-6">
                <div className="w-full">Subtotal</div>
                <div className="w-1/12"></div>
                <div className="w-4/12 text-right">Rp.{orders.reduce((a, b) => a + b.price, 0)}</div>
            </div>
        </div>
    )
}