import { ArrowLeftIcon } from "@/components/Icons"
import Logo from "@/assets/images/ryomu-logo.png"

interface NavbarProps {
   title: string
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
   return (
      <nav className="bg-white fixed z-20 top-0 border-b w-full border-gray-200 dark:border-gray-600" style={{ maxWidth: "480px" }}>
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center">
               <ArrowLeftIcon />
            </a>
            <p className="font-semibold">{title}</p>
            <a href="#" className="flex items-center">
               <img src={Logo} className="h-8" alt="Flowbite Logo" />
            </a>
         </div>
      </nav >
   )
}