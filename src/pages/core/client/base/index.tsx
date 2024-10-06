import { Menubar } from "@/components/base/menubar/Menubar";
import { Navbar } from "@/components/base/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const titleMapping: { [key: string]: string } = {
   '/menu': 'Menu',
   '/chat': 'Chat',
   '/cart': 'Cart',
   '*': 'Not Found',
};

export const Base: React.FC = () => {
   const location = useLocation();
   const title = titleMapping[location.pathname]

   return (
      <main className="bg-white">
         <div id="navbar" className="pb-20">
            <Navbar title={title} />
         </div>
         <div id="content" className="p-5">
            <Outlet />
         </div>
         <div id="menubar">
            <Menubar />
         </div>
      </main>
   );
};
