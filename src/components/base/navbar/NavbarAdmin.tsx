import RyomuNavLogo from '@/assets/images/ryomu-logo-nav.png'
import { Button } from '@/components/ui/button'
import { Menu } from "lucide-react"
import { useState } from 'react'
import { MenuComponent } from './MenuComponent'

interface NavbarAdminProps {
   toggleSidebar: () => void
}

export const NavbarAdmin: React.FC<NavbarAdminProps> = ({ toggleSidebar }) => {
   const [isProfileOpen, setProfileOpen] = useState(false);

   const toggleProfile = () => {
      setProfileOpen(!isProfileOpen);
   };

   return (
      <nav className="fixed top-0 z-50 w-full bg-[#C51605] border-b border-gray-200">
         <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
               <div className="flex items-center justify-start rtl:justify-end">
                  <Button onClick={toggleSidebar} className={`!p-0 sm:hidden !bg-transparent ms-1 transition-transform duration-300`}>
                     <Menu color='#FFFFFF' />
                  </Button>
                  <a href="/admin/manage-qr" className="flex ms-2 md:me-24">
                     <img src={RyomuNavLogo} className="h-8 me-3" alt="Ryomu Logo" />
                  </a>
               </div>
               <MenuComponent isOpen={isProfileOpen} toggleProfile={toggleProfile} />
            </div>
         </div>
      </nav>
   )
}