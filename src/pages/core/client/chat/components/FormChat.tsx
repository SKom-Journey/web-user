import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, FC, useRef, FormEvent, useState } from "react";

// Define the props type
interface FormChatComponentProps {
   onInputChange: Dispatch<SetStateAction<string>>;
   isWSConnected: boolean;
}

 export const FormChatComponent: FC<FormChatComponentProps> = ({ onInputChange, isWSConnected }) => {
   const command = useRef<HTMLInputElement | null>(null);
   const [showRecommededCommands, setShowRecommededCommands] = useState(true);
   const recommendedCommands: string[] = [
      "Give me something spicy",
      "I have a dairy allergy",
      "how about a cold drink?"
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
      setShowRecommededCommands(false);
   }

   return (
      <div>
         {
            isWSConnected && showRecommededCommands && (
               <div>
                  {
                     recommendedCommands.map((text, i) => 
                        <button key={i} onClick={() => selectRecommendation(text)} className="hover:bg-slate-400 bg-slate-300 rounded-full text-xs px-3 py-1 mb-2 block">{text}</button>
                     )
                  }
               </div>
            )
         }

         <form onSubmit={e => onSubmit(e)} className="flex w-full max-w-full items-center space-x-2">
            <Input ref={command} type="text" placeholder="Type Something..." />
            <Button className="bg-[#C51605]" type="submit" disabled={!isWSConnected}>
               <PaperPlaneIcon />
            </Button>
         </form>
      </div>
   )
}
