import "./Header.css";
import "./ProfileMenu.css";
import { HeaderHamburgerMenu } from "./HeaderHamburgerMenu";
import { HeaderIcon } from "../svg/HeaderIcon";
import { HeaderProfileMenu } from "./HeaderProfileMenu";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = () => {

    const { isLightTheme } = useContext(ThemeContext);

    return (
        <header className={`header ${isLightTheme ? 'header--light' : ''}`}>
            <div className="header__left">
                <HeaderHamburgerMenu isLightTheme={isLightTheme} />
                <HeaderIcon />
            </div>
            <div className="header__right">
                <HeaderProfileMenu imgSrc={''} />
            </div>
        </header>
    );
}

export default Header;