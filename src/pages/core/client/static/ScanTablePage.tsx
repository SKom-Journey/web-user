import QR from "@/assets/images/qr.png";

export default function ScanTablePage() {
    return(
        <div className="h-full flex justify-center items-center">
            <center>
                <div className="font-bold text-2xl mb-4">Table not found</div>
                <img src={QR} alt="" className="w-1/2 mb-4" />
                <div className="text-md font-semibold mb-1">It seems you haven't scanned any QR code yet</div>
                <div className="text-md font-semibold">Please scan the QR code on the table to get started!</div>
            </center>
        </div>
    )
}