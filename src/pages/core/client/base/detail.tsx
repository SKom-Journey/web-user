import { ArrowLeftIcon } from "@/components/Icons";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Detail() {
    function back() {
        history.back();
    }

    return(
        <>
            <main className="bg-white overflow-hidden h-full w-full max-w-[480px] m-auto pt-14">
                <div id="navbar">
                    <nav className="bg-white fixed z-20 top-0 border-b w-full border-gray-200 dark:border-gray-600" style={{ maxWidth: "480px" }}>
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <button title="Back" onClick={back} className="flex items-center">
                                <ArrowLeftIcon />
                            </button>
                            <p className="font-semibold text-left">Menu Detail</p>
                            <div></div>
                        </div>
                    </nav>
                </div>
                <div id="content" className="h-full">
                    <Outlet />
                </div>
            </main>

            <ToastContainer />
        </>
    )
}