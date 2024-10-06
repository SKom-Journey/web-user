import { CardMenu } from "./components/CardMenu"

const menuItems = [
   { id: 1, title: "Menu Item 1", price: "Rp 15.000" },
   { id: 2, title: "Menu Item 2", price: "Rp 15.000" },
   { id: 3, title: "Menu Item 3", price: "Rp 15.000" },
   { id: 4, title: "Menu Item 4", price: "Rp 15.000" },
   { id: 5, title: "Menu Item 5", price: "Rp 15.000" },
   { id: 6, title: "Menu Item 6", price: "Rp 15.000" },
   { id: 7, title: "Menu Item 7", price: "Rp 15.000" },
   { id: 8, title: "Menu Item 8", price: "Rp 15.000" },
   { id: 9, title: "Menu Item 9", price: "Rp 15.000" },
   { id: 10, title: "Menu Item 10", price: "Rp 15.000" },
   { id: 11, title: "Menu Item 11", price: "Rp 15.000" },
   { id: 12, title: "Menu Item 12", price: "Rp 15.000" },
   { id: 13, title: "Menu Item 13", price: "Rp 15.000" },
   { id: 14, title: "Menu Item 14", price: "Rp 15.000" },
   { id: 15, title: "Menu Item 15", price: "Rp 15.000" },
   { id: 16, title: "Menu Item 16", price: "Rp 15.000" },
   { id: 17, title: "Menu Item 17", price: "Rp 15.000" },
   { id: 18, title: "Menu Item 18", price: "Rp 15.000" },
   { id: 19, title: "Menu Item 19", price: "Rp 15.000" },
   { id: 20, title: "Menu Item 20", price: "Rp 15.000" },
];


export const MenuPage: React.FC = () => {
   return (
      <>
         {menuItems.map(item => (
            <CardMenu
               key={item.id}
               title={item.title}
               price={item.price}
            />
         ))}
      </>
   );
}