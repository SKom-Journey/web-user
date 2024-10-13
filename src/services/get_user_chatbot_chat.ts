import localStorageConfig from "@/config/localstorage";

export default function getUserChatbotChat(): string[] {
    let chats = localStorage.getItem(localStorageConfig.chatbotChat.user);
    return JSON.parse(chats ?? "[]");
}