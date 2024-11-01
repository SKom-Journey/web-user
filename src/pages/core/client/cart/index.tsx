import { useState } from "react";
import { CartSummary } from "./components/CartSummary";
import { IMenuOrder } from "@/interfaces/IMenuOrder";
import getMenu from "@/services/get_menu";
import { OrderButton } from "./components/OrderButton";

export const CartPage: React.FC = () => {
   const [orders, setOrders] = useState<IMenuOrder[]>(getMenu());

   return (
      <div className="flex flex-col h-full">
         <div className="overflow-y-auto h-full mt-12" style={{scrollbarWidth: "thin"}}>
            <CartSummary orders={orders} setOrders={setOrders} />
         </div>
         
         <center className="bottom-0 pb-3">
            <OrderButton orders={orders} />
         </center>
      </div>
   );
};
