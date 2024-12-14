import Logo from '@/assets/images/ryomu-logo-red.png';
import Google from '@/assets/images/goggle.png';
import { EditIcon } from '@/components/Icons';
import { ButtonLarge } from '@/config/theme';
import { clearSession } from '@/services/session_service';
import { useNavigate } from 'react-router-dom';
import { successToast } from '@/services/toast_service';
import { getProfile } from '@/services/profile_service';
import { useEffect } from 'react';

export default function ProfilePage() {
    const navigate = useNavigate();

    useEffect(() => {
        getProfileData();
    }, []);
    
    async function logout() {
        clearSession();
        navigate("/static/thank-you");
        successToast('Logout Success!');
    }

    async function getProfileData() {
        const data = await getProfile();
        console.warn(data.data);
    }

    return(
        <center className='h-full py-10'>
            <img src={Logo} alt="" className='w-1/2 mb-8 shadow-lg rounded-full' />
            
            <div className='mb-4 flex items-center justify-center'>
                <div className='font-semibold'>_mjusteen</div>
                <div className='ml-2'>
                    <button title='Edit Name'>
                        <EditIcon />
                    </button>
                </div>
            </div>

            <div className='mb-8 text-slate-400 text-sm font-semibold'>
                Joined since 12-05-2024
            </div>

            <div className='flex items-center justify-center mb-12'>
                <img src={Google} alt="" />
                <div className='ml-3 text-sm font-semibold'>melvinjovano2@gmail.com</div>
            </div>

            <div className='px-10'>
                <button onClick={logout} title="Logout" className={`mb-6 ${ButtonLarge} text-white !bg-[#C51605] hover:bg-red-800`}>Logout</button>
            </div>
        </center>
    )
}