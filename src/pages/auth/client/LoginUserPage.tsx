import RyomuRed from "@/assets/images/ryomu-logo-red.png";

export default function LoginUserPage() {
    
    return(
        <div className="flex justify-center items-center bg-[#C51605] h-full">
            <div className="text-white p-8 rounded w-full">
                <div className="mb-12 text-center">
                    <img className="mx-auto w-1/2 bg-white p-5 rounded-lg" src={RyomuRed} alt="" />
                </div>

                <div className="text-center">
                    Login to continue
                </div>

                <div>

                </div>
            </div>
        </div>
    );
}