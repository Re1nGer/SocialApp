import IPost from "./IPost"
import IUserRequest from "./IUserRequest";

type MyProfileInfoType = {
  id: string,
  username: string,
  lowResImageLink: string
  highResImageLink: string
  profileBackgroundImagelink: string
  userPosts: IPost[],
  userRequests: IUserRequest[],
  postBookmarks: string[],
  intro?: string
}

export default MyProfileInfoType;