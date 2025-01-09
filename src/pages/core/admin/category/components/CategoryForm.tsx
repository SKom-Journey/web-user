import { CheckMarkIcon, TimesIcon } from "@/components/Icons";
import { TableCell, TableRow } from "@/components/ui/table";
import { TextInputSM } from "@/config/theme";
import { createCategory } from "@/services/category_service";
import { errorToast } from "@/services/toast_service";
import { Loader } from "lucide-react";
import { FC, useRef, useState } from "react";

interface QRFormProps {
    isVisible: boolean;
    onSubmit: Function
}

const CategoryForm: FC<QRFormProps> = ({
    isVisible,
    onSubmit
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    
    async function submit() {
        if(inputRef.current?.value) {
            setIsLoading(true);
            await createCategory(inputRef.current.value);
            setIsLoading(false);
            onSubmit();
            return;
        }
        errorToast("Name Cannot Be Empty!")
    }
    
    function cancel() {
        setIsLoading(false);
        setInput("");
        onSubmit();
    }

    if(!isVisible) {
        return null;
    }

    return <TableRow>
        <TableCell>#</TableCell>

        <TableCell colSpan={3}>
            <form onSubmit={submit} className="flex">
                <input ref={inputRef} defaultValue={input} type="text" className={`${TextInputSM} border text-sm`} placeholder="Enter Category Name" />

                {
                    !isLoading && <>
                        <button className="mx-4" title="Print" onClick={submit}>
                            <CheckMarkIcon />
                        </button>
                        
                        <button className="mr-4" title="Print" onClick={cancel}>
                            <TimesIcon />
                        </button>
                    </>
                }

                {
                    isLoading && <Loader />
                }
            </form>
        </TableCell>
    </TableRow>
}

export default CategoryForm;