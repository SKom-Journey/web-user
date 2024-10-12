import {
   NavigationMenu,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { CartIcon, HomeIcon } from "@/components/Icons";
import ChatRed from "@/assets/images/chat_red.png";

export const MenubarList = () => {
   return (
      <NavigationMenu>
         <NavigationMenuList className="gap-10">
            <NavigationMenuItem>
               <Link to={"/menu"}>
                  <NavigationMenuLink className="me-3 text-center flex flex-col">
                     <HomeIcon />
                     <span className="text-xs pt-1 text-white">Home</span>
                  </NavigationMenuLink>
               </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <Link to={"/chat"}>
                  <NavigationMenuLink className="me-3 text-center flex flex-col">
                     <center>
                        <img width={23} src={ChatRed} alt="" />
                     </center>
                     <span className="text-xs pt-1 text-white">Chatbot</span>
                  </NavigationMenuLink>
               </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <Link to={"/cart"}>
                  <NavigationMenuLink className="me-3 text-center flex flex-col">
                     <CartIcon />
                     <span className="text-xs pt-1 text-white">Cart</span>
                  </NavigationMenuLink>
               </Link>
            </NavigationMenuItem>
         </NavigationMenuList>
      </NavigationMenu>

   )
}