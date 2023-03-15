import "./Feed.css";
import React from 'react';
import { FeedMain } from "./FeedMain";
import { FeedTrends } from "./FeedTrends";
import { FeedProfile } from "./FeedProfile";
import { FeedFollow } from "./FeedFollow";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import RichTextEditor from "../newpost/RichTextEditor";
import { axios } from "../../axios";

const Feed = () => {

    const [isPostFormOpen, setIsPostFormOpen] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);

    const [error, setError] = React.useState(null);

    const handleClose = () => {
        setIsPostFormOpen(false);
    }

    const handleOpen = () => {
        setIsPostFormOpen(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        //const htmlContent = event.target[0].value;
/*         try {
            setIsLoading(true);

            const form = new FormData();
            form.append('htmlContent', htmlContent);

            await axios.post("/post", form);
        } catch (error) {
            setError(error);
        } */
    }

    return (
        <>
            <AnimatePresence>
                { isPostFormOpen ? (
                    <AnimatedPostForm
                        key={'post-modal'}
                        exit={{opacity: 0, scale: .5}}
                        initial={{ opacity: 0, scale: .5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                    />
                ) : null }
            </AnimatePresence>

            <div className="feed">
                <div className="feed__inner">
                    <div className="feed__left">
                        <FeedProfile />
                        <br />
                        <br />
                        <FeedFollow />
                    </div>
                    <div className="feed__center">
                        <FeedMain onClick={handleOpen} />
                    </div>
                    <div className="feed__right">
                        <FeedTrends />
                    </div>
                </div>
            </div>
        </>
        );
    }

export const FeedPostFormModal = React.forwardRef(({ handleClose, handleSubmit }, ref) => {

    const [imageSrc, setImageSrc] = React.useState(null);

    const onImageChange = (e) => {
        setImageSrc(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <div className="feed__post-form_overlay" onClick={handleClose}></div>
            <form onSubmit={handleSubmit} className="feed__post-form" ref={ref} onClick={(e) => e.stopPropagation()}>
                <div className="feed__post-form_title-container">
                    <div className="feed__post-form_title">Create Post</div>
                    <Icon className="feed__post-form_title-icon" icon="material-symbols:close" onClick={handleClose} />
                </div>
                <div className="feed__post-form_input-container">
                    <RichTextEditor className={"feed__post-form_input"} />
                </div>
                <label for="feed__post-image" className="feed__post-image">
                    { imageSrc ? 'Added Image' : 'Add an Image:' }
                </label>
                <div className="feed__post-drag-drop">
                    { imageSrc ? (
                        <img className="feed__post-drag" src={imageSrc} alt={'post form'} />
                    ): (
                        <p>Drag and drop your files here</p>
                    ) }
                    <div class="overlay"></div>
                </div>
                <input
                    accept="image/*"
                    style={{display: 'none'}}
                    type={'file'}
                    id={'postfile'}
                    name={'postfile'}
                    onChange={onImageChange}
                />
                { imageSrc ? null : (
                    <label htmlFor="postfile" id="postfilelabel">
                        <span className="feed__post-form_upload-btn">
                            Upload from computer
                        </span>
                    </label>
                ) }
                <button className="feed__post-form_btn">Submit Post</button>
            </form>
        </>
    );
});

const AnimatedPostForm = motion(FeedPostFormModal);


export const FeedPost = () => {

    return (
        <div>
            No Posts at the moment
        </div>
    )
}

export default Feed;