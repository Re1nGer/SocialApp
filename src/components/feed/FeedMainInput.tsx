import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import FeedMainInputUserIconImage from "./FeedMainInputUserIconImage";



export function FeedMainInput(props: { onClick: React.MouseEventHandler }) {

  const { profileInfo: { lowResImageLink } } = useContext(ThemeContext)

  return <div className="feed__input-container">
    <FeedMainInputUserIconImage lowResImageLink={lowResImageLink} />
    <div className="feed__input-form_container">
      <input className="feed__input-input" placeholder="What's happening?" onClick={props.onClick} />
    </div>
  </div>;
}

