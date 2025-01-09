import { PrintIcon, TrashIconRed } from "@/components/Icons";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { IQR } from "@/interfaces/IQR";
import { deleteQr, getQrs } from "@/services/qr_service";
import { useEffect, useRef, useState } from "react"
import QRCode from "react-qr-code";
import Modal from 'react-modal';
import Logo from "@/assets/images/ryomu-logo-red.png";
import { Loader, PlusIcon, PrinterIcon } from "lucide-react";
import getMenuUrl from "@/utils/get_menu_url";
import openPrintQrPage from "@/utils/open_print_qr_page";
import QRForm from "./QRForm";
import { ModalSM } from "@/config/theme";

export default function QRDataTable() {
   const [qrs, setQrs] = useState<IQR[]>([]);
   const [showForm, setShowForm] = useState<boolean>(false);
   const [showPrintOverlay, setShowPrintOverlay] = useState<boolean>(false);
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [markedQrs, setMarkedQrs] = useState<string[]>([]);
   const [qrValue, setQrValue] = useState<string>("");
   const [selectedQr, setSelectedQr] = useState<string>("");
   const qrRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setupData();
   }, []);

   async function onQrCreated() {
      setShowForm(false);
      await setupData();
   } 

   async function setupData() {
      const data = await getQrs();
      setQrs(data.data);
   }

   function handlePrint() {
      if (qrRef.current) {
         openPrintQrPage(qrRef.current.innerHTML);
      }
   }

   function showPrintModal(tableNumber: string) {
      setSelectedQr(tableNumber);
      setQrValue(getMenuUrl(tableNumber));
      setOpenModal(true);
   }

   async function deleteQrClicked(id: string) {
      setMarkedQrs(q => [...q, id]);
      await deleteQr(id);
      await setupData();
      setMarkedQrs(q => q.filter(qr => qr != id));
   }

   return (
      <>
         <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            style={ModalSM}
         >
            <button onMouseEnter={() => setShowPrintOverlay(true)} onMouseLeave={() => setShowPrintOverlay(false)} className="relative p-10 text-center" onClick={handlePrint}>
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
                     <div className="font-black mt-7 text-center text-4xl">
                        #{selectedQr}
                     </div>
                     <div className="font-black mt-6 text-center" style={{fontSize: "40px"}}>
                        Order Here
                     </div>
                  </div>
               </div>
            </button>
         </Modal>
      
         <div className="my-6 text-right">
            <button onClick={() => setShowForm(true)} className="ml-auto shadow-lg text-sm flex items-center bg-red-600 py-2 px-5 rounded-lg text-white">
               <PlusIcon className="mr-2" />
               <span>Create New</span>
            </button>
         </div>

         <div className="rounded-md border bg-white">
            <Modal
               isOpen={openModal}
               onRequestClose={() => setOpenModal(false)}
               style={ModalSM}
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
                        <div className="font-black mt-7 text-center text-4xl">
                           #{selectedQr}
                        </div>
                        <div className="font-black mt-6 text-center" style={{fontSize: "40px"}}>
                           Order Here
                        </div>
                     </div>
                  </div>
               </button>
            </Modal>

            <Table>
               <TableHeader>
                  <TableRow className="bg-red-600 text-white hover:bg-red-600">
                     <TableHead className="w-10 text-white">
                        No.
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
                     <QRForm isVisible={showForm} onSubmit={onQrCreated} />
                  }

                  {
                     qrs.map((q, i) => 
                        <TableRow key={i} className={`${markedQrs.includes(q.id) ? 'opacity-30' : ''}`}>
                           <TableCell>
                              {i+1}.
                           </TableCell>

                           <TableCell>
                              {q.table_number}
                           </TableCell>

                           <TableCell>
                              {
                                 markedQrs.includes(q.id) && <Loader />
                              }

                              {
                                 !markedQrs.includes(q.id) && <>
                                    <button className="mr-7" title="Print" onClick={() => showPrintModal(q.table_number)}>
                                       <PrintIcon />
                                    </button>

                                    <button title="Delete" onClick={() => deleteQrClicked(q.id)}>
                                       <TrashIconRed />
                                    </button>
                                 </>
                              }
                           </TableCell>
                        </TableRow>
                     )
                  }
               </TableBody>
            </Table>
         </div>
      </>
   )
}