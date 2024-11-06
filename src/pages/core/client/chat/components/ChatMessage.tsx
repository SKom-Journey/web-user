import ChatIcon from "@/assets/images/chat.png";
import { Dispatch, FC, Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import io, { Socket } from 'socket.io-client';
import { IResponse } from "@/interfaces/IResponse";
import websocketConfig from "@/config/websocket";
import { Loader } from "@/components/Loader";
import truncateText from "@/utils/truncate_text";
import AddToCartButton from "@/components/AddToCartButton";
import { ICart } from "@/interfaces/ICart";
import { getUserInfo } from "@/services/session_service";
import { getUserChats } from "@/services/chat_service";
import { IChat } from "@/interfaces/IChat";
import { getCartsByUserId } from "@/services/cart_service";

interface ChatMessageComponentProps {
    commandToChatbot: string;
    setIsWSConnected: Dispatch<SetStateAction<boolean>>;
    isWSConnected: boolean;
    setShowRecommendedCommands: Dispatch<SetStateAction<boolean>>;
    setTriggerClearChat: Dispatch<SetStateAction<boolean>>;
    triggerClearChat: boolean;
}

export const ChatMessageComponent: FC<ChatMessageComponentProps> = ({ 
    setTriggerClearChat, 
    commandToChatbot, 
    setIsWSConnected, 
    isWSConnected, 
    setShowRecommendedCommands, 
    triggerClearChat 
}) => {
    const [chats, setChats] = useState<IChat[]>([]);
    const [carts, setCarts] = useState<ICart[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cartUpdated, setCartUpdated] = useState<boolean>(false);
    const [cartUpdating, setCartUpdating] = useState<boolean>(false);
    const [lastCommand, setLastCommand] = useState<string>("");
    const socket = useRef<Socket | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        getCarts();
        getChats();

        const connectToSocket = io(websocketConfig.baseUrl, {autoConnect: true, transports: ['websocket']});
        socket.current = connectToSocket;
        
        // Listen if the connection success
        connectToSocket.on('connect', () => {
          setIsWSConnected(true);
        });

        // Listen for connection errors
        connectToSocket.on('connect_error', (error) => {
            console.error('Connection Error: ', error);
            setIsWSConnected(false);
        });
  
        // Optionally, listen for a failed connection attempt
        connectToSocket.on('connect_failed', () => {
            console.error('Connection failed');
            setIsWSConnected(false);
        });
        
        // Listen for the recommendation response
        connectToSocket.on(websocketConfig.menuRecommendation.on, (data: IResponse) => {
            setChats(chats => [...chats, data.data[0]]);
            setIsLoading(false);
            scrollToBottom();
        });
        
        // Cleanup the WebSocket connection when the component unmounts
        return () => {
            connectToSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if(triggerClearChat) {
            setChats([]);
            setShowRecommendedCommands(true);
            setTriggerClearChat(false);
        }
    }, [triggerClearChat]);
    
    useEffect(() => {
        if(commandToChatbot.length > 0) {
            socket.current?.emit(websocketConfig.menuRecommendation.emit, commandToChatbot, getUserInfo().id);
            setLastCommand(commandToChatbot);
            setIsLoading(true);
            scrollToBottom();
        }
    }, [commandToChatbot]);

    useEffect(() => {
        if(cartUpdated) {
            getCarts();
        }
     }, [cartUpdated])

    function scrollToBottom() {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    }

    async function getChats() {
        const chats = await getUserChats();
        setChats(chats.data);
        if(chats.data.length === 0) {
            setShowRecommendedCommands(true);
        }
    }
    
    async function getCarts() {
        setCartUpdating(true);
        const carts = await getCartsByUserId();
        setCarts(carts.data);
        setCartUpdated(false);
        setCartUpdating(false);
    }

    return (
        <div className="h-full">
            {
                chats.length === 0 && (
                    <div className="h-full flex flex-wrap justify-center items-center">
                        <center>
                            {
                                isWSConnected && (<>
                                    <img className="w-1/2" src={ChatIcon} alt="Chat Icon" />
                                    <div className="mt-6 text-sm">Hello, what can i do for you?</div>
                                </>
                                )
                            }
                            {
                                !isWSConnected && (<>
                                    <Loader />
                                    <div className="mt-6 text-sm">
                                        Connecting...
                                    </div>
                                </>
                                )
                            }
                        </center>
                    </div>
                )
            }
            
            {
                chats.map((c, i ) => <>
                    <div key={i} className="flex flex-col space-y-4 px-3 py-5 mb-15">
                        <Fragment>
                            <div className="flex justify-end">
                                <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg rounded-br-none shadow text-sm">
                                    {c.user_message}
                                </div>
                            </div>

                            <div className="flex items-start">
                                <img width={30} className="mr-3" src={ChatIcon} alt="Recipient profile picture" />
                                <div className="max-w-xs">
                                    <div className="bg-slate-300 text-gray-900 p-3 rounded-lg rounded-bl-none shadow text-sm">
                                        {
                                            !c.menus && <Loader />
                                        }
                                        {
                                            c.menus.length > 0 && <>Here's what we have for you:</>
                                        }
                                        {
                                            c.menus.length === 0 && <>Sorry we dont have anything that you requested...</>
                                        }
                                    </div>
                                    
                                    {
                                        c.menus.length > 0 && (
                                            <div className="mt-3">
                                                {
                                                    c.menus && c.menus.map((menu, idx) => 
                                                        // TODO REDIRECT TO DETAIL PAGE
                                                        <div key={idx} className="flex rounded-lg border-2 shadow h-20 mt-2">
                                                            <a className="w-full flex hover:bg-slate-200" href="#">
                                                                <div className="w-6/12 p-1.5">
                                                                    <img className="rounded h-full w-full object-cover" src={menu.img} alt="Menu Img" />
                                                                </div>
                                                                <div className="w-full p-1">
                                                                    <div className="text-sm font-semibold">{truncateText(menu.title, 25)}</div>
                                                                    <div className="mt-1 text-xs text-slate-500">{truncateText(menu.description, 55)}</div>
                                                                </div>
                                                            </a>
                                                            <div className={`flex px-2 items-center justify-center`}>
                                                                <AddToCartButton menu={menu} key={i} carts={carts} cartUpdating={cartUpdating} setCartUpdated={setCartUpdated} />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Fragment>
                    </div>
                </>)
            }

            {
                isLoading &&
                <div className="flex flex-col space-y-4 px-3 py-5 mb-15">
                    <div className="flex justify-end">
                        <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg rounded-br-none shadow text-sm">
                            {lastCommand}
                        </div>
                    </div>

                    <div className="flex items-start">
                        <img width={30} className="mr-3" src={ChatIcon} alt="Recipient profile picture" />
                        <div className="max-w-xs">
                            <div className="bg-slate-300 text-gray-900 p-3 rounded-lg rounded-bl-none shadow text-sm">
                                <Loader />
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div ref={messagesEndRef}></div>
        </div>
   )
}
