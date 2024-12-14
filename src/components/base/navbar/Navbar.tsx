import { ArrowLeftIcon } from "@/components/Icons"
import Logo from "@/assets/images/ryomu-logo.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkUserSession } from "@/services/session_service";

interface NavbarProps {
   title: string
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
   const [showImg, setShowImg] = useState(false);

   useEffect(() => {
      setShowImg(checkUserSession());
   });

   function back() {
      history.back();
   }
   
   return (
      <nav className="bg-white fixed z-20 top-0 border-b w-full border-gray-200 dark:border-gray-600" style={{ maxWidth: "480px" }}>
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <button title="Back" onClick={back} className="flex items-center">
               <ArrowLeftIcon />
            </button>
            <p className="font-semibold">{title}</p>
            <div>
               {
                  showImg && 
                     <Link to='me' className="flex items-center" title="Profile">
                        <img src={Logo} className="h-8" alt="Flowbite Logo" />
                     </Link>
               }
               {
                  !showImg && <>&nbsp;</>
               }
            </div>
         </div>
      </nav>
   )
}