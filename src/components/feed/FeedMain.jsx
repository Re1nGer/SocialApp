import ProfileImage from '../../assets/profileImage.jpg';
import { Icon } from '@iconify/react';
import { FeedPost } from "./Feed";

export const FeedMain = ({ onClick }) => {

    return (
        <>
            <div className="feed__main">
                <div className="feed__input-container">
                    <img className="feed__input-img" src={ProfileImage} alt="profile" />
                    <div className="feed__input-form_container">
                        <input className="feed__input-input" placeholder="What's happening" onClick={onClick} />
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
                <FeedPost />
            </div>
        </>
    );
};