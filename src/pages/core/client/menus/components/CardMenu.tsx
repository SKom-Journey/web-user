import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import BaseImg from "@/assets/images/base-img.webp"
import { Link } from "react-router-dom"
import { CirclePlusIcon } from "@/components/Icons"

interface CardMenuProps {
   title: string;
   price: number;
}

export const CardMenu: React.FC<CardMenuProps> = ({ title, price }) => {
   return (
      <Card className="shadow-sm mb-3">
         <CardHeader className="p-4">
            <div className="flex justify-between items-center">
               <div className="flex">
                  <img src={BaseImg} className="h-14 me-3 rounded" alt="base-img" />
                  <div className="flex flex-col">
                     <CardTitle className="mb-1">{title}</CardTitle>
                     <CardDescription>{price}</CardDescription>
                  </div>
               </div>
               <Link to={'#'}>
                  <CirclePlusIcon />
               </Link>
            </div>
         </CardHeader>
      </Card>
   )
}