import { MenubarList } from "./MenubarList"

export const Menubar = () => {
   return (
      <nav className="bg-white fixed z-20 bottom-0 w-full  border-gray-200 rounded-t-lg" style={{ maxWidth: "480px", backgroundColor: "#C51605" }}>
         <div className="max-w-screen-xl flex flex-wrap justify-center mx-auto p-4">
            <MenubarList />
         </div>
      </nav >
   )
}