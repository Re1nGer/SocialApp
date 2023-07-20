import IPost from "./IPost"
import IUserRequest from "./IUserRequest";

type IProfileInfo = {
  id: string,
  username: string,
  lowResImageLink: string
  highResImageLink: string
  profileBackgroundImagelink: string
  userPosts: IPost[],
  userRequests: IUserRequest[],
  postBookmarks: string[],
}

export default IProfileInfo