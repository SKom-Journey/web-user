import { CardMenu } from "./components/CardMenu";
import { useState } from "react";
import InfiniteScroll from "@/components/InfiniteScroll";

const initialMenuItems = Array.from({ length: 10 }, (_, index) => ({
   id: index + 1,
   title: `Menu Item ${index + 1}`,
   price: "Rp 15.000",
}));

export const MenuPage: React.FC = () => {
   const [menuItems, setMenuItems] = useState(initialMenuItems);
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);

   const loadMoreItems = () => {
      setLoading(true);
      setTimeout(() => {
         const nextItems = Array.from({ length: 10 }, (_, index) => ({
            id: menuItems.length + index + 1,
            title: `Menu Item ${menuItems.length + index + 1}`,
            price: "Rp 15.000",
         }));

         setMenuItems((prevItems) => [...prevItems, ...nextItems]);

         if (nextItems.length < 10) {
            setHasMore(false);
         }

         setLoading(false);
      }, 1000);
   };

   return (
      <InfiniteScroll loadMore={loadMoreItems} hasMore={hasMore} loading={loading}>
         {menuItems.map((item) => (
            <CardMenu key={item.id} title={item.title} price={item.price} />
         ))}
      </InfiniteScroll>
   );
};
