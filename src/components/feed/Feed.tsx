import './Feed.scss'
import React from 'react'
import { AnimatePresence } from 'framer-motion'
import axios, { AxiosError } from 'axios'
import { FeedMain } from './FeedMain'
import { FeedTrends } from './FeedTrends'
import { FeedProfile } from './FeedProfile'
import { FeedFollow } from './FeedFollow'
import { axios as call } from '../../axios'
import { FeedPostModalFormValues } from './FeedPostModalFormValues'
import AnimatedPostForm from "./AnimatedPostForm";

const Feed = (): JSX.Element => {
  const [isPostFormOpen, setIsPostFormOpen] = React.useState<boolean>(false)

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [error, setError] = React.useState<AxiosError | null>(null)

  const handleClose = () => {
    setIsPostFormOpen(false)
  }

  const handleOpen = () => {
    setIsPostFormOpen(true)
  }

  //TODO: Can potentially extract this out into PostForm
  const handleSubmit = async (data: FeedPostModalFormValues, event: any) => {
    if (!event.target[1].files[0]) return
    event.preventDefault()
    const { htmlContent } = data || {}
    const image = event.target[1].files[0]
    try {
      setIsLoading(true)
      const form = new FormData()
      form.append('htmlContent', htmlContent)
      form.append('image', image)
      await call.post('/api/v1/post', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setIsPostFormOpen(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error)
      }
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

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
            handleSubmitForm={handleSubmit}
            isLoading={isLoading}
          />
        ) : null}
      </AnimatePresence>

      <div className='feed'>
        <div className='xl:justify-center flex justify-center'>
          <div className='hidden xl:block'>
            <FeedProfile />
            <br />
            <br />
            <FeedFollow />
          </div>
          <div className='flex justify-center xl:w-full'>
            <FeedMain onClick={handleOpen} />
          </div>
          <div className='hidden xl:block feed__right'>
            <FeedTrends />
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed
