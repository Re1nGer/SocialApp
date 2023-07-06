import { MouseEventHandler } from "react";
import { FeedPosts } from "./FeedPosts";
import { FeedMainInput } from "./FeedMainInput";

type FeedMainProp = {
  onClick: MouseEventHandler
}

const FeedMain = ({ onClick }: FeedMainProp): JSX.Element => {

  return (
    <div className='feed__main px-2'>
      <FeedMainInput onClick={onClick} />
      <FeedPosts />
    </div>
  )
}

export default FeedMain;
