import { CardMenu } from "./components/CardMenu";
import { Fragment, useEffect, useState } from "react";
import { getMenus } from "@/services/menu_service";
import { IMenuList } from "@/interfaces/IMenuList";

export const MenuPage: React.FC = () => {
   const [menuItems, setMenuItems] = useState<IMenuList[]>([]);

   useEffect(() => {
      setupMenus();
   }, []);

   async function setupMenus() {
      const allMenus = await getMenus();
      setMenuItems(allMenus.data);
   }

   return (
      <div className="h-full pb-20">
         <div className="h-full overflow-y-auto" style={{scrollbarWidth: "thin"}}>
            {
               menuItems.map((m, i) => <Fragment key={i}>
                  <h1 className="font-bold my-4 text-xl">{m.category_name}</h1>
                  {m.items.map((item) => (
                     <CardMenu key={item.id} title={item.title} price={item.price} />
                  ))}
               </Fragment>)
            }
         </div>
      </div>
   );
};
