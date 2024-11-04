import Logo from "@/assets/images/ryomu-logo.png"
import { ButtonLargeTransparent, TextInputSM } from "@/config/theme";
import { FormEvent, useRef } from "react";

export default function LoginAdminPage() {

    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    async function submit(e: FormEvent) {
        e.preventDefault();
        console.log(usernameRef.current?.value, passwordRef.current?.value);
    }

    return(
        <form className="w-1/3 bg-white shadow-lg p-20 rounded-lg" onSubmit={(e) => submit(e)}>
            <div>
                <img className="m-auto" width={200} src={Logo} alt="" />
            </div>

            <div className="mt-10 font-black text-2xl">
                Welcome Back! 
            </div>
            <div className="mt-2 font-black text-2xl">
                Customers Are Waiting!
            </div>

            <div className="mt-10">
                <div><label className="font-semibold cursor-pointer" htmlFor="username">Username</label></div>
                <div>
                    <input ref={usernameRef} type="text" id="username" className={`border mt-2 text-sm py-1.5 ${TextInputSM}`} placeholder="Enter username" />
                </div>
            </div>

            <div className="mt-7">
                <div><label className="font-semibold cursor-pointer" htmlFor="password">Password</label></div>
                <div>
                    <input ref={passwordRef} type="password" id="password" className={`border mt-2 text-sm py-1.5 ${TextInputSM}`} placeholder="Enter password" />
                </div>
            </div>

            <div className="mt-10">
                <button type="submit" className={`${ButtonLargeTransparent} bg-[#C51605] text-white`}>Login</button>
            </div>
        </form>
    );
}