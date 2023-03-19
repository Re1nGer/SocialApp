import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import "./Comment.css";

export type CommentFormDefaultValuesType = {
    message: string
}

export type CommentFormPropType = {
    onSubmit: SubmitHandler<CommentFormDefaultValuesType>
}

type Ref = HTMLFormElement

const CommentForm = React.forwardRef<Ref, CommentFormPropType>(({ onSubmit }, ref) => {

    const { handleSubmit, register } = useForm<CommentFormDefaultValuesType>();


    return (
        <form className="comment__form" ref={ref} onSubmit={handleSubmit(onSubmit)}>
            <textarea className="comment__form-input" {...register("message")} placeholder={'Type In Comment'} />
            <button type='submit'>Submit</button>
        </form>
    );
});

export default CommentForm;