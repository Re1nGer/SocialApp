import { useEffect, useState } from 'react';
import { axios as call } from '../../axios';
import IUser from '../../types/IUser';
import CircleLoader from '../loader/CircleLoader';

type NotificationItemPropType = {
    userId: number;
};

export const NotificationItem = ({ userId }: NotificationItemPropType) => {

    const [user, setUser] = useState<IUser | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    useEffect(() => {
        fetchNotificationItem();
    }, []);

    if (isLoading) {
        return <CircleLoader />;
    }

    return <>
        <li className='notification_menu__dropdown-item'>
            <div>Follow Request from {user?.username}</div>
            <img className='notification_menu__dropdown-item_img' src={user?.lowResUserImageSrc} alt='user img' />
        </li>
    </>;
};