import { EditIcon, TrashIconRed } from "@/components/Icons";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import Modal from 'react-modal';
import { Loader, PlusIcon } from "lucide-react";
import getMenuUrl from "@/utils/get_menu_url";
import CategoryForm from "./CategoryForm";
import { ModalSM } from "@/config/theme";
import { deleteCategory, getCategories } from "@/services/category_service";
import { ICategory } from "@/interfaces/ICategory";
import { IMenu } from "@/interfaces/IMenu";
import { getMenuByCategory, getMenuOutsideCategory } from "@/services/menu_service";
import localizeNumber from "@/utils/localize_number";

export default function CategoryDataTable() {
   const [menuInsideCategory, setMenuInsideCategory] = useState<IMenu[]>([]);
   const [menuOutsideCategory, setMenuOutsideCategory] = useState<IMenu[]>([]);
   const [categories, setCategories] = useState<ICategory[]>([]);
   const [showForm, setShowForm] = useState<boolean>(false);
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [markedCategories, setMarkedCategories] = useState<string[]>([]);
   const [categoryValue, setCategoryValue] = useState<string>("");
   const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        setupData();
    }, []);

   async function onCategoryCreated() {
        setShowForm(false);
        await setupData();
   } 

   async function setupData() {
        const data = await getCategories();
        setCategories(data.data);
   }

   function triggerEditMode(tableNumber: string) {
        setSelectedCategory(tableNumber);
        setCategoryValue(getMenuUrl(tableNumber));
    }
    
    function triggerEditMenuMode(id: string) {
        setOpenModal(true);
        setupMenuInCategory(id);
        setupMenuOutsideCategory(id);
   }

   async function setupMenuOutsideCategory(categoryId: string) {
        setMenuOutsideCategory([]);
        const menus = await getMenuOutsideCategory(categoryId);
        setMenuOutsideCategory(menus.data);
   }

   async function setupMenuInCategory(categoryId: string) {
        setMenuInsideCategory([]);
        const menus = await getMenuByCategory(categoryId);
        setMenuInsideCategory(menus.data);
   }

   async function deleteCategoryClicked(id: string) {
        setMarkedCategories(q => [...q, id]);
        await deleteCategory(id);
        await setupData();
        setMarkedCategories(c => c.filter(c => c != id));
   }

   return (
      <>
         <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            style={ModalSM}
         >
            <div>
                <div className="flex text-center py-2 border-b font-bold text-lg">
                    <div className="w-full">Menu In Category</div>
                    <div className="w-full">Menu Outside Category</div>
                </div>
                <div className="flex" style={{width: '1200px'}}>
                    <div className="w-full overflow-auto" style={{maxHeight: '600px'}}>
                            {
                                menuInsideCategory.map((m, i) => 
                                    <button key={i} draggable type="button" title={m.title} className="flex items-center justify-center p-2 border hover:bg-slate-400 w-full rounded text-left border">
                                        <div>
                                            <img className="object-cover h-16 w-16" src={m.img} alt="" />
                                        </div>
                                        <div className="w-full px-2">
                                            {m.title}
                                        </div>
                                        <div>
                                            Rp.{localizeNumber(m.price)}
                                        </div>
                                    </button>
                                )
                            }
                    </div>
                    <div className="w-44 font-semibold text-center flex items-center justify-center mx-4">
                        Drag Menu To Left Or Right
                    </div>
                    <div className="w-full overflow-auto" style={{maxHeight: '600px'}}>
                            {
                                menuOutsideCategory.map((m, i) => 
                                    <button key={i} draggable type="button" title={m.title} className="flex items-center justify-center p-2 hover:bg-slate-400 w-full rounded text-left border">
                                        <div>
                                            <img className="object-cover h-16 w-16" src={m.img} alt="" />
                                        </div>
                                        <div className="w-full px-2">
                                            {m.title}
                                        </div>
                                        <div>
                                            Rp.{localizeNumber(m.price)}
                                        </div>
                                    </button>
                                )
                            }
                    </div>
                </div>
            </div>
         </Modal>
      
         <div className="my-6 text-right">
            <button onClick={() => setShowForm(true)} className="ml-auto shadow-lg text-sm flex items-center bg-red-600 py-2 px-5 rounded-lg text-white">
               <PlusIcon className="mr-2" />
               <span>Create New</span>
            </button>
         </div>

         <div className="rounded-md border bg-white">
            <Table>
               <TableHeader>
                  <TableRow className="bg-red-600 text-white hover:bg-red-600">
                     <TableHead className="w-10 text-white">
                        No.
                     </TableHead>

                     <TableHead className="text-white">
                        Name
                     </TableHead>

                     <TableHead className="text-white w-52">
                        Total Menu Inside
                     </TableHead>

                     <TableHead className="text-white w-52">
                        Actions
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {
                     <CategoryForm isVisible={showForm} onSubmit={onCategoryCreated} />
                  }

                  {
                     categories.map((c, i) => 
                        <TableRow key={i} className={`${markedCategories.includes(c.id) ? 'opacity-30' : ''}`}>
                           <TableCell>
                              {i+1}.
                           </TableCell>

                           <TableCell>
                              {c.name}
                           </TableCell>

                           <TableCell>
                                <a onClick={() => triggerEditMenuMode(c.id)} href='#' className="text-blue-500 underline cursor-pointer">{c.total_menu}</a>
                           </TableCell>

                           <TableCell>
                              {
                                markedCategories.includes(c.id) && <Loader />
                              }

                              {
                                !markedCategories.includes(c.id) && <>
                                    <button className="mr-7" title="Print" onClick={() => triggerEditMode(c.id)}>
                                       <EditIcon />
                                    </button>

                                    <button title="Delete" onClick={() => deleteCategoryClicked(c.id)}>
                                       <TrashIconRed />
                                    </button>
                                 </>
                              }
                           </TableCell>
                        </TableRow>
                     )
                  }
               </TableBody>
            </Table>
         </div>
      </>
   )
}