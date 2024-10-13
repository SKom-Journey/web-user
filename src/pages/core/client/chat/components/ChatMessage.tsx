import ChatIcon from "@/assets/images/chat.png";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { CirclePlusIcon } from "@/components/Icons";
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

interface ChatMessageComponentProps {
    commandToChatbot: string;
    setIsWSConnected: Dispatch<SetStateAction<boolean>>;
    isWSConnected: boolean;
    setShowRecommendedCommands: Dispatch<SetStateAction<boolean>>;
    triggerClearChat: boolean;
}

export const ChatMessageComponent: FC<ChatMessageComponentProps> = ({ commandToChatbot, setIsWSConnected, isWSConnected, setShowRecommendedCommands, triggerClearChat }) => {
    const [recipientChats, setRecipientChats] = useState<IMenu[][]>(getChatbotChat());
    const [senderChats, setSenderChats] = useState<string[]>(getUserChatbotChat());
    const socket = useRef<Socket | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 50);
    }

    useEffect(() => {
        setShowRecommendedCommands(getUserChatbotChat().length === 0);

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
            scrollToBottom();
        });
        
        scrollToBottom();

        // Cleanup the WebSocket connection when the component unmounts
        return () => {
            connectToSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        console.log(triggerClearChat);
        if(triggerClearChat) {
            clearChatbotChat();
            setRecipientChats([]);
            setSenderChats([]);
            setShowRecommendedCommands(true);
        }
    }, [triggerClearChat]);

    useEffect(() => {
        if(commandToChatbot.length > 0) {
            setSenderChats([...senderChats, commandToChatbot]);
            storeUserChatbotChat(commandToChatbot);
            socket.current?.emit(websocketConfig.menuRecommendation.emit, commandToChatbot);
            scrollToBottom();
        }
    }, [commandToChatbot]);

    return (
        <div className="h-full">
            {
                senderChats.length === 0 && (
                    <div className="h-full flex flex-wrap justify-center items-center">
                        <center>
                            {
                                isWSConnected && (<>
                                    <img className="w-1/2" src={ChatIcon} alt="Chat Icon" />
                                    <div className="mt-6 text-sm">Hi, what can i do for you?</div>
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
                                <>
                                    <div key={i + "s"} className="flex justify-end">
                                        <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg rounded-br-none shadow-lg text-sm">
                                            {text}
                                        </div>
                                    </div>

                                    <div key={i} className="flex items-start">
                                        <img width={30} className="mr-3" src={ChatIcon} alt="Recipient profile picture" />
                                        <div className="max-w-xs">

                                            <div className="bg-slate-300 text-gray-900 p-3 rounded-lg rounded-bl-none shadow-lg text-sm">
                                                {
                                                    !recipientChats[i] && <Loader />
                                                }

                                                {
                                                    recipientChats[i]?.length > 0 && <>Here is what i can recommend to you:</>
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
                                                                <div key={idx} className="flex rounded-lg border-2 shadow h-20 mt-2">
                                                                    <div className="w-6/12 p-1.5">
                                                                        <img className="rounded h-full w-full object-cover" src={menu.img} alt="Menu Img" />
                                                                    </div>
                                                                    <div className="w-full p-1">
                                                                        <div className="text-sm font-semibold">{truncateText(menu.title, 25)}</div>
                                                                        <div className="mt-1 text-xs text-slate-500">{truncateText(menu.description, 55)}</div>
                                                                    </div>
                                                                    <div className="w-2/12 flex px-2">
                                                                        <button className="my-auto" title="Add to cart">
                                                                            <CirclePlusIcon />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                )
            }

            <div ref={messagesEndRef}></div>
        </div>
   )
}
