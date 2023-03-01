import { useContext, useState } from "react";
import ProfileImage from "../../assets/profileImage.jpg";
import { Icon } from '@iconify/react';
import { ThemeContext } from "../contexts/ThemeContext";

export const HeaderProfileMenu = ({ imgSrc }) => {

    const {isLightTheme, setIsLightTheme} = useContext(ThemeContext);

    const [open, setOpen] = useState(false);

    const handleDropdownOverlayClose = () => {
        setOpen(false);
    };

    const handleDropdownMenuOpen = (event) => {
        setOpen(prevState => !prevState);
    };

    return (
        <>
            {open ? <div className="profile_menu__overlay" onClick={handleDropdownOverlayClose}></div> : null}
            <div className="profile_menu__container">
                <div className="profile_menu" onClick={handleDropdownMenuOpen}>
                    <div className="profile_menu__picture_container">
                        <img className="profile_menu__picture" src={ProfileImage} alt={'profile'} />
                    </div>
                </div>
                <div className={`profile_menu__dropdown ${open ? 'profile_menu__dropdown--open' : ''}`}>
                    <div className="profile_menu__dropdown-item">
                        <Icon fontSize={16} icon="mdi:user" />
                        Username
                    </div>
                    <div className="profile_menu__dropdown-item" onClick={() => setIsLightTheme(prevState => !prevState)}>
                        <Icon fontSize={16} icon="mdi:weather-sunset-down" />
                        Light Mode
                    </div>
                    <div className="profile_menu__dropdown-item">
                        <Icon fontSize={16} icon="mdi:arrow-right-thick" />
                        Logout
                    </div>
                </div>
            </div>
        </>
    );
};
