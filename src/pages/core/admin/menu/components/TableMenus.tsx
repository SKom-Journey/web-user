import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow
} from "@/components/ui/table";
import DefaultImg from '@/assets/images/default_photo_menu.jpg'
import { Pencil, Trash } from "lucide-react";
import { IMenu } from "@/interfaces/IMenu";

interface TableMenusProps {
   menus: IMenu[];
   onDeleteMenu: (menuId: string) => void;
   onEditMenu: (menu: IMenu) => void;
}

export const TableMenus: React.FC<TableMenusProps> = ({ menus, onDeleteMenu, onEditMenu }) => {

   const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      event.currentTarget.src = DefaultImg;
   };

   return (
      <Table>
         <TableHeader>
            <TableRow className="bg-red-600 hover:bg-red-700">
               <TableHead className="w-[50px] text-white text-center p-4">No</TableHead>
               <TableHead className="text-white p-4">Image</TableHead>
               <TableHead className="text-white p-4">Name</TableHead>
               <TableHead className="text-white p-4">Price</TableHead>
               <TableHead className="text-white p-4">Description</TableHead>
               <TableHead className="text-right text-white p-4">Action</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {menus.map((menuItem, itemIndex) => (
               <TableRow key={menuItem.id}>
                  <TableCell className="p-4 font-medium text-center">{itemIndex + 1}</TableCell>
                  <TableCell className="p-4">
                     <img
                        src={menuItem?.img || DefaultImg}
                        alt={menuItem.title}
                        className="w-[50px] h-[50px] object-cover rounded"
                        onError={handleImageError}
                     />
                  </TableCell>
                  <TableCell className="p-4">{menuItem.title}</TableCell>
                  <TableCell className="p-4">Rp {menuItem.price}</TableCell>
                  <TableCell className="p-4">{menuItem.description}</TableCell>
                  <TableCell className="p-4 text-right flex items-center">
                     <Button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                        onClick={() => onEditMenu(menuItem)}
                     >
                        <Pencil size={16} />
                     </Button>
                     <Button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded ml-2"
                        onClick={() => onDeleteMenu(menuItem.id)}
                     >
                        <Trash size={16} />
                     </Button>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   );
};