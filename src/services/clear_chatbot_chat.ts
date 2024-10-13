import localStorageConfig from "@/config/localstorage";

export default function clearChatbotChat() {
   localStorage.removeItem(localStorageConfig.chatbotChat.chatbot);
   localStorage.removeItem(localStorageConfig.chatbotChat.user);
}