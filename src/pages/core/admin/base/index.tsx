import { NavbarAdmin } from "@/components/base/navbar/NavbarAdmin"
import { Sidebar } from "@/components/base/sidebar/Sidebar"
import { Outlet } from "react-router-dom"

export const BaseAdmin: React.FC = () => {
   return (
      <>
         <NavbarAdmin />
         <Sidebar />
         <div className="sm:ml-64">
            <div className="mt-[4.8rem] md:mt-[4rem] lg:mt-[4rem] p-5 overflow-hidden">
               <Outlet />
            </div>
         </div>
      </>
   )
}