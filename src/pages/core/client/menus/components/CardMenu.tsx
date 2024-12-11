import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import AddToCartButton from "@/components/AddToCartButton";
import { IMenu } from "@/interfaces/IMenu";
import { ICart } from "@/interfaces/ICart";
import { Link } from "react-router-dom";
import localizeNumber from "@/utils/localize_number";

interface CardMenuProps {
   menu: IMenu;
   carts: ICart[];
   cartUpdating: boolean;
   setCartUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardMenu: React.FC<CardMenuProps> = ({ menu, carts, setCartUpdated, cartUpdating }) => {
   return (
      <Card className="shadow-sm mb-3">
         <CardHeader className="p-0">
            <div className="flex justify-between items-center">
               <Link to={`/detail/${menu.id}`} className="flex w-full hover:bg-slate-200 rounded p-4">
                  <img src={menu.img} className="me-3 rounded w-14 h-14 object-cover" alt="menu.jpg" />
                  <div className="flex flex-col">
                     <CardTitle className="mb-1">{menu.title}</CardTitle>
                     <CardDescription>Rp.{localizeNumber(menu.price)}</CardDescription>
                  </div>
               </Link>
               
               <div className="px-6">
                  <AddToCartButton cartUpdating={cartUpdating} carts={carts} menu={menu} setCartUpdated={setCartUpdated} />
               </div>
            </div>
         </CardHeader>
      </Card>
   )
}