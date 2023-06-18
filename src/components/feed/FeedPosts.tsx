import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView } from 'framer-motion'
import { axios as call } from '../../axios'
import CircleLoader from '../loader/CircleLoader'
import IPost from "../../types/IPost";
import AnimatedFeedPost from "./AnimatedFeedPost";
import { ThemeContext } from "../contexts/ThemeContext";

export function FeedPosts(): JSX.Element {

  const lastPost = useRef(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [news, setNews] = useState<IPost[]>([])

  const isInView = useInView(lastPost, { amount: 'some' })

  const { accessToken }  = useContext(ThemeContext)

  const fetchLatestPosts = async () => {
    try {
      setIsLoading(true)
      // for some weird reason mode property fixes cors issue but it complains in typescript
      const { data } = await call.get<IPost[]>("/api/v1/feed")
      setNews(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLatestPosts()
  }, [isInView, accessToken])

  return (
    <>
      {news.map((item) => (
        <AnimatePresence key={item.id}>
          <AnimatedFeedPost
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={item.id}
            post={item}
          />
        </AnimatePresence>
      ))}
      {isLoading ? <CircleLoader /> : null}
      <div ref={lastPost} />
    </>
  )
}
