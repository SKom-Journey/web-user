import { Menubar } from "@/components/base/menubar/Menubar";
import { Navbar } from "@/components/base/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

const titleMapping: { [key: string]: string } = {
   '/menu': 'Menu',
   '/chat': 'Chat',
   '/cart': 'Cart',
   '*': 'Not Found',
};

export const Base: React.FC = () => {
   const location = useLocation();
   const title = titleMapping[location.pathname]
   const contentRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (contentRef.current) {
         autoAnimate(contentRef.current, {
            duration: 150,
            easing: 'ease-in',
         });
      }
   }, [contentRef]);

   const hideMenubar = location.pathname === '/chat'

   return (
      <main className="bg-white overflow-hidden">
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
   );
};
