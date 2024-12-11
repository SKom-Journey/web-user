import { CircleMinusIcon, CirclePlusIcon } from "./Icons";
import { FC, useState, useEffect, useRef } from "react";
import { ICart } from "@/interfaces/ICart";
import { createCart, deleteCart } from "@/services/cart_service";
import Spinnner from "./Spinner";

interface AddToCartButtonProps {
    menuId: string;
    cart: ICart | null;
    setCartUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddToCartButtonLarge: FC<AddToCartButtonProps> = ({ menuId, cart, setCartUpdated }) => {
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
        await deleteCart(menuId, cart?.note);
        setCartUpdated(true);
        setIsLoading(false);
        resetCooldown();
    }
    
    async function incrementTotalInput() {
        setIsLoading(true);
        await createCart(menuId, cart?.note);
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

    return <div>
        {
            !inputMode &&
                <button
                    onClick={showTotalInput}
                    type="button"
                    title="Add To Cart"
                    className="flex mt-8 w-full rounded-full py-3 font-bold flex items-center justify-center text-white bg-[#C51605] hover:bg-red-800"
                >
                    <div>Add To Cart</div>
                    {
                        cart?.quantity != null && cart?.quantity > 0 &&
                            <div className="ml-1">({cart?.quantity})</div>
                    }
                </button>
        }

        {
            inputMode && 
                <div className="flex justify-center items-center justify-between text-xl">
                    <button type="button" onClick={decrementTotalInput} className="my-auto" title="Remove from cart" disabled={isLoading}>
                        <CircleMinusIcon />
                    </button>
                    <div className="mx-1.5 font-semibold">
                        {
                            isLoading
                                ? <Spinnner size="sm" />
                                : <>{cart?.quantity ?? 0}</>
                        }
                    </div>
                    <button type="button" onClick={incrementTotalInput} className="my-auto" title="Add to cart" disabled={isLoading}>
                        <CirclePlusIcon />
                    </button>
                </div>
            
        }
    </div>
}

export default AddToCartButtonLarge;
