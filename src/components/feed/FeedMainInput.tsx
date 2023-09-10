import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

export function FeedMainInput(props: { onClick: React.MouseEventHandler }) {

  const { profileInfo: { lowResImageLink } } = useContext(ThemeContext)

  return <div className="feed__input-container">
      <Link to={'/mypage'}>
        <motion.img
          transition={{ ease: 'easeIn', duration: 1.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={'feed__input-img'}
          src={lowResImageLink ?? defaultUserImg}
          alt="profile"
        />
      </Link>
    <div className="feed__input-form_container">
      <input
          className="feed__input-input"
          placeholder="What's happening?"
          onClick={props.onClick}
      />
    </div>
  </div>;
}