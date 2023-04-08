import React, { ChangeEvent, LegacyRef } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useForm, SubmitHandler } from 'react-hook-form'

type FeedPostModalType = {
  handleClose: () => void
  handleSubmitForm: SubmitHandler<FeedPostModalFormValues>
}
type Ref = LegacyRef<HTMLFormElement> | undefined
export type FeedPostModalFormValues = {
  htmlContent: string
}

export const FeedPostFormModal = (
  { handleClose, handleSubmitForm }: FeedPostModalType,
  ref: Ref,
) => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null)

  const onImagePreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setImageSrc(URL.createObjectURL(e.target.files[0]))
  }

  const { register, handleSubmit } = useForm<FeedPostModalFormValues>()

  return (
    <>
      <div className='feed__post-form_overlay' onClick={handleClose} />
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className='feed__post-form'
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='feed__post-form_title-container'>
          <div className='feed__post-form_title'>Create Post</div>
          <Icon
            className='feed__post-form_title-icon'
            icon='material-symbols:close'
            onClick={handleClose}
          />
        </div>
        <div className='feed__post-form_input-container'>
          <textarea
            className='feed__post-form_input'
            {...register('htmlContent')}
            placeholder={'What is on your mind ?'}
          />
        </div>
        <label htmlFor='feed__post-image' className='feed__post-image'>
          {imageSrc ? 'Added Image' : 'Add an Image:'}
        </label>
        <div className='feed__post-drag-drop'>
          {imageSrc ? (
            <img className='feed__post-drag' src={imageSrc} alt='post form' />
          ) : (
            <p>Drag and drop your files here</p>
          )}
          <div className='overlay' />
        </div>
        <input
          accept='image/*'
          style={{ display: 'none' }}
          type='file'
          id='postfile'
          name='postfile'
          onChange={onImagePreviewChange}
        />
        {imageSrc ? null : (
          <label htmlFor='postfile' id='postfilelabel'>
            <span className='feed__post-form_upload-btn'>Upload from computer</span>
          </label>
        )}
        <button className='feed__post-form_btn'>Submit Post</button>
      </form>
    </>
  )
}
export const AnimatedPostForm = motion(React.forwardRef(FeedPostFormModal))
