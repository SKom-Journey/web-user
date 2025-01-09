import { Dispatch, FC, Fragment, SetStateAction } from "react";
import CartSVG from "@/assets/svg/cart.svg";
import { ICart } from "@/interfaces/ICart";
import localizeNumber from "@/utils/localize_number";
import Spinnner from "@/components/Spinner";
import OrderNote from "./OrderNote";

interface OrderSummaryComponentProps {
    setOrders: Dispatch<SetStateAction<ICart[]>>;
    orders: ICart[];
    orderLoading: boolean;
}

export const OrderSummary: FC<OrderSummaryComponentProps> = ({
    setOrders,
    orderLoading,
    orders
}) => {
    if(orders.length === 0 && !orderLoading) {
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
                    orderLoading && <div className="w-full my-12 text-center">
                        <Spinnner size="xl" />
                        <div className="mt-6 font-semibold">Please Wait...</div>
                    </div>
                }

                {
                    orders.map((o, i) => (
                        <Fragment key={i}>
                            <div className="w-full flex mt-4">
                                <div className="w-1/12">{o.quantity}x</div>
                                <div className="w-full truncate">
                                    {o.menu!.title}
                                </div>
                                <div className="w-4/12 text-right">
                                    Rp.{localizeNumber(o.menu!.price)}
                                </div>
                            </div>

                            <OrderNote setOrders={setOrders} cartId={o.id} note={o.note} />
                        </Fragment>
                    ))
                }
            </div>

            <div className="text-lg flex font-bold mt-1 text-green-500 mt-6">
                <div className="w-full">Subtotal</div>
                <div className="w-1/12"></div>
                <div className="w-4/12 text-right">Rp.{localizeNumber(orders.reduce((a, b) => a + b.menu!.price * b.quantity, 0))}</div>
            </div>
        </div>
    )
}