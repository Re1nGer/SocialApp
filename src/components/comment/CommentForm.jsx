import React from 'react';
import { useForm } from 'react-hook-form';
import "./Comment.css";

const CommentForm = React.forwardRef(({ onSubmit }, ref) => {

    const { handleSubmit, register } = useForm();

    if (ref)
        ref.current?.focus();

    return (
        <form className="comment__form" ref={ref} onSubmit={handleSubmit(onSubmit)}>
            <textarea className="comment__form-input" type={'text'} {...register("message")} placeholder={'Type In Comment'} />
            <button type='submit'>Submit</button>
        </form>
    );
});

export default CommentForm;