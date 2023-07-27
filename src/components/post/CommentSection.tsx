import { useState } from "react";
import Comments from "./Comments";
import { motion } from "framer-motion";

type CommentSectionPropType = {
  postId: string
}
const CommentSection = ({ postId }: CommentSectionPropType): JSX.Element => {

  const [isCommentShown, setIsCommentShown] = useState<boolean>(false)

  const handleShowCommentSection = () => {
    setIsCommentShown((prevState) => !prevState)
  }

  return <>
    <div className="post__comments-preview" onClick={handleShowCommentSection}>
      {isCommentShown ?
        <p className={'text-[#a3abb3]'}>Close Comments</p>
        : <p className={'text-[#a3abb3]'}>Open Comments</p>
        }
    </div>
    { isCommentShown && <Comments postId={postId} />  }
  </>;
}

export default CommentSection
