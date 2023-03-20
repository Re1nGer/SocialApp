import { Icon } from "@iconify/react";
import "./Searchbar.css";

const Searchbar = (): JSX.Element => {

    return (
        <div className="searchbar">
            <Icon icon="material-symbols:search" fontSize={20} className="searchbar__input-icon" />
            <input type="text" className="searchbar__input" placeholder="type in email" />
        </div>
    );
}

export default Searchbar;