import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Icon } from "@iconify/react";
import TestImage from '../../assets/loveSand.jpg';
import "./Drawer.css";

const ChatDrawer = () => {

    //const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { isChatDrawerOpen, setIsChatDrawerOpen } = useContext(ThemeContext);

    const handleDrawerClose = () => {
        setIsChatDrawerOpen(false);
    }

    return (
        <>
            { isChatDrawerOpen ? <div className="drawer__overlay" onClick={handleDrawerClose}></div> : null }
            <div onClick={(e) => e.stopPropagation()} className={`drawer ${isChatDrawerOpen ? 'drawer--open' : ''} `}>
                <div className="drawer__title">
                    <div className="drawer__tile-text">DM</div>
                    <div className="drawer__close">
                        <Icon onClick={handleDrawerClose} icon="ic:round-close" color={"#fff"} fontSize={'20px'} />
                    </div>
                </div>
                <div className="drawer__input-container">
                    <input className="drawer__input" placeholder="Type In Username" />
                </div>
                <div className="drawer__results-container">
                    <ChatDrawerUserCard />
                    <ChatDrawerUserCard />
                    <ChatDrawerUserCard />
                    <ChatDrawerUserCard />
                    <ChatDrawerUserCard />
                </div>
            </div>
        </>
    );
}

export default ChatDrawer;


const ChatDrawerUserCard = () => {

    return (
        <div className="user-card">
            <div className="user-card__img-container">
                <img className="user-card__img" src={TestImage} />
            </div>
            <div className="user-card__text-container">
                <h3 className="user-card__username">
                    Username
                </h3>
                <h5>No messages yet</h5>
            </div>
        </div>
    )
}


const ChatDrawerRoom = () => {
    return (
        <div>

        </div>
    )
}