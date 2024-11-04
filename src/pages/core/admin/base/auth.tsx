import { Outlet } from "react-router-dom"

export const AuthAdmin: React.FC = () => {
   return (
      <div className="flex justify-center items-center bg-[#C51605] h-full">
         <Outlet />
      </div>
   )
}