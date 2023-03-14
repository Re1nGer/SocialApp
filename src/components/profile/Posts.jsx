import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import "./Profile.css";
import PostImage from '../../assets/post.jpg';
import CarPostImage from '../../assets/carPost.jpg';
import HomePostImage from '../../assets/postHome.jpg';
import CafePostImage from '../../assets/cafePost.jpg';
import Post from './PostCard';
import { axios } from '../../axios';
import { motion, useAnimation, useInView } from 'framer-motion';

const dummyPosts = [
    {
        id: 1,
        imgSrc: PostImage,
        likes: 150,
        comments: 89
    },
    {
        id: 2,
        imgSrc: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
        likes: 150,
        comments: 89
    },
    {
        id: 3,
        imgSrc: 'https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
        likes: 150,
        comments: 89
    },
    {
        id: 4,
        imgSrc: 'https://images.unsplash.com/photo-1599506059562-61051e711cdc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        likes: 150,
        comments: 89
    },
    {
        id: 5,
        imgSrc: CafePostImage,
        likes: 150,
        comments: 89
    },
    {
        id: 6,
        imgSrc: 'https://images.unsplash.com/photo-1600706844152-3a29fce003b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
        likes: 150,
        comments: 89
    },
    {
        id: 7,
        imgSrc: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80',
        likes: 150,
        comments: 89
    },
    {
        id: 8,
        imgSrc: HomePostImage,
        likes: 150,
        comments: 89
    },
    {
        id: 9,
        imgSrc: CarPostImage,
        likes: 150,
        comments: 89
    },
    {
        id: 10,
        imgSrc: 'https://images.unsplash.com/photo-1582205524573-ac35c641d947?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
        likes: 150,
        comments: 89
    },
    {
        id: 11,
        imgSrc: 'https://images.unsplash.com/photo-1562103608-104fa5589661?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
        likes: 150,
        comments: 89
    },
    {
        id: 12,
        imgSrc: 'https://images.unsplash.com/photo-1591075005914-6579beba9c51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
        likes: 150,
        comments: 89
    },
];

const Posts = () => {

    const [posts, setPosts] = useState([]);

    //const controls = useAnimation();

    const ref = useRef(null);

    const inView = useInView(ref, { once: true, amount: 'some' });

    const fetchProfilePosts = async () => {
        try {
            const { data } = await axios.get('/list');
            setPosts(data);
        } catch (error) {
            console.log(error);
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
                { dummyPosts.map(post => (
                    <AnimatedPostInView>
                        <Post key={post.id} {...post}  />
                    </AnimatedPostInView>
                )) }
            </div>
            { dummyPosts.length > 10 ? (
                <div className='posts__load-more'>
                    Load More
                </div>
            ) : null }
        </div>
    );
}


//const AnimatedPost = motion(Post);

const AnimatedPostInView = ({ children }) => {

    const ref = useRef(null);

    const inView = useInView(ref, { once: true });

    const controls = useAnimation();

    React.useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, scale: 1 });
        }

    },[inView, controls]);

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            transition={{ duration: 0.5 }}
         >
            { children }
        </motion.section>
    )
}

export default Posts;