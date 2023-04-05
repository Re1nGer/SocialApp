import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { axios } from '../../axios'
import CircleLoader from '../loader/CircleLoader'
import { FeedPost, FeedPostPropType } from './FeedPost'

// const api_key = import.meta.env.VITE_API_KEY;

export function FeedPosts(): JSX.Element {
  const lastPost = useRef(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [news, setNews] = useState<FeedPostPropType[]>([])

  const [nextPageToken, setNextPageToken] = useState<string>('')

  const isInView = useInView(lastPost, { amount: 'some' })

  const fetchLatestNews = async () => {
    try {
      setIsLoading(true)
      // for some weird reason mode property fixes cors issue but it complains in typescript
      const { data } = await axios.get(
        `https://newsdata.io/api/1/news?apikey=pub_1913720dc694a6785104bd3ff53a6d15db5c7&q=science&page=${nextPageToken}`,
        { withCredentials: false },
      )
      setNews((prev) => prev.concat(data.results))
      setNextPageToken(data.nextPage)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLatestNews()
  }, [isInView])

  return (
    <>
      {news.map((item) => (
        <AnimatePresence key={item.id}>
          <AnimatedFeedPost
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={item.id}
            {...item}
          />
        </AnimatePresence>
      ))}
      {isLoading ? <CircleLoader /> : null}
      <div ref={lastPost} />
    </>
  )
}

const AnimatedFeedPost = motion(FeedPost)
