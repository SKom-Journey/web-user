import { useEffect, useState } from "react";
import { getMenus, deleteMenus, createMenus, updateMenus } from "@/services/menu_service";
import { TableMenus } from "./components/TableMenus";
import { IMenu } from "@/interfaces/IMenu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogMenus } from "./components/DialogMenus";

export const MenuPageAdmin = () => {
   const [menus, setMenus] = useState<IMenu[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
   const [menuToEdit, setMenuToEdit] = useState<IMenu | null>(null);

   // Fetch menus from the API when the component mounts
   useEffect(() => {
      const fetchMenus = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await getMenus();
            if (response.data) {
               setMenus(response.data);
            } else {
               setError("Failed to load menus.");
            }
         } catch (err) {
            console.error("Error fetching menus:", err);
            setError("An error occurred while fetching menus.");
         } finally {
            setLoading(false);
         }
      };
      fetchMenus();
   }, []);

   // Handle menu deletion
   const handleDeleteMenu = async (menuId: string) => {
      try {
         const result = await deleteMenus(menuId);
         if (result) {
            setMenus(prevMenus => prevMenus.filter(menu => menu.id !== menuId));
         }
      } catch (error) {
         console.error(error);
         setError("Failed to delete menu.");
      }
   };

   // Open the dialog to create or edit a menu
   const handleOpenDialog = (menu: IMenu | null = null) => {
      setMenuToEdit(menu);
      setIsDialogOpen(true);
   };

   // Close the dialog
   const handleCloseDialog = () => {
      setMenuToEdit(null);
      setIsDialogOpen(false);
   };

   // Handle creating a new menu
   const handleCreateMenu = async (menuData: IMenu) => {
      try {
         const result = await createMenus(menuData);
         if (result) {
            setMenus(prevMenus => [...prevMenus, result.data]);
         }
      } catch (error) {
         console.error("Error creating menu:", error);
         setError("Failed to create menu.");
      }
   };

   // Handle updating an existing menu
   const handleUpdateMenu = async (menuId: string, menuData: IMenu) => {
      try {
         const result = await updateMenus(menuId, menuData);
         if (result) {
            setMenus(prevMenus => prevMenus.map(menu => (menu.id === menuId ? result.data : menu)));
         }
      } catch (error) {
         console.error("Error updating menu:", error);
         setError("Failed to update menu.");
      }
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div className="text-red-500">{error}</div>;
   }

   return (
      <>
         <DialogMenus
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onCreateMenu={handleCreateMenu}
            onUpdateMenu={handleUpdateMenu}
            menuToEdit={menuToEdit}
         />
         <div className="text-end">
            <Button className="mb-3 bg-red-600 hover:bg-red-700" onClick={() => handleOpenDialog()}>
               Create Menu
               <Plus size={16} />
            </Button>
            <div className="bg-white shadow rounded-lg p-4">
               <TableMenus menus={menus} onDeleteMenu={handleDeleteMenu} onEditMenu={handleOpenDialog} />
            </div>
         </div>
      </>
   );
};