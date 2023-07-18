import { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { ThemeContext } from '../../contexts/ThemeContext'
import TestImage from '../../assets/profileHeaderImage.jpg'
import { axios as call } from '../../axios';
import './animations.css'
import './Drawer.scss'
import IChat from "../../types/IChat";

const ChatDrawer = (): JSX.Element => {

  const { isChatDrawerOpen, setIsChatDrawerOpen, setChatId, chatId } = useContext(ThemeContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [chats, setChats] = useState<IChat[]>([]);

  const handleDrawerClose = () => {
    setIsChatDrawerOpen(false)
    document.body.style.overflow = 'unset'
    document.body.style.height = 'unset'
  }

  const handleBack = () => {
    setChatId(null)
    document.body.style.overflow = 'unset'
    document.body.style.height = 'unset'
  }

  const fetchChats = async () => {
    try {
      const { data } = await call.get<IChat[]>('/api/v1/chat');
      setChats(data);
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <>
      {isChatDrawerOpen ? <div className='drawer__overlay' onClick={handleDrawerClose} /> : null}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`drawer ${isChatDrawerOpen ? 'drawer--open' : ''} `}
      >
        <div className='drawer__title'>
          <div className='drawer__tile-text'>DM</div>
          <div className='drawer__close'>
            <Icon onClick={handleDrawerClose} icon='ic:round-close' color='#fff' fontSize='20px' />
          </div>
        </div>
        {chatId ? (
          <div className='drawer__back' onClick={handleBack}>
            <Icon icon='material-symbols:arrow-back-rounded' color='#fff' fontSize='25px' />
          </div>
        ) : null}
        {chatId ? (
          <ChatDrawerRoom id={chatId} />
        ) : (
          <div className='drawer__results-container'>
            { chats.map(item => (
              <ChatDrawerUserCard setChatId={setChatId} id={item.id} />
            )) }
          </div>
        )}
      </div>
    </>
  )
}

export default ChatDrawer

type ChatDrawerUserCardType = {
  setChatId: (id: string | null) => void
  id: string | null
}

const ChatDrawerUserCard = ({ setChatId, id }: ChatDrawerUserCardType) => {

  const handleUserCardClick = () => {
    setChatId(id)
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
  }

  return (
    <div className='user-card' onClick={handleUserCardClick}>
      <div className='user-card__img-container'>
        <img className='user-card__img' src={TestImage} />
      </div>
      <div className='user-card__text-container'>
        <h3 className='user-card__username'>Username</h3>
        <h5 className='user-card__message'>No messages yet</h5>
      </div>
    </div>
  )
}

type ChatDrawerRoomType = {
  id: string | null
}

const ChatDrawerRoom = ({ id }: ChatDrawerRoomType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [messages, setMessages] = useState<Array<number>>(Array.from(Array(10).keys()))

  const fetchMessages = async () => {
    /*         id of the chat necessary to fetch messages  */
  }

  const handleSendMessage = (event: SyntheticEvent) => {
    event.preventDefault()
    setMessages((prevState) => [...prevState, prevState.length + 1])
  }

  useEffect(() => {
    // intersection api to fetch more if the beginning has been reached
    // fetch last 50 messages
    // fetchMessages();
  }, [])

  return (
    <div className='chat__room'>
      <div className='chat__room-inner'>
        <div className='chat__room-username'>Conversation With: Username</div>

        <div className='chat__room-messages'>
          {messages.map((item) => (
            <ChatDrawerRoomMessage key={item} />
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <div className='chat__room-input_container'>
            <Icon icon='material-symbols:attach-file-add' color='#fff' fontSize='25px' />
            <input className='chat__room-input' type='text' placeholder='Type in message' />
            <Icon icon='ph:paper-plane-tilt-bold' color='#fff' fontSize='25px' />
          </div>
        </form>
      </div>
    </div>
  )
}

function ChatDrawerRoomMessage() {
  return <div className='chat__room-message chat__room-message--show'>SomeMessage</div>
}
