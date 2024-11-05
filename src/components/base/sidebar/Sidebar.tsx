import { Layers3, NotebookText, QrCode, Utensils } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
   isOpen: boolean;
   activePath: string; // New prop to indicate the active path
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, activePath }) => {
   return (
      <aside className={`fixed z-0 left-0 w-64 h-full bg-red-400 shadow ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 sm:translate-x-0 sm:block`}>
         <div className="h-full px-3 py-8 overflow-y-auto bg-white">
            <ul className="space-y-5 font-medium">
               <li>
                  <NavLink to="/admin/manage-qr" className={`flex items-center p-4 rounded-lg group ${activePath === "/admin/manage-qr" ? 'bg-red-100 text-red-600' : 'text-gray-700'}`}>
                     <QrCode size={16} strokeWidth={1} className={activePath === "/admin/manage-qr" ? 'text-red-600' : 'text-gray-700'} />
                     <span className="ms-3 text-sm font-light">Manage QR</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/admin/incoming-order" className={`flex items-center p-4 rounded-lg group ${activePath === "/admin/incoming-order" ? 'bg-red-100 text-red-600' : 'text-gray-700'}`}>
                     <Utensils size={16} strokeWidth={1} className={activePath === "/admin/incoming-order" ? 'text-red-600' : 'text-gray-700'} />
                     <span className="ms-3 text-sm font-light">Incoming Order</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/admin/manage-category" className={`flex items-center p-4 rounded-lg group ${activePath === "/admin/manage-category" ? 'bg-red-100 text-red-600' : 'text-gray-700'}`}>
                     <Layers3 size={16} strokeWidth={1} className={activePath === "/admin/manage-category" ? 'text-red-600' : 'text-gray-700'} />
                     <span className="ms-3 text-sm font-light">Manage Category</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/admin/manage-menu" className={`flex items-center p-4 rounded-lg group ${activePath === "/admin/manage-menu" ? 'bg-red-100 text-red-600' : 'text-gray-700'}`}>
                     <NotebookText size={16} strokeWidth={1} className={activePath === "/admin/manage-menu" ? 'text-red-600' : 'text-gray-700'} />
                     <span className="ms-3 text-sm font-light">Manage Menu</span>
                  </NavLink>
               </li>
            </ul>
         </div>
      </aside>
   );
};
