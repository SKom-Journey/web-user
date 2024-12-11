import { checkUserSession } from "@/services/session_service";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export const AuthAdmin: React.FC = () => {
   const navigate = useNavigate();

   useEffect(() => {
      if(checkUserSession()) {
         navigate("/admin/manage-qr");
      }
   }, []);

   return (
      <>
         <div className="flex justify-center items-center bg-[#C51605] h-full">
            <Outlet />
         </div>

         <ToastContainer />
      </>
   )
}