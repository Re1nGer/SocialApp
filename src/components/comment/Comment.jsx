import { useState } from "react";
import React from 'react';
import "./Comment.css";

const Comment = React.forwardRef(({ postedBy, content, datePosted }, ref) => {

    const [isAnswerInputFieldOpen, setIsAnswerInputFieldOpen] = useState(false);

    return (
            <div className="comment" ref={ref}>
                <div className="comment__by">{postedBy}</div>
                <div className="comment__content">{content}</div>
                <div className="comment__time">{datePosted}</div>
                <div className="comment__answer" onClick={() => setIsAnswerInputFieldOpen(prevState => !prevState)}>
                    { isAnswerInputFieldOpen ? "Close" : "Answer" }
                </div>
                { isAnswerInputFieldOpen ? <div className="comment__input-wrapper">
                    <input className="comment__input-field" type={'text'} placeholder={'Type in post answer'} />
                </div> : null }
            </div>
    );
});

export default Comment; 