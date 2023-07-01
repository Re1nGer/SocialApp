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
      <button
        type={'submit'}
        className={'outline-0 border text-white rounded-xl p-2 my-2 hover:bg-white transition-colors duration-150 hover:text-black'}>
        Post Comment
      </button>
    </form>
  )
}

export default React.forwardRef(CommentForm)
