import React from 'react';
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Icon } from "@iconify/react";
import TestImage from '../../assets/loveSand.jpg';
import "./animations.css";
import "./Drawer.css";

const ChatDrawer = () => {

    //const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { isChatDrawerOpen, setIsChatDrawerOpen } = useContext(ThemeContext);

    const [isLoading, setIsLoading] = useState(false);

    const [chatId, setChatId] = useState(null);

    const handleDrawerClose = () => {
        setIsChatDrawerOpen(false);
        document.body.style.overflow = 'unset';
        document.body.style.height = 'unset';
    }

    const handleBack = () => {
        setChatId(null);
        document.body.style.overflow = 'unset';
        document.body.style.height = 'unset';
    }

    const fetchExistingChats = () => {}

    React.useEffect(() => {
        fetchExistingChats();
    },[])

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
                { chatId ? (
                    <div className='drawer__back' onClick={handleBack}>
                        <Icon icon="material-symbols:arrow-back-rounded" color={"#fff"} fontSize={"25px"} />
                    </div>
                ) : null }
                { chatId ? (
                    <ChatDrawerRoom id={chatId} />
                ) : (
                    <div className="drawer__results-container">
{/*                         exising chats need to be fetched from server */}
                        <ChatDrawerUserCard setChatId={setChatId} id={2} />
                        <ChatDrawerUserCard setChatId={setChatId} id={2} />
                        <ChatDrawerUserCard setChatId={setChatId} id={2} />
                        <ChatDrawerUserCard setChatId={setChatId} id={2} />
                        <ChatDrawerUserCard setChatId={setChatId} id={2} />
                    </div>
                ) }
            </div>
        </>
    );
}

export default ChatDrawer;


const ChatDrawerUserCard = ({ setChatId, id }) => {
    
    //const id = "2";

    const handleUserCardClick = () => {
        setChatId(id);
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
    }

    return (
        <div className="user-card" onClick={handleUserCardClick}>
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


const ChatDrawerRoom = ({ id }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState(Array.from(Array(10).keys()));

    const fetchMessages = async () => {
/*         id of the chat necessary to fetch messages  */
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        setMessages(prevState => [...prevState, prevState.length + 1]);
    }

    useEffect(() => {
        //intersection api to fetch more if the beginning has been reached
        //fetch last 50 messages
        //fetchMessages();
    },[]);

    return (
        <div className="chat__room">
            <div className="chat__room-inner">
                <div className="chat__room-username">
                    Conversation With: Username
                </div>

                <div className='chat__room-messages'>
                    { messages.map(item => <ChatDrawerRoomMessage />) }
                </div>
                <form onSubmit={handleSendMessage}>
                    <div className="chat__room-input_container">
                        <Icon icon="material-symbols:attach-file-add" color={"#fff"} fontSize={'25px'} />
                        <input className="chat__room-input" type={'text'} placeholder={'Type in message'} />
                        <Icon icon="ph:paper-plane-tilt-bold" color={'#fff'} fontSize={"25px"} />
                    </div>
                </form>
            </div>
        </div>
    );
}

const ChatDrawerRoomMessage = () => {

    return (
        <>
            <div className='chat__room-message chat__room-message--show'>
                SomeMessage
            </div>
        </>
    );
}