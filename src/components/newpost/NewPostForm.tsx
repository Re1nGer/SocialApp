import React, { LegacyRef } from 'react'
import { motion } from 'framer-motion'
import './NewPostForm.js'

type NewPostFormPropType = {
  onSubmit: () => void
}

type Ref = LegacyRef<HTMLFormElement> | undefined

const NewPostForm = ({ onSubmit }: NewPostFormPropType, ref: Ref) => (
  <form onSubmit={onSubmit} ref={ref}>
    <div className='post__form'>
      <div className='post__form-title'>
        <label htmlFor='title'>Title</label>
        <input name='title' id='title' />
      </div>
      <div className='post__form-image'>
        <input type='file' name='file' />
      </div>
      <div className='post__form-btn'>
        <button type='submit'>Submit</button>
      </div>
    </div>
  </form>
)

export const AnimatedNewPostForm = motion(NewPostForm)

export default React.forwardRef(NewPostForm)
