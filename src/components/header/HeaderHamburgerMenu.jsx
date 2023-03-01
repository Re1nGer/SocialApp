import { useState } from "react";

export const HeaderHamburgerMenu = ({isLightTheme}) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="ham_menu" onClick={() => setOpen(prevState => !prevState)}>
            <span
                className={`ham_menu__bar ham_menu__bar_first
                    ${open ? 'ham_menu__bar_first--open' : null}
                    ${isLightTheme ? 'ham_menu__bar--light' : null}`}> </span>
            <span
                className={`ham_menu__bar ham_menu__bar_second ${open ? 'ham_menu__bar_second--open' : null}
                    ${isLightTheme ? 'ham_menu__bar--light' : null}`}></span>
            <span
                className={`ham_menu__bar ham_menu__bar_third ${open ? 'ham_menu__bar_third--open' : null}
                    ${isLightTheme ? 'ham_menu__bar--light' : null}`}></span>
            <span
                className={`ham_menu__bar ham_menu__bar_fourth ${open ? 'ham_menu__bar_fourth--open' : null}
                    ${isLightTheme ? 'ham_menu__bar--light' : null}`}></span>
        </div>
    );
};
