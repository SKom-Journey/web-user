import { FormChatComponent } from "./components/FormChat";

export const ChatPage: React.FC = () => {
   return (
      <div className="flex flex-col h-screen max-h-[87vh]">
         <div className="flex-grow overflow-y-auto p-4">
            {/* Chat messages can go here */}
         </div>
         <div className="bottom-0 pb-3">
            <FormChatComponent />
         </div>
      </div>
   );
};
