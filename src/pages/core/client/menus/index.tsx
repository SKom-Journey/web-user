import MenuList from "./components/MenuList";

export const MenuPage: React.FC = () => {
   return (
      <div className="h-full pb-20">
         <div className="h-full overflow-y-auto" style={{scrollbarWidth: "thin"}}>
            <MenuList />
         </div>
      </div>
   );
};
