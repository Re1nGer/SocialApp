import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import "./Profile.css";
import Post from './PostCard';
import { axios } from '../../axios';
import { AnimatedPostInView } from './AnimatedPostInView';
import CircleLoader from '../loader/CircleLoader';

type PostType = {
    id: number,
    imgSrc: string,
    likeCount: number,
    commentCount: number
}

const Posts = (): JSX.Element => {

    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProfilePosts = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<PostType[]>('/api/v1/post/list');
            setPosts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchProfilePosts();
    },[]);

    return (
        <div className='posts__container'>
            <div className='posts__divider' />
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
                { isLoading ? <CircleLoader /> : null }
                { posts.map(post => (
                    <AnimatedPostInView key={post.id}>
                        <Post {...post}  />
                    </AnimatedPostInView>
                )) }
            </div>
            { posts.length > 10 ? (
                <div className='posts__load-more'>
                    Load More
                </div>
            ) : null }
        </div>
    );
}


export default Posts;