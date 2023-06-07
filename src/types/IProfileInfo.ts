import IPost from "./IPost"

interface IProfileInfo {
  username: string
  userImageSrc: string | undefined
  lowResImageLink: string
  highResImageLink: string
  profileBackgroundImagelink: string
  userPosts: IPost[]
}

export default IProfileInfo