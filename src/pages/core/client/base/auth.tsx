import { checkUserSession } from "@/services/session_service";
import { checkTableNumber } from "@/services/table_service";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const AuthClient: React.FC = () => {
   const navigate = useNavigate();

   useEffect(() => {
      if(!checkTableNumber()) {
         navigate("/scan-table");
      } else if(checkUserSession()) {
         navigate("/menu");
      }
   }, []);

   return (
      <>
         <main className="overflow-hidden h-screen w-full max-w-[480px] m-auto">
            <div className="h-full">
               <Outlet />
            </div>
         </main>

         <ToastContainer />
      </>
   );
};
