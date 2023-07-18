import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

export function FeedMainInput(props: { onClick: React.MouseEventHandler }) {

  const { profileInfo: { lowResImageLink } } = useContext(ThemeContext)

  return <div className="feed__input-container">
    <img className="feed__input-img" src={lowResImageLink ?? defaultUserImg} alt="profile" />
    <div className="feed__input-form_container">
      <input className="feed__input-input" placeholder="What's happening ?" onClick={props.onClick} />
      <div className="hidden gap-1 md:flex">
        <div className="feed__input--photo">
          <button className="feed__input-btn">
            <Icon icon="gg:image" fontSize={20} />
            Photo
          </button>
        </div>
        <div className="feed__input--video">
          <button className="feed__input-btn">
            <Icon icon="ic:twotone-slow-motion-video" fontSize={20} />
            Video
          </button>
        </div>
        <div className="feed__input--thread">
          <button className="feed__input-btn">
            <Icon icon="ic:twotone-slow-motion-video" fontSize={20} />
            Thread
          </button>
        </div>
        <div className="feed__input--schedule">
          <button className="feed__input-btn">
            <Icon icon="fa6-solid:calendar-days" fontSize={20} />
            Schedule
          </button>
        </div>
      </div>
    </div>
  </div>;
}