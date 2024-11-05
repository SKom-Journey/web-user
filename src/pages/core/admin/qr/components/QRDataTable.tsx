import { PrintIcon, TrashIcon } from "@/components/Icons";
import { Checkbox } from "@/components/ui/checkbox"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { IQR } from "@/interfaces/IQR";
import { getQrs } from "@/services/qr_service";
import { useEffect, useRef, useState } from "react"
import QRCode from "react-qr-code";
import Modal from 'react-modal';
import Logo from "@/assets/images/ryomu-logo.png";
import { PrinterIcon } from "lucide-react";
import getMenuUrl from "@/utils/get_menu_url";
import openPrintQrPage from "@/utils/open_print_qr_page";

export default function QRDataTable() {
   const [qrs, setQrs] = useState<IQR[]>([]);
   const [showPrintOverlay, setShowPrintOverlay] = useState<boolean>(false);
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [qrValue, setQrValue] = useState<string>("");
   const qrRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setupData();
   }, []);

   function selectAll() {

   }

   async function setupData() {
      const data = await getQrs();
      setQrs(data.data);
   }

   function handlePrint() {
      if (qrRef.current) {
         openPrintQrPage(qrRef.current.innerHTML);
      }
   };

   function showPrintModal(tableNumber: string) {
      setQrValue(getMenuUrl(tableNumber));
      setOpenModal(true);
   }

   return (
      <div className="rounded-md border bg-white">
         <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            contentLabel="Example Modal"
            style={{
               content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  padding: 0
               },
               overlay: {
                  background: "rgba(0,0,0,.5)"
               }
            }}
         >
            <button onMouseEnter={() => setShowPrintOverlay(true)} onMouseLeave={() => setShowPrintOverlay(false)}  className="relative p-10 text-center" onClick={handlePrint}>
               <div className={`${showPrintOverlay ? "absolute" : "hidden"} absolute top-0 bottom-0 right-0 left-0 bg-black flex items-center justify-center opacity-80`}>
                  <div className="text-white text-center">
                     <PrinterIcon size={80} className="m-auto" />
                     <div className="mt-6 text-4xl font-black">
                        Print
                     </div>
                  </div>
               </div>

               <div ref={qrRef}>
                  <div>
                     <img src={Logo} className="mb-12 w-52 m-auto" alt="" />
                     <QRCode value={qrValue} size={250}  />
                     <div className="font-black mt-12 text-center" style={{fontSize: "40px"}}>
                        Order Here
                     </div>
                  </div>
               </div>
            </button>
            
         </Modal>

         <Table>
            <TableHeader>
               <TableRow className="bg-red-600 text-white hover:bg-red-600">
                  <TableHead className="w-10">
                     <Checkbox
                        onCheckedChange={selectAll}
                        className="text-white border-white"
                     />
                  </TableHead>

                  <TableHead className="text-white">
                     Table Number
                  </TableHead>

                  <TableHead className="text-white w-52">
                     Actions
                  </TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {
                  qrs.map((q, i) => 
                     <TableRow key={i}>
                        <TableCell>
                           <Checkbox
                              onCheckedChange={selectAll}
                              className="text-white border"
                           />
                        </TableCell>

                        <TableCell>
                           {q.table_number}
                        </TableCell>

                        <TableCell>
                           <button className="mr-4" title="Print" onClick={() => showPrintModal(q.table_number)}>
                              <PrintIcon />
                           </button>

                           <button title="Delete">
                              <TrashIcon />
                           </button>
                        </TableCell>
                     </TableRow>
                  )
               }
               
            </TableBody>
         </Table>
      </div>
   )
}