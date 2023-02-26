import { useState } from "react";

export const HeaderHamburgerMenu = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className="ham_menu" onClick={() => setOpen(prevState => !prevState)}>
            <span className={`ham_menu__bar ham_menu__bar_first ${open ? 'ham_menu__bar_first--open' : null}`}> </span>
            <span className={`ham_menu__bar ham_menu__bar_second ${open ? 'ham_menu__bar_second--open' : null}`}></span>
            <span className={`ham_menu__bar ham_menu__bar_third ${open ? 'ham_menu__bar_third--open' : null}`}></span>
            <span className={`ham_menu__bar ham_menu__bar_fourth ${open ? 'ham_menu__bar_fourth--open' : null}`}></span>
        </div>
    );
};
