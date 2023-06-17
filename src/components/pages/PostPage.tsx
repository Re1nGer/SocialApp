import Post from '../post/Post'
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams()
  return <Post id={id ?? ""} />
}

export default PostPage
