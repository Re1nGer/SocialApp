import IPost from "./IPost"
import IUserRequest from "./IUserRequest";

interface IProfileInfo {
  username: string
  lowResImageLink: string
  highResImageLink: string
  profileBackgroundImagelink: string
  userPosts: IPost[],
  userRequests: IUserRequest[]
}

export default IProfileInfo