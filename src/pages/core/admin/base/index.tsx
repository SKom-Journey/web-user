import { NavbarAdmin } from "@/components/base/navbar/NavbarAdmin"
import { Sidebar } from "@/components/base/sidebar/Sidebar"
import { checkUserSession } from "@/services/session_service";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";

export const BaseAdmin: React.FC = () => {
   const location = useLocation()
   const [isSidebarOpen, setSidebarOpen] = useState(false);
   const navigate = useNavigate();

   function toggleSidebar() {
      setSidebarOpen(!isSidebarOpen);
   }

   useEffect(() => {
      if(!checkUserSession()) {
         navigate("/auth-admin");
      }
   }, []);
   
   return (
      <>
         <NavbarAdmin toggleSidebar={toggleSidebar} />
         <Sidebar isOpen={isSidebarOpen} activePath={location.pathname} />
         <div className="sm:ml-64">
            <div className="mt-[3.5rem] p-5 overflow-hidden">
               <Outlet />
            </div>
         </div>

         <ToastContainer />
      </>
   )
}