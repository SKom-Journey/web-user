import { IMenuList } from "@/interfaces/IMenuList";
import { getMenuWithCategory } from "@/services/menu_service";
import { Fragment, useEffect, useState } from "react";
import { CardMenu } from "./CardMenu";
import { getCartsByUserId } from "@/services/cart_service";
import { ICart } from "@/interfaces/ICart";
import Cooking from "@/assets/svg/cooking.svg";
import { TextInputSM } from "@/config/theme";
import { useDebounce } from "use-debounce";
import { SearchIcon } from "@/components/Icons";
import Spinner from "@/components/Spinner";

export default function MenuList() {
   const [menuItems, setMenuItems] = useState<IMenuList[]>([]);
   const [carts, setCarts] = useState<ICart[]>([]);
   const [isEmpty, setIsEmpty] = useState<boolean>(false);
   const [cartUpdated, setCartUpdated] = useState<boolean>(false);
   const [cartUpdating, setCartUpdating] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [value, setValue] = useState("");
   const [debouncedValue] = useDebounce(value, 1000);

   useEffect(() => {
      if(cartUpdated) {
         setupCarts();
      }
   }, [cartUpdated]);

   useEffect(() => {
      setupMenus();
   }, []);

   useEffect(() => {
      if(debouncedValue.length > 0) {
         searchMenu();
      } else {
         setupMenus();
      }
   }, [debouncedValue]);

   async function setupMenus() {
      setIsEmpty(false);
      setIsLoading(true);
      const allMenus = await getMenuWithCategory();
      await setupCarts();
      setMenuItems(allMenus.data);
      setIsLoading(false);
   }
   
   async function searchMenu() {
      setIsEmpty(false);
      setIsLoading(true);
      const menus = await getMenuWithCategory(debouncedValue);
      
      if(menus.data.length === 0) {
         setIsEmpty(true);
         setIsLoading(false);
         return;
      }
      
      setMenuItems([{items: menus.data, category_name: null}]);
      setIsLoading(false);
   }
   
   async function setupCarts() {
      setCartUpdating(true);
      const userCarts = await getCartsByUserId();
      setCarts(userCarts.data);
      setCartUpdated(false);
      setCartUpdating(false);
   }

   return (
      <div className="h-full overflow-hidden">
         <div className="flex border-b py-1 mb-2 justfiy-center items-center" style={{maxHeight: '6%'}}>
            <SearchIcon />
            <input value={value} onChange={(e) => setValue(e.target.value)} type="search" placeholder="Craving for something?" className={`${TextInputSM} outline-none ml-2`} />
         </div>

         <div className="overflow-y-auto" style={{scrollbarWidth: "thin", maxHeight: '94%'}}>
            {
               isLoading && 
                  <div className="h-full flex items-center justify-center">
                     <center>
                        <Spinner size="xl" />
                        <div className="mt-3 font-semibold">Loading...</div>
                     </center>
                  </div>
            }

            {
               !isLoading && !isEmpty && menuItems.map((m, i) => 
                  <Fragment key={i}>
                     <h1 className="font-bold my-4 text-xl">{m.category_name ?? `Results for: ${debouncedValue}`}</h1>
                     {m.items?.map((item) => (
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
                  </Fragment>
               )
            }

            {
               !isLoading && isEmpty && 
                  <div className="h-full flex items-center justify-center">
                     <center>
                        <img src={Cooking} className="w-1/2" alt="" srcSet="" />
                        <div className="mt-5 font-semibold">Oops, No Menu Found...</div>
                     </center>
                  </div>
            }
         </div>
      </div>
   );
}