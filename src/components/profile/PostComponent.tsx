import IPost from "../../types/IPost";
import { Icon } from "@iconify/react";

type PostComponentPropsType = {
  post: IPost,
  isLiked: boolean,
  deleteLike: () => Promise<void>,
  putLike: () => Promise<void>,
  handleShowComment: () => void
}

const PostComponent = ({
                         post,
                         isLiked,
                         deleteLike,
                         putLike,
                         handleShowComment
                       } : PostComponentPropsType):JSX.Element => {

  return <>
    <div className='post__location'>
      <Icon fontSize={20} icon='material-symbols:location-on' />
      San Francisko
    </div>
    <div className='post__img-container'>
      <img className='post__img' src={post.mediaUrl} alt='post' loading='lazy' />
    </div>
    <div className='post__info'>
      <div className='post__likes'>
        {isLiked ? (
          <Icon
            icon='mdi:cards-heart'
            className='post__likes-icon'
            fontSize={20}
            onClick={deleteLike}
          />
        ) : (
          <Icon
            className='post__likes-icon'
            fontSize={20}
            icon='mdi:cards-heart-outline'
            onClick={putLike}
          />
        )}
        {post.likeCount}
      </div>
      <div className='post__comments'>
        <Icon
          className='post__comments-icon'
          fontSize={20}
          icon='uil:comment'
          onClick={handleShowComment}
        />
        {post.commentCount}
      </div>
      <div className='post__share'>
        <Icon className='post__share-icon' icon='ph:share-fat-thin' fontSize={20} />
      </div>
    </div>
    <div className='post__description'>{post.message}</div>
  </>
}

export default PostComponent
