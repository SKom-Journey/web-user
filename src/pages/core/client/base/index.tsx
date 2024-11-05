import { Menubar } from "@/components/base/menubar/Menubar";
import { Navbar } from "@/components/base/navbar/Navbar";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkUserSession } from "@/services/session_service";
import { checkTableNumber, storeTableNumber } from "@/services/table_service";

const titleMapping: { [key: string]: string } = {
   '/menu': 'Menu',
   '/chat': 'Chatbot',
   '/cart': 'Cart',
   '/order-success': 'Order Placed',
   '*': 'Not Found',
};

export const Base: React.FC = () => {
   const [searchParam, _] = useSearchParams();
   const location = useLocation();
   const navigate = useNavigate();
   const title = titleMapping[location.pathname]
   const contentRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const table = searchParam.get("table");
      if(table) { 
         storeTableNumber(table);
      }

      if(!checkTableNumber()) {
         navigate("/scan-table");
      } else if(!checkUserSession()) {
         navigate("/auth/login");
      }
   }, []);

   useEffect(() => {
      if (contentRef.current) {
         autoAnimate(contentRef.current, {
            duration: 150,
            easing: 'ease-in',
         });
      }
   }, [contentRef]);

   const hideMenubar = ['/chat', '/cart'].includes(location.pathname)

   return (
      <>
         <main className="bg-white overflow-hidden w-full max-w-[480px] m-auto">
            <div id="navbar" className="pb-[4rem]">
               <Navbar title={title} />
            </div>
            <div id="content" className="p-5" ref={contentRef}>
               <Outlet />
            </div>
            <div id="menubar">
               {!hideMenubar && (
                  <Menubar />
               )}
            </div>
         </main>

         <ToastContainer />
      </>
   );
};
