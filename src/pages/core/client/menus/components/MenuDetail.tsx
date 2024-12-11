import { IMenu } from "@/interfaces/IMenu";
import { getMenuById } from "@/services/menu_service";
import localizeNumber from "@/utils/localize_number";
import { FormEvent, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { EditPlusIcon, CheckMarkIcon, TrashIconRed, TimesIcon } from "@/components/Icons";
import { TextInputSM } from "@/config/theme";
import { getCartsByUserId, updateCartNote } from "@/services/cart_service";
import { ICart } from "@/interfaces/ICart";
import { successToast } from "@/services/toast_service";
import AddToCartButtonLarge from "@/components/AddToCartButtonLarge";

export default function MenuDetail() {
    const params = useParams();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [menu, setMenu] = useState<IMenu>();
    const [cartUpdated, setCartUpdated] = useState<boolean>(false);
    const [cart, setCart] = useState<ICart | null>(null);
    const noteInput = useRef<HTMLInputElement | null>(null);
    const menuId = params.menuId;

    useEffect(() => {
        getMenu();
    }, []);
    
    useEffect(() => {
        if(cartUpdated) {
            getCarts();
            setCartUpdated(false);
        }
    }, [cartUpdated]);

    async function getMenu() {
        if(menuId) {
            const data = await getMenuById(menuId);
            setMenu(data.data);
            await getCarts();
        }
    }

    async function getCarts() {
        const data = await getCartsByUserId();
        const item = data.data.find((c: ICart) => c.menu!.id == menuId);
        setCart(item);
        editNoteState(item ? item.note : '');
    }

    function editNoteState(note: string) {
        setMenu((menu) => {
            const newMenu = menu;
            if (newMenu != null) {
                newMenu.note = note;
                return {...newMenu};
            }
            return menu;
        });
    }
    
    async function saveNote(cartId: string | undefined, e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(cartId) {
            await updateCartNote(cartId, noteInput.current?.value!);
            editNoteState(noteInput.current?.value!);
            setShowForm(false);
            await getCarts();
            successToast('Note Updated!');
        }
    }
    
    async function removeNote(cartId: string | undefined) {
        if(cartId) {
            await updateCartNote(cartId, '');
            editNoteState('');
            setShowForm(false);
            await getCarts();
            successToast('Note Deleted!');
        }
    }

    return(
        <div className="flex flex-col h-full">
            <div className="overflow-y-auto h-full" style={{scrollbarWidth: "thin"}}>
                <img className="w-full h-72 object-cover" src={menu?.img} alt="" srcSet="" />

                <div className="p-4">
                    <div className="font-semibold text-xl">{menu?.title}</div>
                    <div className="py-2">Rp.{localizeNumber(menu?.price || 0)}</div>
                    <div className="py-2 font-semibold text-sm max-h-72 overflow-auto">{menu?.description}</div>
                </div>

                <div className="flex justify-between items-center justify-center flex-wrap border-t border-b py-4 px-5 overflow-auto">
                    <div className="font-semibold">Note to restaurant</div>
                    <div>
                        {
                            !showForm && cart?.id == null && <div className="text-xs text-slate-400 italic">Item not added to cart yet</div>
                        }
                        {
                            !showForm && cart?.id != null && <button title="Edit Note" onClick={() => setShowForm(true)}><EditPlusIcon /></button>
                        }
                        {
                            showForm && <button title="Cancel" onClick={() => setShowForm(false)}><TimesIcon /></button>
                        }
                    </div>
                    {
                        !showForm && menu?.note != null && menu?.note.length > 0 &&
                            <div className="w-full max-h-20 text-slate-400 mt-2 text-sm overflow-auto">
                                {menu.note}
                            </div>
                    }

                    {
                        showForm && 
                            <form onSubmit={(e) => saveNote(cart?.id, e)} className="w-full mt-4 flex">
                                <input defaultValue={menu?.note} ref={noteInput} autoFocus type="text" placeholder="Your note here..." className={`text-sm ${TextInputSM}`} />
                                <button onClick={() => removeNote(cart?.id)} type="button" className="ml-3" title="Remove"><TrashIconRed /></button>
                                <button type="submit" className="ml-3" title="Create"><CheckMarkIcon /></button>
                            </form>
                    }
                </div>
            </div>

            <div className="bottom-0 pb-3 px-5">
                {
                    menu != null &&
                        <AddToCartButtonLarge cart={cart} menuId={menu.id} setCartUpdated={setCartUpdated} />
                }
            </div>
        </div>
    )
}