import { EditIcon, LocationDotIcon, MoneyIcon } from "@/components/Icons";

export default function CartSummary() {
    return(
        <>
            <div className="shadow-lg rounded-lg border p-3 font-bold">
                <div className="mb-3 text-lg">Order Placed</div>
                <div className="text-sm flex">
                <div><LocationDotIcon /></div>
                <div className="ml-2 font-semibold">Table 12</div>
                </div>
            </div>
            
            <div className="shadow-lg rounded-lg border p-3 font-bold mt-5">
                <div className="mb-3 text-lg">Order Summary</div>

                <div className="text-sm flex flex-wrap font-semibold">
                <div className="w-full flex">
                    <div className="w-1/12">2x</div>
                    <div className="w-full truncate">
                        Nasi Kandar Mas Rusdi
                    </div>
                    <div className="w-4/12 text-right">
                        Rp.14.000
                    </div>
                </div>

                <div className="w-full text-xs text-slate-400 mt-2 flex justify-center items-center">
                    <div className="mr-1">Note:</div>
                    <div className="w-full truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptate odit totam similique impedit commodi error, et quas? Architecto ab ea ipsum debitis illo inventore quaerat optio provident fugit nemo.</div>
                    <div className="ml-2 text-sm">
                        <button type="button">
                            <EditIcon />
                        </button>
                    </div>
                </div>
                </div>

                <div className="text-sm flex flex-wrap font-semibold mt-5">
                <div className="w-full flex">
                    <div className="w-1/12">2x</div>
                    <div className="w-full truncate">
                        Nasi Goreng Ngawi Spesial
                    </div>
                    <div className="w-4/12 text-right">
                        Rp.14.000
                    </div>
                </div>
                
                <div className="w-full text-xs text-slate-400 mt-2 flex justify-center items-center">
                    <div className="mr-1">Note:</div>
                    <div className="w-full truncate">-</div>
                    <div className="ml-2 text-sm">
                        <button type="button">
                            <EditIcon />
                        </button>
                    </div>
                </div>
                </div>
                
                <div className="text-lg flex font-bold mt-1 text-green-500 mt-6">
                <div className="w-full">Subtotal</div>
                <div className="w-1/12"></div>
                <div className="w-4/12 text-right">Rp.28.000</div>
                </div>
            </div>

            <div className="shadow-lg rounded-lg flex border px-3 py-4 justify-center text-lg items-center font-bold mt-5">
                <div className="w-full">Payment Method</div>
                <div className="flex justify-center items-center">
                <MoneyIcon />
                <div className="ml-2 text-sm">Cash</div>
                </div>
            </div>
        </>
    )
}