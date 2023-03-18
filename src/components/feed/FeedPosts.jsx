import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { axios } from "../../axios";
import CircleLoader from "../loader/CircleLoader";
import { FeedPost } from "./FeedPost";

const api_key = import.meta.env.VITE_NEWS_API_KEY;

export const FeedPosts = () => {

    const lastPost = useRef(null);

    const [pageSize, setPageSize] = useState(10);

    const [isLoading, setIsLoading] = useState(true);

    const [news, setNews] = useState([]);

    const isInView = useInView(lastPost, { amount: "some" });

    const fetchLatestNews = async (pageSize) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=science&page_size=${pageSize}`, {
                headers: {
                    'x-api-key': api_key
                }
            });
            setNews(data.articles);
            setPageSize(pageSize + 10);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLatestNews(pageSize);
    }, [isInView]);

    return <>
        {news.map(item => (
            <AnimatePresence>
                <AnimatedFeedPost initial={{opacity: 0}} animate={{opacity: 1}} key={item.id} {...item} />
            </AnimatePresence>
        ))}
        {isLoading ? (<CircleLoader />) : null}
        <div ref={lastPost}></div>
    </>;
};

const AnimatedFeedPost = motion(FeedPost);
