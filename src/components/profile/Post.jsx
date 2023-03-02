import React from 'react';
import { Icon } from '@iconify/react';

const Post = ({ imgSrc, likes, comments }) => {

    return (
        <div className='post'>
            <img className='post__image' src={imgSrc} alt='post' />
            <div className='post__overlay'>
                <div className='post__likes'>
                    <div className='post__like'>
                        {likes}
                        <Icon fontSize={20} icon="mdi:cards-heart-outline" />
                    </div>
                    <div className='post__comment'>
                        {comments}
                        <Icon fontSize={20} icon="uil:comment" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Post;
