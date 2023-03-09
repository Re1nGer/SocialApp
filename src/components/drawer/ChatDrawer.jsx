import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import "./Drawer.css";

const ChatDrawer = () => {

    //const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { isChatDrawerOpen, setIsChatDrawerOpen } = useContext(ThemeContext);

    const handleDrawerOpen = () => {
        setIsChatDrawerOpen(false);
    }

    return (
        <>
            { isChatDrawerOpen ? <div className="drawer__overlay" onClick={handleDrawerOpen}></div> : null }
            <div onClick={(e) => e.stopPropagation()} className={`drawer ${isChatDrawerOpen ? 'drawer--open' : ''} `}>
                Some Content
            </div>
        </>
    );
}

export default ChatDrawer;