import "./Feed.css";
import React from 'react';
import { FeedMain } from "./FeedMain";
import { FeedTrends } from "./FeedTrends";
import { FeedProfile } from "./FeedProfile";
import { FeedFollow } from "./FeedFollow";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { axios } from "../../axios";
import { useForm } from "react-hook-form";


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

    const handleSubmit = async (data, event) => {
        event.preventDefault();
        const { htmlContent } = data || {}
        const image = event.target[1].files[0];
        try {
            setIsLoading(true);

            const form = new FormData();
            form.append('htmlContent', htmlContent);
            console.log(image);
            form.append('image', image);
            await axios.post("/api/v1/post", form, { headers: {
                "Content-Type": "multipart/form-data",
            } });
            setIsPostFormOpen(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);

        }
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
                        handleSubmitForm={handleSubmit}
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

export const FeedPostFormModal = React.forwardRef(({ handleClose, handleSubmitForm }, ref) => {

    const [imageSrc, setImageSrc] = React.useState(null);

    const onImagePreviewChange = (e) => {
        setImageSrc(URL.createObjectURL(e.target.files[0]));
    }

    const { register, handleSubmit } = useForm();

    return (
        <>
            <div className="feed__post-form_overlay" onClick={handleClose}></div>
            <form onSubmit={handleSubmit(handleSubmitForm)} className="feed__post-form" ref={ref} onClick={(e) => e.stopPropagation()}>
                <div className="feed__post-form_title-container">
                    <div className="feed__post-form_title">Create Post</div>
                    <Icon className="feed__post-form_title-icon" icon="material-symbols:close" onClick={handleClose} />
                </div>
                <div className="feed__post-form_input-container">
                    <textarea className={"feed__post-form_input"} {...register('htmlContent')} placeholder={"What's on your mind ?"}  />
                </div>
                <label htmlFor="feed__post-image" className="feed__post-image">
                    { imageSrc ? 'Added Image' : 'Add an Image:' }
                </label>
                <div className="feed__post-drag-drop">
                    { imageSrc ? (
                        <img className="feed__post-drag" src={imageSrc} alt={'post form'} />
                    ) : (
                        <p>Drag and drop your files here</p>
                    ) }
                    <div className="overlay"></div>
                </div>
                <input
                    accept="image/*"
                    style={{display: 'none'}}
                    type={'file'}
                    id={'postfile'}
                    name={'postfile'}
                    onChange={onImagePreviewChange}
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