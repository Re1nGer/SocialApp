import { useState } from "react";
import Comments from "./Comments";

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
      {isCommentShown ? "Close Comments" : "View Comments"}
    </div>
    { isCommentShown && <Comments postId={postId} />  }
  </>;
}

export default CommentSection
