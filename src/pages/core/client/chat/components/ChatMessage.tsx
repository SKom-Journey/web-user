import ChatIcon from "@/assets/images/chat.png";
import { CirclePlusIcon } from "@/components/Icons";

export function ChatMessageComponent() {
   return (
    <div className="h-full">
        <div className="h-full flex flex-wrap justify-center items-center">
            <center>
                <img className="w-1/2" src={ChatIcon} alt="" />
                <div className="mt-6 text-sm">Hi, what can i do for you?</div>
            </center>
        </div>

        <div className="flex flex-col space-y-4 px-3 py-5">
            <div className="flex justify-end">
                <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg rounded-br-none shadow-lg text-sm">
                    Hello! How are you doing today?
                </div>
            </div>

            {/* <div className="flex items-start">
                <img width={30} className="mr-3" src={ChatIcon} alt="Recipient profile picture" />
                <div className="max-w-xs">
                    <div className="bg-gray-300 text-gray-900 p-3 rounded-lg rounded-bl-none shadow-lg text-sm">
                        Hi! I'm doing well, thanks. How about you?
                    </div>

                    <div className="mt-3">
                        <div className="flex rounded-lg border-2 shadow h-20 mt-2">
                            <div className="w-6/12 p-1.5">
                                <img className="rounded h-full w-full object-cover" src="https://cmx.weightwatchers.com/assets-proxy/weight-watchers/image/upload/v1594406683/visitor-site/prod/ca/burgers_mobile_my18jv" alt="" />
                            </div>
                            <div className="w-full p-1">
                                <div className="text-sm font-semibold">Borger</div>
                                <div className="mt-1 text-xs text-slate-500 truncate">desc</div>
                            </div>
                            <div className="w-2/12 flex px-2">
                                <button className="my-auto">
                                    <CirclePlusIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
   )
}
