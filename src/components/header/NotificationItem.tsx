import React, { LegacyRef, useContext, useEffect, useState } from "react";
import { axios } from "../../axios";
import IUser from '../../types/IUser';
import CircleLoader from '../loader/CircleLoader';
import toast, { Toaster } from 'react-hot-toast';
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

type NotificationItemPropType = {
    userId: string;
};

const defaultUser:IUser = {
    username: "",
    id: "",
    lowResImageLink: ""
}

const NotificationItem = ({ userId }: NotificationItemPropType, ref:LegacyRef<HTMLDivElement>) => {

    const [user, setUser] = useState<IUser>(defaultUser)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { setProfileInfo, profileInfo } = useContext(ThemeContext);

    const fetchNotificationItem = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<IUser>(`/api/v1/user/${userId}`);
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
    }
    const handleDecline = async () => {
        try {
            await axios.post('/api/v1/follow/reject', { userRequestId: userId })
            toast.error('Request Declined', {
                duration: 3000,
                position: "bottom-right"
            })
            const newProfileInfoState = {...profileInfo }
            newProfileInfoState.userRequests = [...newProfileInfoState.userRequests.filter(item => item.senderUserId !== userId)];
            setProfileInfo(newProfileInfoState)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchNotificationItem();
    }, []);

    if (isLoading) {
        return <CircleLoader />;
    }

    return <div ref={ref} onClick={(event) => event.stopPropagation()}>
        <li className='p-[1rem] text-white text-center flex items-center justify-center transition-[color] hover:text-slate-200 ease-in text-sm cursor-pointer'>
            <div>Follow Request from {user?.username}</div>
            <Link to={`user/${user.id}`} className={'h-[25px] w-[25px]'}>
                <img className='rounded-full object-cover h-full w-full' src={user.lowResImageLink} alt='user img' />
            </Link>
        </li>
        <div className='flex justify-center gap-2 my-1'>
            <button className={'p-1 px-2 bg-black text-white rounded-lg border text-sm'} onClick={handleAccept}>Accept</button>
            <button className={'p-1 px-2 bg-white text-black rounded-lg border text-sm'} onClick={handleDecline}>Decline</button>
        </div>
        <Toaster />
    </div>;
};

export default React.forwardRef(NotificationItem);