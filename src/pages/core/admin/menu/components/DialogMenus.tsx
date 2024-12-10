import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IMenu } from "@/interfaces/IMenu";
import { useEffect, useState } from "react";

interface DialogMenusProps {
   isOpen: boolean;
   onClose: () => void;
   onCreateMenu: (menuData: IMenu) => void;
   onUpdateMenu: (menuId: string, menuData: IMenu) => void;
   menuToEdit: IMenu | null;
}

export const DialogMenus: React.FC<DialogMenusProps> = ({ isOpen, onClose, onCreateMenu, onUpdateMenu, menuToEdit }) => {
   const [title, setTitle] = useState<string>('');
   const [img, setImg] = useState<string>('');
   const [price, setPrice] = useState<number>(0);
   const [description, setDescription] = useState<string>('');

   useEffect(() => {
      if (menuToEdit) {
         setTitle(menuToEdit.title);
         setImg(menuToEdit.img);
         setPrice(menuToEdit.price);
         setDescription(menuToEdit.description);
      }
   }, [menuToEdit]);

   const handleSubmit = () => {
      const menuData: IMenu = {
         title,
         img,
         price,
         description,
         id: menuToEdit ? menuToEdit.id : '',
      };

      if (menuToEdit) {
         onUpdateMenu(menuToEdit.id, menuData);
      } else {
         onCreateMenu(menuData);
      }

      setTitle('');
      setImg('');
      setPrice(0);
      setDescription('');
      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="w-full">
            <DialogHeader>
               <DialogTitle>{menuToEdit ? "Edit Menu" : "Create New Menu"}</DialogTitle>
            </DialogHeader>
            <div className="mx-auto w-full">
               <div className="py-2 items-center gap-1.5">
                  <span className="text-xs text-gray-600">Title</span>
                  <Input
                     className="w-full"
                     type="text"
                     placeholder="Input Here"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>
               <div className="py-2 items-center gap-1.5">
                  <span className="text-xs text-gray-600">Image</span>
                  <Input
                     className="w-full"
                     type="text"
                     placeholder="Input Img url"
                     value={img}
                     onChange={(e) => setImg(e.target.value)}
                  />
               </div>
               <div className="py-2 items-center gap-1.5">
                  <span className="text-xs text-gray-600">Price</span>
                  <Input
                     className="w-full"
                     type="number"
                     placeholder="Input Price"
                     value={price}
                     onChange={(e) => setPrice(Number(e.target.value))}
                  />
               </div>
               <div className="py-2 items-center gap-1.5">
                  <span className="text-xs text-gray-600">Description</span>
                  <Input
                     className="w-full"
                     type="text"
                     placeholder="Input Description"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </div>
            </div>
            <Button className="rounded-lg bg-red-600" onClick={handleSubmit}>
               Submit
            </Button>
         </DialogContent>
      </Dialog>
   );
};