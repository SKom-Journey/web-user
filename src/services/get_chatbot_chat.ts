import localStorageConfig from "@/config/localstorage";
import { IMenu } from "@/interfaces/IMenu";

export default function getChatbotChat(): IMenu[][] {
    let chats = localStorage.getItem(localStorageConfig.chatbotChat.chatbot);
    return JSON.parse(chats ?? "[]");
}