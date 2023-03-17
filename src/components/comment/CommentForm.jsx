import React from 'react';
import "./Comment.css";

const CommentForm = React.forwardRef(({ onSubmit }, ref) => {

    if (ref)
        ref.current?.focus();

    return (
        <form className="comment__form" ref={ref} onSubmit={onSubmit}>
            <textarea className="comment__form-input" type={'text'} placeholder={'Type In Comment'} />
        </form>
    );
});

export default CommentForm;