import { IMenu } from "@/interfaces/IMenu";
import { getMenuById } from "@/services/menu_service";
import localizeNumber from "@/utils/localize_number";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { EditPlusIcon, CheckMarkIcon, TrashIconRed } from "@/components/Icons";
import { TextInputSM } from "@/config/theme";
import { getCartsByUserId } from "@/services/cart_service";
import { ICart } from "@/interfaces/ICart";

export default function MenuDetail() {
    const params = useParams();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [menu, setMenu] = useState<IMenu>();
    const menuId = params.menuId;

    useEffect(() => {
        getMenu();
        getCarts();
    }, []);

    async function getMenu() {
        if(menuId) {
            const data = await getMenuById(menuId);
            setMenu(data.data);
        }
    }

    async function getCarts() {
        const data = await getCartsByUserId();
        if(data.data.find((c: ICart) => c.menu!.id == menuId)) {
            console.warn(data);
        }
    }

    function showNoteForm() {
        setShowForm(true);
    }
    
    async function saveNote() {
        setShowForm(false);
    }
    
    async function removeNote() {
        setShowForm(false);
    }

    return(
        <div>
            <img className="w-full h-72 object-cover" src={menu?.img} alt="" srcSet="" />

            <div className="mt-2 p-4">
                <div className="font-semibold text-xl">{menu?.title}</div>

                <div className="py-2">Rp.{localizeNumber(menu?.price || 0)}</div>

                <div className="py-2">{menu?.description}</div>
            </div>

            <div className="flex justify-between items-center justify-center flex-wrap border-t border-b py-4 px-5">
                <div className="font-semibold">Note to restaurant</div>
                <div>
                    <button title="Edit Note" onClick={showNoteForm}><EditPlusIcon /></button>
                </div>
                
                {
                    !showForm && menu?.note &&
                        <div className="w-full text-slate-400 mt-4 text-sm">
                            Tambahkan saus mwani special nya rek
                        </div>
                }

                {
                    showForm && 
                        <form onSubmit={saveNote} className="w-full mt-4 flex">
                            <input autoFocus type="text" placeholder="Your note here..." className={`text-sm ${TextInputSM}`} />
                            <button type="submit" className="ml-2" title="Create"><CheckMarkIcon /></button>
                            <button onClick={removeNote} type="button" className="ml-3" title="Remove"><TrashIconRed /></button>
                        </form>
                }
            </div>
        </div>
    )
}