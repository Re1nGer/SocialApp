import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from '@iconify/react';
import Comment from "../comment/Comment";
import { axios } from '../../axios'
import "./Post.css";
import CircleLoader from "../loader/CircleLoader";
import { AnimatePresence, motion } from "framer-motion";
import CommentForm from "../comment/CommentForm";

const Post = () => {

    const [isError, setIsError] = useState();

    const [likeCount, setLikeCount] = useState(0);

    const [like, setLike] = useState(false);

    const [lowResImage, setLowResImage] = useState(null);

    const [highResImage, setHighResImage] = useState(null);

    const [isHighQualityImageLoading, setIsHighQualityImageLoading] = useState(false);

    const [isCommentShown, setIsCommentShown] = useState(false);

    const [isCommentFormShown, setIsCommentFormShown] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    const [post, setPost] = useState(null);

    const handleShowCommentForm = () => {
        setIsCommentFormShown(true);
    }

    const handleShowCommentSection = () => {
        setIsCommentShown(prevState => !prevState);
    }

    const fetchPostData = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`/api/v1/post/${id}`);
            setPost(data);
            setLikeCount(data.likeCount);
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchLowResImage = async () => {
        try {
            const { data } = await axios.get(`/api/v1/post/lowres/${id}`);
            setLowResImage(data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchHighResImage = async () => {
        try {
            setIsHighQualityImageLoading(true);
            const { data } = await axios.get(`/api/v1/post/highres/${id}`);
            setHighResImage(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsHighQualityImageLoading(false);
        }
    }

    const hasLike = async () => {
        try {
            const { data } = await axios.get(`/api/v1/like/${id}`);
            setLike(data);
        } catch (error) {
            console.log(error);
        }
    }

    const putLikeToPost = async (e) => {
        try {
            await axios.put(`/api/v1/like/${id}`);
            setLikeCount(prevState => prevState + 1);
            setLike(true);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteLike = async () => {
        try {
            await axios.delete(`/api/v1/like/${id}`);
            setLike(false);
            setLikeCount(prevState => prevState - 1);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCommentFormSubmit = async (data, event) => {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id) {
            fetchLowResImage();
            fetchPostData();
            hasLike();
            fetchHighResImage();
        }
    }, [id]);


    if (isError) {
        return (
            <h1>Error Fetching Post Data</h1>
        );
    }

    if (isLoading) {
        return (
            <CircleLoader />
        );
    }

    return (
        <div className="post">
            <div className="post__inner">
                <div className="post__location">
                    <Icon fontSize={20} icon="material-symbols:location-on" />
                    San Francisko
                </div>
                <div className="post__img-container">
                    { isHighQualityImageLoading ? (
                        <BlurredImage src={lowResImage}  />
                    ) : (
                        <img className="post__img" src={highResImage} alt={'post'} loading={'lazy'} />
                    ) }
                </div>
                <div className="post__info">
                    <div className="post__likes">
                        { like ? (
                            <Icon icon="mdi:cards-heart" className="post__likes-icon" fontSize={20} onClick={deleteLike} />
                        ) : (
                            <Icon className="post__likes-icon" fontSize={20} icon="mdi:cards-heart-outline" onClick={putLikeToPost} />
                        ) }
                        { likeCount }
                    </div>
                    <div className="post__comments">
                        <Icon className="post__comments-icon" fontSize={20} icon="uil:comment" onClick={handleShowCommentForm} />
                        { post?.commentCount }
                    </div>
                    <div className="post__share">
                        <Icon className="post__share-icon" icon="ph:share-fat-thin" fontSize={20} />
                    </div>
                </div>
                <div className="post__description">
                    { post?.htmlContent }
                </div>
                { isCommentFormShown ? (
                    <AnimatedCommentForm onSubmit={handleCommentFormSubmit} initial={{opacity: 0}} animate={{opacity: 1}} />
                ) : null }
                <div className="post__comments-preview" onClick={handleShowCommentSection}>
                    { isCommentShown ? "Close Comments" : "View Comments" }
                </div>
                { isCommentShown ? <CommentSection postId={id} /> : null }
            </div>
        </div>
    );
}


const BlurredImage = ({ src, alt }) => {
    return <img className="post__img" src={src} alt={alt} /> //style={{ filter: 'blur(10px)' }} />
}

const AnimatedCommentForm = motion(CommentForm);

const dummyComments = [
    {
        id: 1,
        datePosted: new Date().toLocaleDateString(),
        content: "Some Gibberish  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, officiis!Some Gibberish  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, officiis!",
        postedBy: "Some Random User" ,
        userId: "1"
    },
    {
        id: 2,
        datePosted: new Date().toLocaleDateString(),
        content: "Some Gibberish",
        postedBy: "Some Random User",
        userId: "2"
    },
    {
        id: 3,
        datePosted: new Date().toLocaleDateString(),
        content: "Some Gibberish",
        postedBy: "Some Random User",
        userId: "3"
    },
];

const CommentSection = ({ postId }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [isError, setIsError] = useState(false);

    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            isLoading(true);
            const { data } = await axios.get(`/api/v1/comment/${postId}`);
            setComments(data);
        } catch (error) {
            setIsError(true);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        //fetchComments();
    },[postId]);


    if (isError) {
        return <h1>Error fetching comments</h1>
    }

    if (isLoading) {
        return <CircleLoader />
    }

    return (
        <>
            { dummyComments.map(item => ( 
                <AnimatePresence>
                    <AnimatedComment
                            key={item.id}
                            {...item}
                            initial={{opacity : 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        />
                </AnimatePresence>
            )) }
        </>
    )
}

const AnimatedComment = motion(Comment);

export default Post;