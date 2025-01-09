import { useEffect, useState } from "react";
import { CartSummary } from "./components/CartSummary";
import { OrderButton } from "./components/OrderButton";
import { getCartsByUserId } from "@/services/cart_service";
import { ICart } from "@/interfaces/ICart";

export const CartPage: React.FC = () => {
   const [orders, setOrders] = useState<ICart[]>([]);
   const [orderLoading, setOrderLoading] = useState(true);
   const [paymentType, setPaymentType] = useState("cash");

   useEffect(() => {
      setupData();
   }, []);
   
   async function setupData() {
      const getCarts: ICart[] = (await getCartsByUserId()).data;
      setOrders(getCarts);
      setOrderLoading(false);
   }

   return (
      <div className="flex flex-col h-full">
         <div className="overflow-y-auto h-full" style={{scrollbarWidth: "thin"}}>
            <CartSummary setPaymentType={setPaymentType} paymentType={paymentType} orderLoading={orderLoading} orders={orders} setOrders={setOrders} />
         </div>
         <div className="bottom-0 pb-3">
            <OrderButton orders={orders} paymentType={paymentType} />
         </div>
      </div>
   );
};
