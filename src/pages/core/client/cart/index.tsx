import CartOrderButton from "./components/CartOrderButton";
import CartSummary from "./components/CartSummary";

export const CartPage: React.FC = () => {
   return (
      <div className="flex flex-col h-screen max-h-[87vh]">
         <div className="flex-grow overflow-y-auto" style={{scrollbarWidth: "thin"}}>
            <CartSummary />
         </div>
         
         <center className="bottom-0 pb-3">
            <CartOrderButton />
         </center>
      </div>
   );
};
