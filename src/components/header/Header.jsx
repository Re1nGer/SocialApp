import "./Header.css";
import "./ProfileMenu.css";
import { HeaderHamburgerMenu } from "./HeaderHamburgerMenu";
import { HeaderIcon } from "../svg/HeaderIcon";
import { HeaderProfileMenu } from "./HeaderProfileMenu";

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

export default Header;