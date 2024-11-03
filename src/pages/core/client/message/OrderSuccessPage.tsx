import LottiePlayer from '@/components/Lottie';
import Cook from "@/assets/lottie/cook.json";

export default function OrderSuccessPage() {
    return(
        <div className="mt-16">
            <div className='font-bold text-2xl text-center'>Order Placed</div>
            <LottiePlayer lottiePath={Cook} />
            <div className='font-semibold text-lg text-center'>Please Wait For Your Order, Thanks...</div>
        </div>
    )
}