import { useEffect, useState } from "react";
import Comment from "../comment/Comment";
import { axios } from '../../axios';
import CircleLoader from "../loader/CircleLoader";
import { AnimatePresence, motion } from "framer-motion";

type CommentSectionPropType = {
    postId: number;
};
type CommentType = {
    id: number;
    username: string;
    dateCreated: string;
    message: string;
    postId: number;
    userId: number;
};
export const CommentSection = ({ postId }: CommentSectionPropType): JSX.Element => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);

    const [comments, setComments] = useState<CommentType[]>([]);

    const fetchComments = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<CommentType[]>(`/api/v1/comment/${postId}`);
            setComments(data);
        } catch (error) {
            setIsError(true);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    if (isError) {
        return <h1 style={{ color: "#fff" }}>Error fetching comments</h1>;
    }

    if (isLoading) {
        return <CircleLoader />;
    }

    if (comments.length === 0) {
        return (
            <h5 style={{ color: "#fff" }}>No Comments Yet</h5>
        );
    }

    return (
        <>
            {comments.map(item => (
                <AnimatePresence>
                    <AnimatedComment
                        key={item.id}
                        {...item}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} />
                </AnimatePresence>
            ))}
        </>
    );
};
const AnimatedComment = motion(Comment);
