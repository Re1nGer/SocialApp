import './Feed.scss'
import IPost from "../../types/IPost";
import { Icon } from "@iconify/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import CommentSection from "../post/CommentSection";
import { axios } from "../../axios";
import AnimatedCommentForm from "../profile/AnimatedCommentForm";
import { SubmitHandler } from "react-hook-form";
import { CommentFormDefaultValuesType } from "../comment/CommentForm";
import { AnimatePresence, useAnimation, useInView } from "framer-motion";

export type FeedPostPropType = {
  post: IPost
}

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

type FeedPostVideoProps = {
  src: string
}

const FeedPostVideo = ({ src }: FeedPostVideoProps): JSX.Element => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const handleVideoClick = () => {
    videoRef.current?.play();
  }
  const videoInView = useInView(videoRef);
  useEffect(() => {
    if (videoInView) videoRef.current?.play()
    else videoRef.current?.pause();
  }, [videoInView]);

  return <video controls id="video-tag" onClick={handleVideoClick} ref={videoRef}>
    <source id="video-source" src={src} />
    Your browser does not support the video tag.
  </video>;
}

const FeedPostImage = (props: { src: string }) => {
  return <img src={props.src} alt={"post"} className={"max-h-[400px] w-full object-contain "} />;
}

const CommentCount = (props: { localPost: IPost, onClick: () => void }) => {
  return <div className="flex gap-2 items-center">
    {props.localPost.commentCount}
    <Icon
      fontSize={20}
      onClick={props.onClick}
      icon="uil:comment"
      className={"cursor-pointer"} />
  </div>;
}

const LikeCount = (props: { localPost: IPost, deleteLike: () => Promise<void>, putLike: () => Promise<void> }) => {
  return <div className="flex gap-2 items-center">
    {props.localPost.likeCount}
    <Icon
      fontSize={20}
      icon={props.localPost.hasUserLike ? "mdi:cards-heart" : "mdi:cards-heart-outline"}
      className={"cursor-pointer"}
      onClick={props.localPost.hasUserLike ? props.deleteLike : props.putLike}
    />
  </div>;
}

const BookmarkIcon = (props: { localPost: IPost, onClick: () => Promise<void> }) => {
  return <div>
    <Icon
      icon={props.localPost.hasUserSaved ? "mdi:bookmark" : "mdi:bookmark-outline"}
      className={"cursor-pointer"}
      fontSize={30}
      onClick={props.onClick}
    />
  </div>;
}

const FeedPostUserMeta = (props: { id: string, localPost: IPost }) => {
  return <span className={"flex gap-1 items-center"}>
        <Link to={props.id === props.localPost.userId ? "/mypage" : `/user/${props.localPost.userId}`}>
          <img src={props.localPost?.userImageLink ?? defaultUserImg} loading={"lazy"} alt={"profile"}
               className={"w-[40px] h-[40px] rounded-full"} />
        </Link>
        <span className={"text-white"}>{props.localPost.username}</span>
      </span>;
}

const FeedPost = ({ post }: FeedPostPropType, ref: any): JSX.Element => {

  const { profileInfo: { id } } = useContext(ThemeContext)

  const [localPost, setLocalPost] = useState<IPost>(post);

  const [isCommentFormShown, setIsCommentFormShown] = useState<boolean>(false)

  const animation = useAnimation();

  const putLike = async () => {
    try {
      await axios.put(`/api/v1/like/${post.id}`)
      setLocalPost(prevState => ({...prevState, likeCount: prevState.likeCount + 1, hasUserLike: true}))
      animation.start({ opacity: 1, animationDuration: "1.5" }, { opacity: 0, animationDuration: "1.5" });
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLike = async () => {
    try {
      await axios.delete(`/api/v1/like/${post.id}`)
      setLocalPost(prevState => ({...prevState, likeCount: prevState.likeCount - 1, hasUserLike: false}))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDoubleClickLike = async () => {
    if (localPost.hasUserLike) await deleteLike();
    else await putLike();
  }

  const handleFormShow = () => {
    setIsCommentFormShown(!isCommentFormShown)
  }

  const handleBookmark = async () => {
    if (localPost.hasUserSaved) await deleteBookmark();
    else await putBookmark();
  }

  const deleteBookmark = async () => {
    try {
      await axios.delete(`/api/v1/post/bookmark/${post.id}`)
      setLocalPost(prevState => ({...prevState, hasUserSaved: false }))
    } catch (error) {
      console.log(error)
    }
  }

  const putBookmark = async () => {
    try {
      await axios.post(`/api/v1/post/bookmark/${post.id}`)
      setLocalPost(prevState => ({...prevState, hasUserSaved: true }))
    } catch (error) {
      console.log(error)
    }
  }
  //TODO: probably props assignment is not appropriate
  const handleCommentFormSubmit: SubmitHandler<CommentFormDefaultValuesType>
    = async ( data: CommentFormDefaultValuesType, _ ): Promise<void> => {
    try {
      const body = { postId: post.id, message: data.message }
      await axios.post('/api/v1/comment', body)
      setLocalPost(prevState => ({...prevState, commentCount: prevState.commentCount + 1}))
      setIsCommentFormShown(false)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    setLocalPost(post)
  }, [post.id])



  return (
    <div className='flex flex-col gap-[1rem] relative' ref={ref}>
      <FeedPostUserMeta id={id} localPost={localPost} />
      <div className='relative h-full w-full cursor-pointer' onDoubleClick={handleDoubleClickLike}>
        {post.hasVideo ? (
          <FeedPostVideo src={post.mediaUrl} />
        ) : (
          <FeedPostImage src={post.mediaUrl} />
        )}
      </div>
      <div className={'flex gap-1 text-white justify-between'}>
        <div className={'flex gap-1'}>
          <LikeCount localPost={localPost} deleteLike={deleteLike} putLike={putLike} />
          <CommentCount localPost={localPost} onClick={handleFormShow} />
        </div>
        <BookmarkIcon localPost={localPost} onClick={handleBookmark} />
      </div>
      <div className={'text-white'}>
        {localPost.message}
      </div>
      <AnimatePresence>
        {isCommentFormShown ? (
          <AnimatedCommentForm
            onSubmit={handleCommentFormSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>
      <CommentSection postId={post.id} />
    </div>
  )
}

export default React.forwardRef(FeedPost)
