import "./Header.css";
import "./ProfileMenu.css";
import { HeaderHamburgerMenu } from "./HeaderHamburgerMenu";
import { HeaderLogoIcon } from "../svg/HeaderLogoIcon";
import { HeaderProfileMenu } from "./HeaderProfileMenu";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import ChatDrawer from "../drawer/ChatDrawer";

const Header = () => {

    const { isLightTheme, isLoggedIn, setIsChatDrawerOpen } = useContext(ThemeContext);

    const navigate = useNavigate();

    const handleIconClick = () => {
        navigate("/feed");
    }

    return (
        <>
            <ChatDrawer />
            <header className={`header ${isLightTheme ? 'header--light' : ''}`}>
                <div className="header__left">
                    <HeaderHamburgerMenu isLightTheme={isLightTheme} />
                    <HeaderLogoIcon onClick={handleIconClick} />
                </div>
                <div className="header__right">
                    { isLoggedIn ? <HeaderProfileMenu imgSrc={''} /> : null }
                    { isLoggedIn ? (
                        <div className="header__right-chat_icon">
                            <Icon icon="ph:paper-plane-tilt-bold" fontSize={"25px"} onClick={() => setIsChatDrawerOpen(true)} />
                        </div>
                    ) : null }
                </div>
            </header>
        </>
    );
}

export default Header;