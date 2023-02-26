import { useState } from "react";
import "./Header.css";
import "./ProfileMenu.css";
import { HeaderHamburgerMenu } from "./HeaderHamburgerMenu";
import ProfileImage from "../../assets/profileImage.jpg";
import { HeaderIcon } from "../svg/HeaderIcon";

const Header = () => {
    return (
        <header className="header">
            <div className="header__left">
                <HeaderHamburgerMenu />
                <HeaderIcon />
            </div>
            <div className="header__right">
                <HeaderProfileMenu imgSrc={''} />
            </div>
        </header>
    );
}


const HeaderProfileMenu = ({ imgSrc }) => {

    const [open, setOpen] = useState(false);

    const handleDropdownOverlayClose = () => {
        setOpen(false);
    }

    const handleDropdownMenuOpen = (event) => {
        setOpen(prevState => !prevState);
    }

    return (
        <>
            { open ?  <div className="profile_menu__overlay" onClick={handleDropdownOverlayClose}></div> : null }
            <div className="profile_menu__container">
                <div className="profile_menu" onClick={handleDropdownMenuOpen}>
                    <div className="profile_menu__picture_container">
                        <img className="profile_menu__picture" src={ProfileImage} alt={'profile'} />
                    </div>
                </div>
                <div className={`profile_menu__dropdown ${open ? 'profile_menu__dropdown--open' : ''}`}>
                    <div className="profile_menu__dropdown-item">Username</div>
                    <div className="profile_menu__dropdown-item">Light Mode</div>
                    <div className="profile_menu__dropdown-item">Logout</div>
                </div>
            </div>
        </>
    )

}

export default Header;