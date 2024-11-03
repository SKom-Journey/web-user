import Spinnner from "@/components/Spinner";
import { ICart } from "@/interfaces/ICart";
import { IOrder } from "@/interfaces/IOrder";
import { getUserInfo } from "@/services/session_service";
import { getTableNumber } from "@/services/table_service";
import localizeNumber from "@/utils/localize_number";
import { FC, useRef, useState } from "react";

interface OrderButtonComponentProps {
    orders: ICart[];
}

export const OrderButton: FC<OrderButtonComponentProps> = ({
    orders
}) => {
    const [seconds, setSeconds] = useState(4);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const interval = useRef<NodeJS.Timeout | null>(null);

    if (orders.length === 0) {
        return null;
    }

    async function handleOrderClick() {
        setSeconds(4);
        setLoading(true);

        if(timer.current != null) {
            clearTimeout(timer.current);
            timer.current = null;
            setLoading(false);
            return;
        }
        
        if(interval.current != null) {
            clearInterval(interval.current);
        }
        
        interval.current = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        
        timer.current = setTimeout(() => {
            setLoading(false);
            sendOrder();
        }, 4000);
    }

    async function sendOrder() {
        setDisabled(true);
        const data: IOrder = {
            items: [],
            table_number: getTableNumber()!,
            user_id: getUserInfo().id
        };
        
        for(const order of orders) {
            data.items.push({
                id: order.id,
                note: order.note,
                total: order.quantity
            });
        }

        console.log(data);
    }

    return (
        <button 
            type="button" 
            title="Place order" 
            className={`mt-8 w-full rounded-full py-3 font-bold flex items-center justify-center text-white bg-[#C51605] relative ${disabled ? 'opacity-80' : 'hover:bg-primary/90'}`}
            onClick={handleOrderClick}
            disabled={disabled}
        >
            {loading && (
                <div className="flex items-center">
                    <Spinnner size="md" /> <div className="ml-4">Click To Cancel ({seconds})</div>
                </div>
            )}

            {!loading && (
                <span>
                    Order - Rp.{localizeNumber(orders.reduce((a, b) => a + b.menu!.price, 0))}
                </span>
            )}
        </button>
    );
}
