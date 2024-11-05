import { CheckMarkIcon, EditIcon, TimesIcon } from "@/components/Icons";
import { TextInputSM } from "@/config/theme";
import { ICart } from "@/interfaces/ICart";
import { updateCartNote } from "@/services/cart_service";
import { successToast } from "@/services/toast_service";
import { Dispatch, FC, FormEvent, SetStateAction, useRef, useState } from "react";

interface OrderNoteProps {
    setOrders: Dispatch<SetStateAction<ICart[]>>;
    note: string;
    cartId: string;
}

const OrderNote: FC<OrderNoteProps> = ({
    note,
    setOrders,
    cartId
}) => {
    const [editMode, setEditMode] = useState(false);
    const noteRef = useRef<HTMLInputElement | null>(null);

    async function enterEditMode() {
        setEditMode(true);
    }
    
    async function exitEditMode() {
        setEditMode(false);
    }
    
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await updateCartNote(cartId, noteRef.current!.value);
        setOrders(order => 
            order.map(o => 
                o.id === cartId 
                    ? { ...o, note: noteRef.current!.value } 
                    : o
            )
        );
        setEditMode(false);
        successToast("Note Updated!");
    }

    return (
        <form className="w-full text-xs text-slate-400 mt-2 flex justify-center items-center" onSubmit={(e) => submit(e)}>
            <div className="mr-1">Note:</div>
            <div className="w-full truncate">
                {
                    editMode && <input className={`border ${TextInputSM}`} type="text" defaultValue={note} ref={noteRef} />
                }

                {
                    !editMode && <>{note.length > 0 ? note : '-'}</>
                }
            </div>
            <div className="ml-2 text-sm">
                {
                    editMode && 
                        <div className="flex">
                            <button title="Cancel" onClick={exitEditMode} className="mr-1.5" type="button">
                                <TimesIcon />
                            </button>
                            
                            <button title="Save" type="submit">
                                <CheckMarkIcon />
                            </button>
                        </div>
                }

                {
                    !editMode && 
                        <button onClick={enterEditMode} title="Edit note" type="button">
                            <EditIcon />
                        </button>
                }
            </div>
        </form>
    );
}

export default OrderNote;