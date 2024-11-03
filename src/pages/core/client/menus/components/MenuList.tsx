import { IMenuList } from "@/interfaces/IMenuList";
import { getMenus } from "@/services/menu_service";
import { Fragment, useEffect, useState } from "react";
import { CardMenu } from "./CardMenu";
import { getCartsByUserId } from "@/services/cart_service";
import { ICart } from "@/interfaces/ICart";

export default function MenuList() {
   const [menuItems, setMenuItems] = useState<IMenuList[]>([]);
   const [carts, setCarts] = useState<ICart[]>([]);
   const [cartUpdated, setCartUpdated] = useState<boolean>(false);
   const [cartUpdating, setCartUpdating] = useState<boolean>(false);

   useEffect(() => {
      if(cartUpdated) {
         setupCarts();
      }
   }, [cartUpdated])

   useEffect(() => {
      setupMenus();
   }, []);

   async function setupMenus() {
      const allMenus = await getMenus();
      await setupCarts();
      setMenuItems(allMenus.data);
   }
   
   async function setupCarts() {
      setCartUpdating(true);
      const userCarts = await getCartsByUserId();
      setCarts(userCarts.data);
      setCartUpdated(false);
      setCartUpdating(false);
   }

   return (
      <div className="h-full">
         <div className="h-full overflow-y-auto" style={{scrollbarWidth: "thin"}}>
            {
               menuItems.map((m, i) => <Fragment key={i}>
                  <h1 className="font-bold my-4 text-xl">{m.category_name}</h1>
                  {m.items.map((item) => (
                     <CardMenu 
                        key={item.id} 
                        menu={{
                           price: item.price,
                           id: item.id,
                           title: item.title,
                           img: item.img,
                           description: item.description
                        }}
                        carts={carts}
                        setCartUpdated={setCartUpdated}
                        cartUpdating={cartUpdating}
                     />
                  ))}
               </Fragment>)
            }
         </div>
      </div>
   );
}