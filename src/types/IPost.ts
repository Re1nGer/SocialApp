import ILike from "./ILike";
import IComment from "./IComment";
import IUser from "./IUser";

interface IPost {
  id: string
  userId: string
  lowResMediaUrl: string
  mediaUrl: string
  createdAt?: Date
  updatedAt?: Date | null
  likeCount: number
  commentCount: number
  message: string
  user?: IUser,
  likes: ILike[],
  hasUserLike?: boolean,
  hasUserSaved?: boolean,
  comments: IComment[],
  username?: string,
  userImageLink?: string,
  dateCreated?: string,
  hasVideo?:boolean
}

export default IPost