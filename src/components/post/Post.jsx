import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from '@iconify/react';
import Comment from "../comment/Comment";
import { axios } from '../../axios'
import "./Post.css";

/*Post json format
    {
        id: 'someGuid',
        likes: 456,

        comments: [
            id: 1, 
            text: 'Some Comment',
            userId: "userId",
            username: 'someusername',
            datePosted: new Date()
        ]
    }
*/


const toImgSrc = (base64Str) => `data:image/jpeg;base64,${base64Str}`;

const Post = () => {

    const [isError, setIsError] = useState();

    const [likeCount, setLikeCount] = useState(0);

    const [isCommentShown, setIsCommentShown] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    const [post, setPost] = useState(null);

    const handleShowCommentSection = () => {
        setIsCommentShown(prevState => !prevState);
    }

    const fetchPostData = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`/${id}`);
            setPost(data);
            setLikeCount(data.likeCount);
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const putLikeToPost = async (e) => {
        try {
            await axios.put(`/api/like/${id}`);
            setLikeCount(prevState => prevState + 1);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id)
            fetchPostData();
    }, [id]);


    if (isError) {
        return (
            <h1>Error Fetching Post Data</h1>
        )
    }

    if (isLoading) {
        return (
            <h1>Loading ....</h1>
        )
    }

    return (
        <div className="post">
            <div className="post__inner">
                <div className="post__location">
                    <Icon fontSize={20} icon="material-symbols:location-on" />
                    San Francisko
                </div>
                <div className="post__img-container">
                    <img className="post__img" src={toImgSrc(post?.imgSrc)} alt={'post'} loading={'lazy'} />
                </div>
                <div className="post__info">
                    <div className="post__likes">
                        <Icon className="post__likes-icon" fontSize={20} icon="mdi:cards-heart-outline" onClick={putLikeToPost} />
                        { likeCount }
                    </div>
                    <div className="post__comments">
                        <Icon className="post__comments-icon" fontSize={20} icon="uil:comment" />
                        42
                    </div>
                    <div className="post__share">
                        <Icon className="post__share-icon" icon="ph:share-fat-thin" fontSize={20} />
                    </div>
                </div>
                <div className="post__description">
                    { post?.htmlContent }
                </div>
                <div className="post__comments-preview" onClick={handleShowCommentSection}>
                    { isCommentShown ? "Close Comments" : "View Comments" }
                </div>
                { isCommentShown ? <CommentSection postId={id} /> : null }
            </div>
        </div>
    );
}

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
            const { data } = await axios.get(`/api/post/`);
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
        return <h1>Loading component</h1>
    }

    return (
        <>
            { dummyComments.map(item => <Comment key={item.id} {...item} />) }
        </>
    )

}

export default Post;