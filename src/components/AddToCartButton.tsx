import { IMenu } from "@/interfaces/IMenu";
import { AddToCartIcon } from "./Icons";
import { FC } from "react";

interface AddToCartButtonProps {
    menu: IMenu;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ menu }) => {
    function showTotalInput() {
        console.log(menu);
    }

    return <>
        <button type="button" onClick={showTotalInput} title="Add to cart">
            <AddToCartIcon />
        </button>
    </>
}

export default AddToCartButton;