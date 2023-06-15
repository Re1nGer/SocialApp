interface IPost {
  id: string
  userId?: string
  lowResMediaUrl: string
  mediaUrl: string
  createdAt?: Date
  updatedAt?: Date | null
  likeCount: number
  commentCount: number
  message: string
}

export default IPost