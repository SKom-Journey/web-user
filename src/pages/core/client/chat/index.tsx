import { useState } from "react";
import { ChatMessageComponent } from "./components/ChatMessage";
import { FormChatComponent } from "./components/FormChat";

export const ChatPage: React.FC = () => {
   const [textInput, setTextInput] = useState<string>('');
   const [isWSConnected, setIsWSConnected] = useState<boolean>(false);

   return (
      <div className="flex flex-col h-screen max-h-[87vh]">
         <div className="flex-grow overflow-y-auto" style={{scrollbarWidth: "thin"}}>
            <ChatMessageComponent commandToChatbot={textInput} setIsWSConnected={setIsWSConnected} isWSConnected={isWSConnected} />
         </div>
         <div className="bottom-0 pb-3">
            <FormChatComponent onInputChange={setTextInput} isWSConnected={isWSConnected} />
         </div>
      </div>
   );
};
