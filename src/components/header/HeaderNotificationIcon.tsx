import { Icon } from "@iconify/react";

type HeaderNotificationIconProps = {
  notificationCount: number
}

const HeaderNotificationIcon = ({ notificationCount }:HeaderNotificationIconProps) => {
  return <div className="notification__wrapper">
    <Icon icon="ph:bell-bold" fontSize="25px" />
    <button className="notification__badge">{notificationCount}</button>
  </div>;
};

export default HeaderNotificationIcon