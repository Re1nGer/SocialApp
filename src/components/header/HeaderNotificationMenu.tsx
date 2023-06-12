
import { useContext, useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { axios as call } from '../../axios'
import "./Header.scss"
import { NotificationItem } from './NotificationItem'
import INotification from '../../types/INotification'
import { ThemeContext } from "../contexts/ThemeContext";



const HeaderNotificationMenu = () => {

    const [open, setOpen] = useState<boolean>(false)

    const { profileInfo: { userRequests } } = useContext(ThemeContext)
    const handleDropdownOverlayClose = (): void => {
        setOpen(false)
    }

    const handleDropdownMenuOpen = (): void => {
        setOpen((prevState) => !prevState)
    }

    return (
        <>
            {open ? <div className='notification_menu__overlay' onClick={handleDropdownOverlayClose} /> : null}
            <nav className='notification_menu__container'>
                <div className='notification_menu' onClick={handleDropdownMenuOpen}>
                <div className='notification__wrapper'>
                    <Icon icon="ph:bell-bold" fontSize='25px' />
                    <button className='notification__badge'>{userRequests.length}</button>
                </div>
                </div>
                { userRequests.length > 0 ? (
                    <ul role='list' className={`notification_menu__dropdown ${open ? 'notification_menu__dropdown--open' : ''}`}>
                        { userRequests.map(item => (
                            <NotificationItem key={item.id} userId={item.senderUserId} />
                        )) }
                    </ul>
                ) : null }
            </nav>
        </>
    )
}

export default HeaderNotificationMenu