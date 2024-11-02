import { useState } from "react";
import { ChatMessageComponent } from "./components/ChatMessage";
import { FormChatComponent } from "./components/FormChat";

export const ChatPage: React.FC = () => {
   const [textInput, setTextInput] = useState<string>('');
   const [isWSConnected, setIsWSConnected] = useState<boolean>(false);
   const [showRecommendedCommands, setShowRecommendedCommands] = useState<boolean>(false);
   const [triggerClearChat, setTriggerClearChat] = useState<boolean>(false);

   return (
      <div className="flex flex-col h-full">
         <div className="overflow-y-auto h-full" style={{scrollbarWidth: "thin"}}>
            <ChatMessageComponent setTriggerClearChat={setTriggerClearChat} triggerClearChat={triggerClearChat} commandToChatbot={textInput} setIsWSConnected={setIsWSConnected} isWSConnected={isWSConnected} setShowRecommendedCommands={setShowRecommendedCommands} />
         </div>
         <div className="bottom-0 pb-3">
            <FormChatComponent setShowRecommendedCommands={setShowRecommendedCommands} onInputChange={setTextInput} isWSConnected={isWSConnected} showRecommendedCommands={showRecommendedCommands} setTriggerClearChat={setTriggerClearChat} />
         </div>
      </div>
   );
};
