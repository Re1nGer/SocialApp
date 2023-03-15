import "./Feed.css";
import React from 'react';
import { FeedMain } from "./FeedMain";
import { FeedTrends } from "./FeedTrends";
import { FeedProfile } from "./FeedProfile";
import { FeedFollow } from "./FeedFollow";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";

const Feed = () => {

    const [isPostFormOpen, setIsPostFormOpen] = React.useState(false);

    const handleClose = () => {
        setIsPostFormOpen(false);
    }

    const handleOpen = () => {
        setIsPostFormOpen(true);
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

export const FeedPostFormModal = React.forwardRef(({ handleClose }, ref) => {

    return (
        <>
            <div className="feed__post-form_overlay"></div>
            <section className="feed__post-form" ref={ref}>
                <div className="feed__post-form_title-container">
                    <div className="feed__post-form_title">Create Post</div>
                    <Icon className="feed__post-form_title-icon" icon="material-symbols:close" onClick={handleClose} />
                </div>
                <div className="feed__post-form_input-container">
                    <textarea className="feed__post-form_input" placeholder="what's on your mind ?" />
                </div>
                <label for="feed__post-image" className="feed__post-image">Add an Image:</label>
                <div className="feed__post-drag-drop">
                    <input type="file" className="feed__post-image_input" id="feed__post-image" name="post-image" accept="image/*" multiple />
                    <p>Drag and drop your files here</p>
                    <div class="overlay"></div>
                </div>
                <button className="feed__post-form_upload-btn">Upload from computer</button>
                <button className="feed__post-form_btn">Submit Post</button>
            </section>
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