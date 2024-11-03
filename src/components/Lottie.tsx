import { FC } from 'react';
import Lottie from 'react-lottie';

interface LottiePlayerProps {
    lottiePath: any
}

const LottiePlayer: FC<LottiePlayerProps> = ({
    lottiePath
}) => {
    return (
        <Lottie 
            options={{
                loop: true,
                autoplay: true, 
                animationData: lottiePath,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            }}
            height={400}
            width={400}
        />
    )
}

export default LottiePlayer;