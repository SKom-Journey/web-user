import { useEffect, useRef } from 'react';
import { Loader } from "@/components/Loader"

interface InfiniteScrollProps {
   loadMore: () => void;
   hasMore: boolean;
   loading: boolean;
   children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ loadMore, hasMore, loading, children }) => {
   const observerRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting && hasMore && !loading) {
            loadMore();
         }
      });

      if (observerRef.current) {
         observer.observe(observerRef.current);
      }

      return () => {
         if (observerRef.current) {
            observer.unobserve(observerRef.current);
         }
      };
   }, [loadMore, hasMore, loading]);

   return (
      <div>
         {children}
         <div ref={observerRef} style={{ marginBottom: '20px' }} />
         {loading && (
            <div className='mb-20 flex justify-center'>
               <Loader />
            </div>
         )}
      </div>
   );
};

export default InfiniteScroll;
