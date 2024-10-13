import localStorageConfig from "@/config/localstorage";

export default function getUserChatbotChat(): string[] {
    let chats = localStorage.getItem(localStorageConfig.chatbotChat.user);
    let previousChats: string[] = []; 

    if(chats != null) {
        const prevChats = JSON.parse(chats);
        if(prevChats.length > localStorageConfig.chatbotChat.limitChat) {
            prevChats.shift();
        }
        previousChats = prevChats;
    }

    return previousChats;
}