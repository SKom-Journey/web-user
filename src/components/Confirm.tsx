import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

interface ConfirmProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
}

const Confirm: React.FC<ConfirmProps> = ({
    title,
    setIsOpen,
    isOpen,
    onConfirm,
    onClose
}) => {
    function onCancel() {
        setIsOpen(false);
        onClose();
    }
    
    function onProceed() {
        setIsOpen(false);
        onConfirm();
    }

    return(
        <Dialog open={isOpen}>
         <DialogContent className="bg-gray-800 bg-opacity-50 absolute bottom-0 top-0 left-0 right-0 flex items-center justify-center" aria-describedby={title}>
            <center className="rounded-lg bg-white shadow-lg p-8">
                <div className="font-bold text-xl">{title}</div>
                <div className="mt-8">
                    <Button className="rounded-lg bg-red-400" title="No" onClick={onCancel}>No</Button>
                    <Button className="rounded-lg bg-red-600 ml-5" title="Yes" onClick={onProceed}>Yes</Button>
                </div>
            </center>
         </DialogContent>
      </Dialog>
    )
}

export default Confirm;