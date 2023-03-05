import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const Post = ({id, imgSrc, likes, comments }) => {

    const navigate = useNavigate();

    //for now imgSrc can be transferred from state prop
    const handleNavigateClick = () => {
        navigate(`/post/${id}`, { state: { imgSrc } });
    }

    return (
        <div className='post__card' onClick={handleNavigateClick}>
            <img className='post__card-image' src={imgSrc} alt='post' />
            <div className='post__card-overlay'>
                <div className='post__card-likes'>
                    <div className='post__card-like'>
                        {likes}
                        <Icon fontSize={20} icon="mdi:cards-heart-outline" />
                    </div>
                    <div className='post__card-comment'>
                        {comments}
                        <Icon fontSize={20} icon="uil:comment" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Post;