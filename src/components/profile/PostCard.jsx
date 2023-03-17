import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const toImcSrc = (base64Str) => `data:image/jpeg;base64,${base64Str}`;

const Post = React.forwardRef(({id, imgSrc, likes, comments }, ref) => {

    const navigate = useNavigate();

    //for now imgSrc can be transferred from state prop
    const handleNavigateClick = () => {
        navigate(`/post/${id}`);
    }

    return (
        <div className='post__card' onClick={handleNavigateClick} ref={ref}>
            <img className='post__card-image' src={toImcSrc(imgSrc)} alt='post' loading='lazy' />
            <div className='post__card-overlay'>
                <div className='post__card-likes'>
                    <div className='post__card-like'>
                        {likes || 1245}
                        <Icon fontSize={20} icon="mdi:cards-heart-outline" />
                    </div>
                    <div className='post__card-comment'>
                        {comments || 124}
                        <Icon fontSize={20} icon="uil:comment" />
                    </div>
                </div>
            </div>
        </div>
    );
});
export default Post;