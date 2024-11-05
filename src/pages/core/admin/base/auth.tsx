import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export const AuthAdmin: React.FC = () => {
   return (
      <>
         <div className="flex justify-center items-center bg-[#C51605] h-full">
            <Outlet />
         </div>

         <ToastContainer />
      </>
   )
}