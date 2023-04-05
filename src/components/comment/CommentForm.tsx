import React, { LegacyRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import './Comment.css'

export type CommentFormDefaultValuesType = {
  message: string
}

export type CommentFormPropType = {
  onSubmit: SubmitHandler<CommentFormDefaultValuesType>
}

type Ref = LegacyRef<HTMLFormElement> | undefined

const CommentForm = ({ onSubmit }: CommentFormPropType, ref: Ref) => {
  const { handleSubmit, register } = useForm<CommentFormDefaultValuesType>()

  return (
    <form className='comment__form' ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className='comment__form-input'
        {...register('message')}
        placeholder='Type In Comment'
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default React.forwardRef(CommentForm)
