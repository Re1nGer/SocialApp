import { useContext, useEffect, useState } from "react";
import { axios, axios as call } from "../../axios";
import IUser from '../../types/IUser';
import CircleLoader from '../loader/CircleLoader';
import toast, { Toaster } from 'react-hot-toast';
import { ThemeContext } from "../contexts/ThemeContext";

type NotificationItemPropType = {
    userId: string;
};

const defaultUser:IUser = {
    username: "",
    id: "",
    lowResImageLink: ""
}

export const NotificationItem = ({ userId }: NotificationItemPropType) => {

    const [user, setUser] = useState<IUser>(defaultUser)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isAccepting, setIsAccepting] = useState<boolean>(false)

    const { setProfileInfo, profileInfo } = useContext(ThemeContext);

    const fetchNotificationItem = async () => {
        try {
            setIsLoading(true);
            const { data } = await call.get<IUser>(`/api/v1/user/${userId}`);
            setUser(data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleAccept = async () => {
        try {
            setIsAccepting(true)
            await axios.post('/api/v1/follow/accept', { userRequestId: userId })
            toast.success('Request Accepted', {
                duration: 3000,
                position: "bottom-right"
            })
            const newProfileInfoState = {...profileInfo }
            newProfileInfoState.userRequests = [...newProfileInfoState.userRequests.filter(item => item.senderUserId !== userId)];
            setProfileInfo(newProfileInfoState)
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsAccepting(false)
        }
    }

    const handleDecline = async () => {

    }

    useEffect(() => {
        fetchNotificationItem();
    }, []);

    if (isLoading) {
        return <CircleLoader />;
    }

    return <>
        <li className='notification_menu__dropdown-item'>
            <div>Follow Request from {user?.username}</div>
            <img className='notification_menu__dropdown-item_img' src={user.lowResImageLink} alt='user img' />
        </li>
        <div className='flex justify-center gap-2 my-1'>
            <button className={'p-1 px-2 bg-black text-white rounded-lg border text-sm'} onClick={handleAccept}>Accept</button>
            <button className={'p-1 px-2 bg-white text-black rounded-lg border text-sm'}>Decline</button>
        </div>
        <Toaster />
    </>;
};