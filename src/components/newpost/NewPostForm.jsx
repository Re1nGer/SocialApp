import React from "react";
import RichTextEditor from "./RichTextEditor";
import { motion } from "framer-motion";
import "./NewPostForm.jsx";

const NewPostForm = React.forwardRef(({ onSubmit }, ref) => {

    return (
        <form onSubmit={onSubmit} ref={ref}>
            <div className="post__form">
                <div className="post__form-title">
                    <label htmlFor="title">Title</label>
                    <input name="title" id="title" />
                </div>
                <div className="post__form-image">
                    <input type={'file'} name={'file'} />
                </div>
                <div className="post__form-content">
                    <RichTextEditor />
                </div>
                <div className="post__form-btn">
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </div> 
        </form>
    );
});


export const AnimatedNewPostForm = motion(NewPostForm);

export default NewPostForm;