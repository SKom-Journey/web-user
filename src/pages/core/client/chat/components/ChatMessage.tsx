import ChatIcon from "@/assets/images/chat.png";
import { Dispatch, FC, Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import { AddToCartIcon, CircleMinusSMIcon, CirclePlusSMIcon } from "@/components/Icons";
import io, { Socket } from 'socket.io-client';
import { IMenu } from "@/interfaces/IMenu";
import { IResponse } from "@/interfaces/IResponse";
import websocketConfig from "@/config/websocket";
import { Loader } from "@/components/Loader";
import truncateText from "@/utils/truncate_text";
import storeUserChatbotChat from "@/services/store_user_chatbot_chat";
import storeChatbotChat from "@/services/store_chatbot_chat";
import getUserChatbotChat from "@/services/get_user_chatbot_chat";
import getChatbotChat from "@/services/get_chatbot_chat";
import clearChatbotChat from "@/services/clear_chatbot_chat";
import getMenu from "@/services/get_menu";
import storeMenu from "@/services/store_menu";
import { IMenuOrder } from "@/interfaces/IMenuOrder";

interface ChatMessageComponentProps {
    commandToChatbot: string;
    setIsWSConnected: Dispatch<SetStateAction<boolean>>;
    isWSConnected: boolean;
    setShowRecommendedCommands: Dispatch<SetStateAction<boolean>>;
    setTriggerClearChat: Dispatch<SetStateAction<boolean>>;
    triggerClearChat: boolean;
}

interface ChatMessageMenu extends IMenu {
    total: number;
}

export const ChatMessageComponent: FC<ChatMessageComponentProps> = ({ setTriggerClearChat, commandToChatbot, setIsWSConnected, isWSConnected, setShowRecommendedCommands, triggerClearChat }) => {
    const [recipientChats, setRecipientChats] = useState<ChatMessageMenu[][]>([]);
    const [senderChats, setSenderChats] = useState<string[]>(getUserChatbotChat());
    const [showTotalInputToMenuId, setShowTotalInputToMenuId] = useState<string>("");
    const [editedMenu, setEditedMenu] = useState<IMenuOrder | null>(null);
    const socket = useRef<Socket | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 50);
    }

    useEffect(() => {
        setShowRecommendedCommands(getUserChatbotChat().length === 0);
        setTotalForEachMenuByCart();

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
            setRecipientChats(prevChats => [...prevChats, data.data]);
            storeChatbotChat(data.data);
            setTotalForEachMenuByCart();
            scrollToBottom();
        });
        
        scrollToBottom();

        // Cleanup the WebSocket connection when the component unmounts
        return () => {
            connectToSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if(triggerClearChat) {
            clearChatbotChat();
            setRecipientChats([]);
            setSenderChats([]);
            setShowTotalInputToMenuId("");
            setEditedMenu(null);
            setShowRecommendedCommands(true);
            setTriggerClearChat(false);
        }
    }, [triggerClearChat]);
    
    useEffect(() => {
        if(commandToChatbot.length > 0) {
            setShowTotalInputToMenuId("");
            setEditedMenu(null);
            setSenderChats([...senderChats, commandToChatbot]);
            storeUserChatbotChat(commandToChatbot);
            socket.current?.emit(websocketConfig.menuRecommendation.emit, commandToChatbot);
            scrollToBottom();
        }
    }, [commandToChatbot]);

    useEffect(() => {
        if (editedMenu != null) {
            storeMenu(editedMenu);
            setTotalForEachMenuByCart();
        }
    }, [editedMenu]);

    function showTotalInput(menu: IMenu) {
        const cart = getMenu();
        const getById = cart.find(c => c.id === menu.id);
        if(getById != null) {
            setEditedMenu(getById);
        } else {
            setEditedMenu({
                ...menu,
                total: 1,
                note: ''
            });
        }
        setShowTotalInputToMenuId(menu.id);
    }

    function incrementTotalInput() {
        setEditedMenu(prev => prev ? { ...prev, total: prev.total + 1 } : null);
    }
    
    function decrementTotalInput() {
        setEditedMenu(prev => 
            prev ? { 
              ...prev, 
              total: prev.total > 0 ? prev.total - 1 : 0 
            } : null
        );
    }

    function setTotalForEachMenuByCart() {
        const cart = getMenu();
        const chatbotChat = getChatbotChat().map(c => {
            return c.map(c => {
                const getById = cart.find(cart => c.id === cart.id);
                return {
                    ...c, 
                    total: getById?.total ?? 0
                }
            });
        });
        setRecipientChats(chatbotChat);
    }

    return (
        <div className="h-full">
            {
                senderChats.length === 0 && (
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
                senderChats.length > 0 && (
                    <div key={"chats-container"} className="flex flex-col space-y-4 px-3 py-5 mb-15">
                        {
                            senderChats.map((text, i) =>  
                                <Fragment key={i}>
                                    <div className="flex justify-end">
                                        <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg rounded-br-none shadow text-sm">
                                            {text}
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <img width={30} className="mr-3" src={ChatIcon} alt="Recipient profile picture" />
                                        <div className="max-w-xs">
                                            <div className="bg-slate-300 text-gray-900 p-3 rounded-lg rounded-bl-none shadow text-sm">
                                                {
                                                    !recipientChats[i] && <Loader />
                                                }
                                                {
                                                    recipientChats[i]?.length > 0 && <>Here's what we have for you:</>
                                                }
                                                {
                                                    recipientChats[i]?.length === 0 && <>Sorry we dont have anything that you requested...</>
                                                }
                                            </div>
                                            
                                            {
                                                recipientChats[i]?.length > 0 && (
                                                    <div className="mt-3">
                                                        {
                                                            recipientChats[i] && recipientChats[i].map((menu, idx) => 
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
                                                                    <div className={`${showTotalInputToMenuId === menu.id ? 'w-3/12': 'w-2/12'} flex px-2 items-center justify-center`}>
                                                                    {
                                                                        showTotalInputToMenuId === menu.id && (
                                                                            <div className="flex justify-center items-center text-sm">
                                                                                <button type="button" onClick={decrementTotalInput} className="my-auto" title="Remove from cart">
                                                                                    <CircleMinusSMIcon />
                                                                                </button>
                                                                                <div className="mx-1.5 font-semibold">{editedMenu?.total ?? 0}</div>
                                                                                <button type="button" onClick={incrementTotalInput} className="my-auto" title="Add to cart">
                                                                                    <CirclePlusSMIcon />
                                                                                </button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    {
                                                                        showTotalInputToMenuId !== menu.id && menu.total > 0 && (
                                                                            <button className="hover:bg-[#C51605] hover:text-white text-xs w-6 h-6 rounded-full border-2 border-[#C51605] text-[#C51605] font-semibold" type="button" onClick={() => showTotalInput(menu)} title="Edit cart">
                                                                                {menu.total}
                                                                            </button>
                                                                        )
                                                                    }
                                                                    {
                                                                        showTotalInputToMenuId !== menu.id && menu.total === 0 && (
                                                                            <button type="button" onClick={() => showTotalInput(menu)} title="Add to cart">
                                                                                <AddToCartIcon />
                                                                            </button>
                                                                        )
                                                                    }
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
                            )
                        }
                    </div>
                )
            }

            <div ref={messagesEndRef}></div>
        </div>
   )
}
