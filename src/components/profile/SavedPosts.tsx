import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Post from "../post/Post";

const SavedPosts = () => {

  const { profileInfo: { postBookmarks } } = useContext(ThemeContext)

  return (
    <div className={'flex flex-col justify-start'}>
      { postBookmarks.map(item => <Post key={item} postId={item} /> ) }
    </div>
  );
};

export default SavedPosts;