import React from 'react';
import { Icon } from '@iconify/react';
import "./Profile.css";
import PostImage from '../../assets/post.jpg';

const dummyPosts = [
    {
        id: 1,
        imgSrc: '',
        likes: 150,
        comments: 89
    },
    {
        id: 2,
        imgSrc: '',
        likes: 150,
        comments: 89
    },
    {
        id: 3,
        imgSrc: '',
        likes: 150,
        comments: 89
    }
];

const Posts = () => {

    const renderPosts = () => {
        const posts = [];

        for(let idx = 0; idx < 9; idx++) {
            posts.push(<Post key={idx} />)
        }

        return posts;
    }

    return (
        <div className='posts__container'>
            <div className='posts__divider'></div>
            <div className='posts__tags'>
                <div className='posts__posts'>
                    <Icon fontSize={16} icon="ic:baseline-chat" />
                    Posts
                </div>
                <div className='posts__images'>
                    <Icon fontSize={16} icon="uil:apps" />
                    Images
                </div>
                <div className='posts__saved'>
                    <Icon fontSize={16} icon="material-symbols:bookmark-outline" />
                    Saved
                </div>
            </div>
            <div className='posts__wrapper'>
                {renderPosts()}
            </div>
        </div>
     );
}


const Post = ({ imgSrc }) => {

    return (
        <div className='post'>
            <img className='post__image' src={PostImage} alt='post' />
            <div className='post__overlay'>
                <div className='post__likes'>
                    <div className='post__like'>
                        100
                        <Icon fontSize={20} icon="mdi:cards-heart-outline" />
                    </div>
                    <div className='post__comment'>
                        100
                        <Icon fontSize={20} icon="uil:comment" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts;