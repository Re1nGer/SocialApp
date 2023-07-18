import AnimatedHeaderNotificationItem from "./AnimatedHeaderNotificationItem";
import NotificationList from "./NotificationList";
import HeaderNotificationBadge from "./HeaderNotificationIcon";
import "./Header.scss";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AnimatePresence } from "framer-motion";



const HeaderNotificationMenu = () => {

    const [open, setOpen] = useState<boolean>(false)

    const { profileInfo: { userRequests } } = useContext(ThemeContext)
    const handleDropdownMenuOpen = (): void => {
        setOpen((prevState) => !prevState)
    }

    return (
        <>
            <nav className='relative' onClick={handleDropdownMenuOpen}>
                <div className='h-full relative'>
                    <HeaderNotificationBadge notificationCount={userRequests.length} />
                </div>
                <AnimatePresence>
                    {open && (
                      <NotificationList>
                          {userRequests.map(item => (
                            <AnimatedHeaderNotificationItem
                              exit={{ opacity: 0, scale: 0.5 }}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              key={item.id}
                              userId={item.senderUserId}  />
                          ))}
                      </NotificationList>
                    )}
                </AnimatePresence>
            </nav>
        </>
    )
}

export default HeaderNotificationMenu