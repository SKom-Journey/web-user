import { TrashIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, FC, useRef, FormEvent } from "react";

// Define the props type
interface FormChatComponentProps {
   onInputChange: Dispatch<SetStateAction<string>>;
   isWSConnected: boolean;
   showRecommendedCommands: boolean;
   setShowRecommendedCommands: Dispatch<SetStateAction<boolean>>;
   setTriggerClearChat: Dispatch<SetStateAction<boolean>>;
}

 export const FormChatComponent: FC<FormChatComponentProps> = ({ onInputChange, isWSConnected, showRecommendedCommands, setTriggerClearChat, setShowRecommendedCommands }) => {
   const command = useRef<HTMLInputElement | null>(null);
   const recommendedCommands: string[] = [
      "Give me something spicy",
      "I have a dairy allergy",
      "i hate seafood"
   ]

   function onSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      selectRecommendation(command.current?.value || "");
      if (command.current) {
         command.current.value = ""; // Clear the input field
      }
   }
   
   function selectRecommendation(text: string) {
      onInputChange(text);
      setShowRecommendedCommands(false);
   }

   function clearChat() {
      setTriggerClearChat(true);
   }

   return (
      <div>
         {
            isWSConnected && showRecommendedCommands && (
               <div>
                  {
                     recommendedCommands.map((text, i) => 
                        <button title="Send" key={i} onClick={() => selectRecommendation(text)} className="hover:bg-slate-400 bg-slate-300 rounded-full text-xs px-3 py-1 mb-2 block">{text}</button>
                     )
                  }
               </div>
            )
         }
         
         {
            isWSConnected && !showRecommendedCommands && (
               <div className="mt-3">
                  <button type="button" title="Clear chats" onClick={clearChat} className="hover:bg-primary/90 py-.5 flex items-center justify-center text-white bg-[#C51605] rounded-full text-xs px-3 py-1 mb-2 block">
                     <TrashIcon /> 
                     <div className="ml-1.5">
                        Clear chats
                     </div>
                  </button>
               </div>
            )
         }

         <form onSubmit={e => onSubmit(e)} className="flex w-full max-w-full items-center space-x-2">
            <Input ref={command} type="text" placeholder="Type something..." />
            <Button title="Send" className="bg-[#C51605]" type="submit" disabled={!isWSConnected}>
               <PaperPlaneIcon />
            </Button>
         </form>
      </div>
   )
}
