import localStorageConfig from "@/config/localstorage";
import { IMenu } from "@/interfaces/IMenu";

export default function storeChatbotChat(chat: IMenu) {
    let chats = localStorage.getItem(localStorageConfig.chatbotChat.chatbot);
    let previousChats: IMenu[][] = []; 

    if(chats != null) {
        const prevChats = JSON.parse(chats);
        if(prevChats.length > localStorageConfig.chatbotChat.limitChat) {
            prevChats.shift();
        }
        previousChats = prevChats;
    }

    localStorage.setItem(localStorageConfig.chatbotChat.chatbot, JSON.stringify([...previousChats, chat]));
}