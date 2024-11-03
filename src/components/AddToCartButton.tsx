import { AddToCartIcon, CircleMinusSMIcon, CirclePlusSMIcon } from "./Icons";
import { FC, useState, useEffect, useRef } from "react";
import { IMenu } from "@/interfaces/IMenu";
import { ICart } from "@/interfaces/ICart";
import { createCart, deleteCart } from "@/services/cart_service";
import Spinnner from "./Spinner";

interface AddToCartButtonProps {
    menu: IMenu;
    carts: ICart[];
    setCartUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    cartUpdating: boolean;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ menu, carts, setCartUpdated, cartUpdating }) => {
    const [inputMode, setInputMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    function showTotalInput() {
        setInputMode(true);
        resetCooldown();
    }

    function resetCooldown() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => setInputMode(false), 3000);
    }

    async function decrementTotalInput() {
        setIsLoading(true);
        await deleteCart(menu.id);
        setCartUpdated(true);
        setIsLoading(false);
        resetCooldown();
    }
    
    async function incrementTotalInput() {
        setIsLoading(true);
        await createCart(menu.id);
        setCartUpdated(true);
        setIsLoading(false);
        resetCooldown();
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return <>
        {
            !inputMode && carts.find(c => c.menu_id === menu.id) == null &&
                <button type="button" onClick={showTotalInput} title="Add to cart">
                    <AddToCartIcon />
                </button>
        }

        {
            !inputMode && carts.find(c => c.menu_id === menu.id) != null && carts.find(c => c.menu_id === menu.id)!.quantity > 0 && 
                <button className="hover:bg-[#C51605] hover:text-white text-xs w-6 h-6 rounded-full border-2 border-[#C51605] text-[#C51605] font-semibold" type="button" onClick={() => setInputMode(true)} title="Edit cart">
                    {carts.find(c => c.menu_id === menu.id)?.quantity ?? 0}
                </button>
        }

        {
            inputMode && <>
                <div className="flex justify-center items-center text-sm">
                    <button type="button" onClick={decrementTotalInput} className="my-auto" title="Remove from cart" disabled={cartUpdating}>
                        <CircleMinusSMIcon />
                    </button>
                    <div className="mx-1.5 font-semibold">
                        {
                            cartUpdating || isLoading
                                ? <Spinnner size="sm" />
                                : <>{carts.find(c => c.menu_id === menu.id)?.quantity ?? 0}</>
                        }
                    </div>
                    <button type="button" onClick={incrementTotalInput} className="my-auto" title="Add to cart" disabled={cartUpdating}>
                        <CirclePlusSMIcon />
                    </button>
                </div>
            </>
        }
    </>
}

export default AddToCartButton;
