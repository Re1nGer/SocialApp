import "./Header.css";
import { useState } from "react";

function Header() {
    return (
        <header className="header">
            <div className="header__left">
                <HeaderHamburgerMenu />
                <img className="header__left_icon" />
            </div>
            <div className="header__right">
                <HeaderProfileMenu />
            </div>
        </header>
    );
}


const HeaderHamburgerMenu = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className="ham_menu" onClick={() => setOpen(prevState => !prevState)}>
            <span className={`ham_menu__bar ham_menu__bar_first ${open ? 'ham_menu__bar_first--open' : null}`}> </span>
            <span className={`ham_menu__bar ham_menu__bar_second ${open ? 'ham_menu__bar_second--open' : null}`}></span>
            <span className={`ham_menu__bar ham_menu__bar_third ${open ? 'ham_menu__bar_third--open' : null}`}></span>
            <span className={`ham_menu__bar ham_menu__bar_fourth ${open ? 'ham_menu__bar_fourth--open' : null}`}></span>
        </div>
    )
}

const HeaderProfileMenu = () => {}

export default Header;