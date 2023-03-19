//ZePi1vVYVEyv0OkkGQB6YLIQBcgIEU2Bwis3StFidWk
import "./Feed.css";
import { Icon } from "@iconify/react";


export type FeedPostPropType = {
    id: number,
    title: string,
    pub_date: string,
    description: string,
    image_url: string | null,
    link: string
};

export const FeedPost = ({ title, pub_date, description, image_url, link }: FeedPostPropType) => {

    return (
        <div className="feed__post">
            { image_url ? (
                <div className="feed__post-img">
                    <img src={image_url} alt={'post'} />
                </div>
            ) : null }
            <div className="feed__post-content">
                <div className="feed__post-title_container">
                    <div className="feed__post-title_author">
                        { title }
{/*                         { twitter_account ? (
                            <a href={link}>{twitter_account}</a>
                        ) : null } */}
                    </div>
                    <div></div>
                    <div className="feed__post-title_time">
                        { pub_date }
                    </div>
                </div>
                <div className="feed__post-summary">
                    {description}
                </div>
                <div className="feed__input-options">
                    <div className="feed__input--photo">
                        <button className="feed__input-btn">
                            <Icon icon="gg:image" fontSize={20} />
                            Photo
                        </button>
                    </div>
                    <div className="feed__input--video">
                        <button className="feed__input-btn">
                            <Icon icon="ic:twotone-slow-motion-video" fontSize={20} />
                            Video
                        </button>
                    </div>
                    <div className="feed__input--thread">
                        <button className="feed__input-btn">
                            <Icon icon="ic:twotone-slow-motion-video" fontSize={20} />
                            Thread
                        </button>
                    </div>
                    <div className="feed__input--schedule">
                        <button className="feed__input-btn">
                            <Icon icon="fa6-solid:calendar-days" fontSize={20} />
                            Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default FeedPost;