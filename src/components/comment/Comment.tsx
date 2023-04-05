import React, { LegacyRef, useState } from 'react'

import './Comment.css'
import dayjs from 'dayjs'

type CommentPropType = {
  username: string
  message: string
  dateCreated: string
}

type Ref = LegacyRef<HTMLDivElement> | undefined

const Comment = ({ username, message, dateCreated }: CommentPropType, ref: Ref) => {
  const [isAnswerInputFieldOpen, setIsAnswerInputFieldOpen] = useState<boolean>(false)

  return (
    <div className='comment' ref={ref}>
      <div className='comment__by'>{username || ''}</div>
      <div className='comment__content'>{message}</div>
      <div className='comment__time'>{dayjs(dateCreated).format('YYYY.MM.DD : hh:mm')}</div>
      <div
        className='comment__answer'
        onClick={() => setIsAnswerInputFieldOpen((prevState) => !prevState)}
      >
        {isAnswerInputFieldOpen ? 'Close' : 'Answer'}
      </div>
      {isAnswerInputFieldOpen ? (
        <div className='comment__input-wrapper'>
          <input className='comment__input-field' type='text' placeholder='Type in post answer' />
        </div>
      ) : null}
    </div>
  )
}

export default React.forwardRef(Comment)
