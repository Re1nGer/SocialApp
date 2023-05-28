
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { axios as call } from '../../axios'
import "./Header.scss"
import { NotificationItem } from './NotificationItem'
import INotification from '../../types/INotification'



const HeaderNotificationMenu = () => {

    const [open, setOpen] = useState<boolean>(false)

    const [followRequests, setFollowRequests] = useState<INotification[]>([])

    const handleDropdownOverlayClose = (): void => {
        setOpen(false)
    }

    const handleDropdownMenuOpen = (): void => {
        setOpen((prevState) => !prevState)
    }

    const fetchNotifications = async (): Promise<void> => {
        try {
        const { data } = await call.get<INotification[]>("/api/v1/follow/requests");
        setFollowRequests(data);
        } catch(error) {
        console.log(error);
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    return (
        <>
            {open ? <div className='notification_menu__overlay' onClick={handleDropdownOverlayClose} /> : null}
            <nav className='notification_menu__container'>
                <div className='notification_menu' onClick={handleDropdownMenuOpen}>
                <div className='notification__wrapper'>
                    <Icon icon="ph:bell-bold" fontSize='25px' />
                    <button className='notification__badge'>{followRequests.length}</button>
                </div>
                </div>
                { followRequests.length > 0 ? (
                    <ul role='list' className={`notification_menu__dropdown ${open ? 'notification_menu__dropdown--open' : ''}`}>
                        { followRequests.map(item => (
                            <NotificationItem userId={item.senderUserId} />
                        )) }
                    </ul>
                ) : null }
            </nav>
        </>
    )
}

export default HeaderNotificationMenu