// ZePi1vVYVEyv0OkkGQB6YLIQBcgIEU2Bwis3StFidWk
import './Feed.scss'
import { CommentSection } from '../post/CommentSection'

export type FeedPostPropType = {
  id: number
  title: string
  pub_date: string
  description: string
  image_url: string | null
  link: string
}

export function FeedPost({ id, title, pub_date, description, image_url, link }: FeedPostPropType) {
  return (

    <div className='flex flex-col gap-[1rem]'>
      <img className='max-h-[400px] max-w-[300px]' src={image_url ?? ""} />
      <div>
        {description}
      </div>
      <CommentSection postId={id}  />
    </div>
  )
}

export default FeedPost
