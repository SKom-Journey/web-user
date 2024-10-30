import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LogOut, Settings, UserRoundCog } from "lucide-react";


interface ProfileProps {
   isOpen: boolean;
   toggleProfile: () => void;
}

export const MenuComponent: React.FC<ProfileProps> = ({ isOpen, toggleProfile }) => {
   return (
      <div className="flex items-center relative">
         <div className="flex items-center ms-3">
            <div>
               <button onClick={toggleProfile} type="button" className={`flex text-md rounded-full transition-transform duration-200 ${isOpen ? 'rotate-[60deg]' : 'rotate-0'}`}>
                  <Settings size={20} color="#FFFFFF" />
               </button>
            </div>
            {isOpen && (
               <div className="transition-transform duration-300">
                  <MenuList />
               </div>
            )}
         </div>
      </div>
   )
}

const MenuList = () => {
   const [isLoading, setLoading] = useState(false)

   const onLogoutClick = () => {
      setLoading(true)
   };

   return (
      <div className="absolute w-36 top-3 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow">
         <ul className="py-1" role="none">
            <li className="flex justify-between items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
               <p>Settings</p>
               <UserRoundCog size={16} />
            </li>
         </ul>
         <div className="p-2">
            <Button onClick={onLogoutClick} className="flex w-full justify-between items-center px-4 py-2 text-sm text-red-700 bg-red-200 hover:bg-red-100 rounded-lg">
               <p>Logout</p>
               {isLoading ? <LoaderCircle size={16} className="animate-spin" /> : <LogOut size={16} />}
            </Button>
         </div>
      </div>
   );
}