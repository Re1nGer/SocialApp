import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const FeedMainInputUserIconImage = (props: { lowResImageLink: string }) => {
  return <Link to={"/mypage"}>
    <motion.img
      transition={{ ease: "easeIn", duration: 1.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={"feed__input-img"}
      src={props.lowResImageLink ?? defaultUserImg}
      alt="profile"
    />
  </Link>;
}

export default FeedMainInputUserIconImage
