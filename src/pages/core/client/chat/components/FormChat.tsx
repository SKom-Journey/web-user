import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaperPlaneIcon } from "@radix-ui/react-icons"

export function FormChatComponent() {
   return (
      <div>
         <div>
            <button className="hover:bg-slate-400 bg-slate-300 rounded-full text-xs px-3 py-1 mb-2 block">Give me something spicy</button>
            <button className="hover:bg-slate-400 bg-slate-300 rounded-full text-xs px-3 py-1 mb-2 block">I have dairy allergy</button>
            <button className="hover:bg-slate-400 bg-slate-300 rounded-full text-xs px-3 py-1 mb-2 block">How about sweet drinks?</button>
         </div>

         <div className="flex w-full max-w-full items-center space-x-2">
            <Input type="text" placeholder="Type Something..." />
            <Button className="bg-[#C51605]" type="submit"><PaperPlaneIcon /></Button>
         </div>
      </div>
   )
}
