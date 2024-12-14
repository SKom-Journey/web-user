import { CheckMarkIcon, EditIcon, TimesIcon } from "@/components/Icons";
import { TextInputSM } from "@/config/theme";
import { IUser } from "@/interfaces/IUser";
import { successToast } from "@/services/toast_service";
import { updateUserName } from "@/services/user_service";
import { useRef, useState } from "react";

interface ProfileNameProps {
   user: IUser;
   setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const ProfileName: React.FC<ProfileNameProps> = ({
    user,
    setUser
}) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const userNameInput = useRef<HTMLInputElement | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await updateUserName(userNameInput.current!.value);
        setUser(user => {
            if(user) {
                user.name = userNameInput.current!.value;
            }
            return user;
        });
        setIsEditMode(false);
        successToast('Name Changed!');
    }

    return(
        <>
            {
                isEditMode &&
                    <form onSubmit={(e) => onSubmit(e)} className="flex items-center justify-center">
                        <div className='font-semibold'><input ref={userNameInput} type="text" defaultValue={user.name} autoFocus className={`border text-sm ${TextInputSM}`} /></div>
                        <div className='ml-2'>
                            <button className="ml-2" type="button" title='Cancel' onClick={() => setIsEditMode(false)}>
                                <TimesIcon />
                            </button>
                            <button className="ml-2" type="submit" title='Edit Name'>
                                <CheckMarkIcon />
                            </button>
                        </div>
                    </form>
            }

            {
                !isEditMode &&
                    <div className="flex">
                        <div className='font-semibold'>{user.name}</div>

                        <div className='ml-3'>
                            <button type="button" title='Edit Name' onClick={() => setIsEditMode(true)}>
                                <EditIcon />
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}

export default ProfileName;