import { ICart } from "@/interfaces/ICart";
import localizeNumber from "@/utils/localize_number";
import { FC } from "react";

interface OrderButtonComponentProps {
    orders: ICart[];
}

export const OrderButton: FC<OrderButtonComponentProps> = ({
    orders
}) => {
    if(orders.length === 0) {
        return <></>
    }

    return (
        <button type="button" title="Place order" className="mt-8 w-full rounded-full py-3 font-bold hover:bg-primary/90 flex items-center justify-center text-white bg-[#C51605]">
            Order - Rp.{localizeNumber(orders.reduce((a, b) => a + b.menu!.price, 0))}
        </button>
    )
}