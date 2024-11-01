import { ButtonLarge, TextInput } from "@/config/theme";
import RyomuRed from "@/assets/images/ryomu-logo-red.png";
import Google from "@/assets/images/goggle.png";

export default function RegisterPage() {
    return(
        <div className="flex justify-center items-center bg-[#C51605] h-full">
            <form className="text-white p-8 rounded w-full">
                <div className="mb-12 text-center">
                    <img className="mx-auto w-1/2 bg-white p-5 rounded-lg" src={RyomuRed} alt="" />
                </div>

                <div className="text-center mb-10 font-bold text-2xl">
                    Lets Create Your Account!
                </div>

                <div className="mb-12">
                    <input required type="text" className={`mb-5 ${TextInput}`} placeholder="Email" />
                    <input required type="password" className={TextInput} placeholder="Password" />
                </div>
                
                <div className="mb-4">
                    <button type="submit" title="Login" className={`mb-6 ${ButtonLarge}`}>Register</button>
                    <button type="button" title="Sign up with Google" className={`${ButtonLarge} flex items-center justify-center`}><img src={Google} className="mr-2" alt="" /> Sign up with Google</button>
                    <div className="mt-8 text-center">
                        <a title="Already have an account?" className="underline font-semibold" href="/auth/login">Already have an account?</a>
                    </div>
                </div>
            </form>
        </div>
    );
}