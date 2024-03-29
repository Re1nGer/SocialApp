import { AnimatePresence } from 'framer-motion'
import IComment from "../../types/IComment";
import AnimatedComment from "../profile/AnimatedComment";
import { useEffect, useState } from "react";
import { axios } from "../../axios";
import { motion } from "framer-motion";
import CircleLoader from "../loader/CircleLoader";

type CommentSectionPropType = {
  postId: string
}
const Comments = ({ postId }: CommentSectionPropType): JSX.Element => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [comments, setComments] = useState<IComment[]>([])

  const fetchComments = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IComment[]>(`/api/v1/comment/${postId}`)
      setComments(data)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchComments()
  }, [])

  if (isLoading) {
    return <CircleLoader />
  }

  if (comments.length === 0) {
    return <h5 className={'text-white'}>No Comments Yet</h5>
  }

  return (
    <motion.div layout>
      {comments.map((item) => (
        <AnimatePresence key={item.id}>
          <AnimatedComment
            {...item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
      ))}
    </motion.div>
  )
}
export default Comments