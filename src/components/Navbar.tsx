import { ArrowLeft } from "@/components/Icons"
import Logo from "@/assets/images/ryomu-logo.png"

export const Navbar = () => {
   return (
      <nav className="bg-white fixed z-20 top-0 border-b border-gray-200 dark:border-gray-600" style={{ width: "480px" }}>
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center">
               <ArrowLeft />
            </a>
            <a href="#" className="flex items-center">
               <img src={Logo} className="h-8" alt="Flowbite Logo" />
            </a>
         </div>
      </nav >
   )
}