import { useState } from "react";
import { CartSummary } from "./components/CartSummary";
import { IMenuOrder } from "@/interfaces/IMenuOrder";
import getMenu from "@/services/get_menu";
import { OrderButton } from "./components/OrderButton";

export const CartPage: React.FC = () => {
   const [orders, setOrders] = useState<IMenuOrder[]>(getMenu());

   return (
      <div className="flex flex-col h-screen max-h-[87vh]">
         <div className="flex-grow overflow-y-auto" style={{scrollbarWidth: "thin"}}>
            <CartSummary orders={orders} setOrders={setOrders} />
         </div>
         
         <center className="bottom-0 pb-3">
            <OrderButton orders={orders} />
         </center>
      </div>
   );
};
