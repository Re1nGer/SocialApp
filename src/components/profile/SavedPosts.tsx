import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Post from "../post/Post";

const SavedPosts = () => {

  const { profileInfo: { postBookmarks } } = useContext(ThemeContext)

  return (
    <>
      <div className={'flex flex-col justify-start min-h-[500px]'}>
        { postBookmarks.map(item => <Post key={item} postId={item} /> ) }
      </div>
      { postBookmarks.length === 0 && <span className={'text-white font-bold'}>No Saved Posts</span> }
    </>
  );
};

export default SavedPosts;