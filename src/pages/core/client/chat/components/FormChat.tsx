import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaperPlaneIcon } from "@radix-ui/react-icons"

export function FormChatComponent() {
   return (
      <div className="flex w-full max-w-full items-center space-x-2">
         <Input type="text" placeholder="Type Something..." />
         <Button className="bg-[#C51605]" type="submit"><PaperPlaneIcon /></Button>
      </div>
   )
}
