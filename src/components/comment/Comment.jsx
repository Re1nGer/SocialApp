import { useState } from "react";
import React from 'react';
import "./Comment.css";
import dayjs from "dayjs";

const Comment = React.forwardRef(({ postedBy, message, dateCreated }, ref) => {

    const [isAnswerInputFieldOpen, setIsAnswerInputFieldOpen] = useState(false);

    return (
            <div className="comment" ref={ref}>
                <div className="comment__by">{'Unknown'}</div>
                <div className="comment__content">{message}</div>
                <div className="comment__time">{dayjs(dateCreated).format('YYYY.MM.DD')}</div>
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