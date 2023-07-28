import './Feed.scss'
import React, { useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import FeedMain from './FeedMain'
import { FeedTrends } from './FeedTrends'
import { FeedProfile } from './FeedProfile'
import { FeedFollow } from './FeedFollow'
import AnimatedPostForm from "./AnimatedPostForm";

const Feed = (): JSX.Element => {

  const [isPostFormOpen, setIsPostFormOpen] = React.useState<boolean>(false)

  const handleClose = () => {
    setIsPostFormOpen(false);
  }

  const handleOpen = () => {
    setIsPostFormOpen(true);
  }

  //necessary to work smoothly on mobile devices
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth'  });
  }, [])

  return (
    <>
      <AnimatePresence>
        {isPostFormOpen ? (
          <AnimatedPostForm
            key='post-modal'
            exit={{ opacity: 0, scale: 0.5 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            handleClose={handleClose}
            setIsFormOpen={setIsPostFormOpen}
          />
        ) : null}
      </AnimatePresence>

      <motion.div initial={{opacity: 0}} animate={{ opacity: 1 }} className='feed'>
        <div className='xl:justify-center justify-center xl:flex'>
          <div className='hidden xl:flex flex-col gap-5'>
            <FeedProfile />
            <FeedFollow />
          </div>
          <div className='flex justify-center xl:w-full'>
            <FeedMain onClick={handleOpen} />
          </div>
          <div className='hidden xl:block feed__right'>
            <FeedTrends />
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Feed
