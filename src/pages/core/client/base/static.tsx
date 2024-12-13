import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Static() {
    return(<>
        <main className="bg-white overflow-hidden h-full w-full max-w-[480px] m-auto pt-14">
            <Outlet />
        </main>

        <ToastContainer />
    </>
    )
}