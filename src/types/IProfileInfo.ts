import IPost from "./IPost"

interface IProfileInfo {
  username: string
  lowResImageLink: string
  highResImageLink: string
  profileBackgroundImagelink: string
  userPosts: IPost[]
}

export default IProfileInfo