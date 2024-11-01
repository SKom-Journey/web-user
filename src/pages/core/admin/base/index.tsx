import { NavbarAdmin } from "@/components/base/navbar/NavbarAdmin"
import { Sidebar } from "@/components/base/sidebar/Sidebar"
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"

export const BaseAdmin: React.FC = () => {
   const location = useLocation()
   const [isSidebarOpen, setSidebarOpen] = useState(false);

   const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
   };
   return (
      <>
         <NavbarAdmin toggleSidebar={toggleSidebar} />
         <Sidebar isOpen={isSidebarOpen} activePath={location.pathname} />
         <div className="sm:ml-64">
            <div className="mt-[3.5rem] p-5 overflow-hidden">
               <Outlet />
            </div>
         </div>
      </>
   )
}