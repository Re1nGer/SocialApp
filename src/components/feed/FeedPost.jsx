//ZePi1vVYVEyv0OkkGQB6YLIQBcgIEU2Bwis3StFidWk
import "./Feed.css";
import { Icon } from "@iconify/react";

export const FeedPost = ({ author, published_date, summary, media, twitter_account, link  }) => {

    return (
        <div className="feed__post">
            <div className="feed__post-img">
                <img src={media} alt={'post'} />
            </div>
            <div className="feed__post-content">
                <div className="feed__post-title_container">
                    <div className="feed__post-title_author">
                        { author }
                        { twitter_account ? (
                            <a href={link}>{twitter_account}</a>
                        ) : null }
                    </div>
                    <div></div>
                    <div className="feed__post-title_time">
                        { published_date }
                    </div>
                </div>
                <div className="feed__post-summary">
                    {summary}
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