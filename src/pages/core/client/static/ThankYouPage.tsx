import ThankYou from "@/assets/svg/super_thankyou.svg";

export default function ThankYouPage() {
    return(
        <div className="h-full flex justify-center items-center">
            <center>
                <div className="font-bold text-xl mb-6">Thank You!</div>
                <img src={ThankYou} alt="" className="w-1/2 mb-6" />
                <div className="font-semibold text-lg">We hope to see you again...</div>
            </center>
        </div>
    )
}