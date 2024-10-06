import { Menubar } from "@/components/Menubar"
import { Navbar } from "@/components/Navbar"
import { Outlet } from "react-router-dom"

export const Base: React.FC = () => {
   return (
      <main className="bg-white">
         <div id="navbar" className="pb-20">
            <Navbar />
         </div>
         <div id="content" className="p-5">
            <Outlet />
         </div>
         <div id="menubar">
            <Menubar />
         </div>
      </main>
   )
}