import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import AddToCartButton from "@/components/AddToCartButton";
import { IMenu } from "@/interfaces/IMenu";

interface CardMenuProps {
   menu: IMenu
}

export const CardMenu: React.FC<CardMenuProps> = ({ menu }) => {
   return (
      <Card className="shadow-sm mb-3">
         <CardHeader className="p-4">
            <div className="flex justify-between items-center">
               <div className="flex">
                  <img src={menu.img} className="me-3 rounded w-14 h-14 object-cover" alt="menu.jpg" />
                  <div className="flex flex-col">
                     <CardTitle className="mb-1">{menu.title}</CardTitle>
                     <CardDescription>Rp.{menu.price}</CardDescription>
                  </div>
               </div>
               <Link to={'#'}>
                  <AddToCartButton menu={menu} />
               </Link>
            </div>
         </CardHeader>
      </Card>
   )
}