import Logo from '@/assets/images/ryomu-logo-red.png';
import Google from '@/assets/images/goggle.png';
import { ButtonLarge } from '@/config/theme';
import { clearSession } from '@/services/session_service';
import { useNavigate } from 'react-router-dom';
import { successToast } from '@/services/toast_service';
import { getProfile } from '@/services/user_service';
import { useEffect, useState } from 'react';
import ProfileName from './components/ProfileName';
import { IUser } from '@/interfaces/IUser';
import Spinnner from '@/components/Spinner';
import { DateTime } from 'luxon';
import Confirm from '@/components/Confirm';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

    useEffect(() => {
        getProfileData();
    }, []);
    
    async function logout() {
        clearSession();
        navigate("/static/thank-you");
        successToast('Logout Success!');
    }

    async function getProfileData() {
        setLoading(true);
        const data = await getProfile();
        if(data.data != null) {
            setUser(data.data);
        }
        setLoading(false);
    }

    return(
        <>
            <center className='h-full py-10'>
                <img src={Logo} alt="" className='w-1/2 mb-8 shadow-lg rounded-full' />
                
                {
                    loading && <Spinnner size='xl' />
                }

                {
                    user && !loading && <>
                        <div className='mb-4 flex items-center justify-center'>
                            <ProfileName user={user} setUser={setUser} />
                        </div>

                        <div className='mb-8 text-slate-400 text-sm font-semibold'>
                            Joined since {DateTime.fromISO(user.created_at).toFormat("DD")}
                        </div>
                        
                        {
                            user.with_google &&
                                <div className='flex items-center justify-center mb-12'>
                                    <img src={Google} alt="" />
                                    <div className='ml-3 text-sm font-semibold'>{user.email}</div>
                                </div>
                        }

                        <div className='px-10'>
                            <button onClick={() => setIsConfirmOpen(true)} title="Logout" className={`mb-6 ${ButtonLarge} text-white !bg-[#C51605]`}>Logout</button>
                        </div>
                    </>
                }
            </center>

            <Confirm title='Are You Sure?' isOpen={isConfirmOpen} setIsOpen={setIsConfirmOpen} onClose={() => {}} onConfirm={logout} />
        </>
    )
}