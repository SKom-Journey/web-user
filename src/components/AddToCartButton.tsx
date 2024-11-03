import { AddToCartIcon, CircleMinusSMIcon, CirclePlusSMIcon } from "./Icons";
import { FC, useState } from "react";
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

    function showTotalInput() {
        setInputMode(true);
    }

    async function decrementTotalInput() {
        setIsLoading(true);
        await deleteCart(menu.id);
        setCartUpdated(true);
        setIsLoading(false);
    }
    
    async function incrementTotalInput() {
        setIsLoading(true);
        await createCart(menu.id);
        setCartUpdated(true);
        setIsLoading(false);
    }

    return <>
        {
            !inputMode &&
                <button type="button" onClick={showTotalInput} title="Add to cart">
                    <AddToCartIcon />
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
                                : <>{carts.find(c => c.menu_id == menu.id)?.quantity ?? 0}</>
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