import { useEffect, useState } from "react"
import OrderCard from "./components/OrderCard"
import { getOrders } from "@/services/order_service";
import { IOrder } from "@/interfaces/IOrder";
import DataImg from "@/assets/svg/data.svg";

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
               orders.length === 0 && <center className="py-10 w-full">
                  <img src={DataImg} className="w-1/4 mb-8" alt="" />
                  <div className="font-bold text-2xl">No Orders Found...</div>
               </center>
            }
            
            {
               orders.map((o, i) => <OrderCard setOrders={setOrders} key={i} order={o} />)
            }
         </div>
      </div>
   )
}