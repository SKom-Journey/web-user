import { Outlet } from "react-router-dom";

export const AuthClient: React.FC = () => {
   return (
      <main className="overflow-hidden h-screen w-full max-w-[480px] m-auto">
         <div className="h-full">
            <Outlet />
         </div>
      </main>
   );
};
