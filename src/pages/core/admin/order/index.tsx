import { useEffect, useState } from "react"
import OrderCard from "./components/OrderCard"
import { getOrders } from "@/services/order_service";
import { IOrder } from "@/interfaces/IOrder";

export const IncomingOrderPageAdmin = () => {
   const [orders, setOrders] = useState<IOrder[]>([]);

   useEffect(() => {
      setupData();
   }, []);

   async function setupData() {
      const orders = await getOrders();
      setOrders(orders.data);
   }

   return (
      <div>
         <div className="flex flex-wrap">
            {
               orders.map((o, i) => <OrderCard setOrders={setOrders} key={i} order={o} />)
            }
         </div>
      </div>
   )
}