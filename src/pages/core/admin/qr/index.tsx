import { PlusIcon } from "lucide-react"
import QRDataTable from "./components/QRDataTable"

export const QrPageAdmin = () => {
   return (
      <div>
         <div className="my-6 text-right">
            <button className="ml-auto shadow-lg text-sm flex items-center bg-red-600 py-2 px-5 rounded-lg text-white">
               <PlusIcon className="mr-2" />
               <span>Create New</span>
            </button>
         </div>

         <QRDataTable />
      </div>
   )
}