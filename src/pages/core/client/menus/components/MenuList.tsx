import { IMenuList } from "@/interfaces/IMenuList";
import { getMenus } from "@/services/menu_service";
import { Fragment, useEffect, useState } from "react";
import { CardMenu } from "./CardMenu";

export default function MenuList() {
    const [menuItems, setMenuItems] = useState<IMenuList[]>([]);

   useEffect(() => {
      setupMenus();
   }, []);

   async function setupMenus() {
      const allMenus = await getMenus();
      setMenuItems(allMenus.data);
   }

   return (
      <div className="h-full">
         <div className="h-full overflow-y-auto" style={{scrollbarWidth: "thin"}}>
            {
               menuItems.map((m, i) => <Fragment key={i}>
                  <h1 className="font-bold my-4 text-xl">{m.category_name}</h1>
                  {m.items.map((item) => (
                     <CardMenu key={item.id} menu={item} />
                  ))}
               </Fragment>)
            }
         </div>
      </div>
   );
}