import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import Comment from "../comment/Comment";
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

const Post = ({ imgSrc, id }) => {

    const [isError, setIsError] = useState();

    const [isCommentShown, setIsCommentShown] = useState(false);

    const [post, setPost] = useState(null);

    const { state } = useLocation();

    const handleShowCommentSection = () => {
        setIsCommentShown(prevState => !prevState);
    }

    const fetchPostData = async () => {
        try {
            const request = await fetch(`/api/posts/${id}`);
            setPost(request.json());
        } catch (error) {
            console.log(error);
            setIsError(true);
        }
    }

    useEffect(() => {
        //fetchPostData();
    },[])


    if (isError) {
        return (
            <h1>Error Fetching Post Data</h1>
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
                    <img className="post__img" src={state?.imgSrc} alt={'post'} />
                </div>
                <div className="post__info">
                    <div className="post__likes">
                        <Icon fontSize={20} icon="mdi:cards-heart-outline" />
                        150
                    </div>
                    <div className="post__comments">
                        <Icon className="post__comments-icon" fontSize={20} icon="uil:comment" />
                        42
                    </div>
                </div>
                <div className="post__description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ducimus dolor nulla incidunt optio, repellat et neque velit, similique tenetur reiciendis pariatur consectetur. Esse consequuntur vitae rerum commodi laborum odio ratione dicta illum id, expedita iure repellat minus illo modi magni aliquam aut aperiam accusamus ducimus ex possimus. Eum praesentium minima soluta. Cumque in ad beatae nesciunt placeat illum excepturi ex consectetur suscipit, ipsa culpa dolor quos explicabo delectus dolore rem ducimus. Tempore nostrum iste eum facere itaque quis at ipsum perspiciatis cum deserunt, voluptas voluptate voluptatum temporibus debitis. Tenetur, ea id. Quis, repudiandae officia accusamus enim ex quae nostrum!
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
            const request = await fetch(`/api/post/`);
            setComments(request.json());
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