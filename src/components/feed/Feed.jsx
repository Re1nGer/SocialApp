import "./Feed.css";
import ProfileImageCap from "../../assets/profileHeaderImage.jpg";
import ProfileImage from '../../assets/profileImage.jpg';
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

const Feed = () => {
    return (
        <div className="feed">
            <div className="feed__inner">
                <div className="feed__left">
                    <FeedProfile />
                    <br />
                    <br />
                    <FeedFollow />
                </div>
                <div className="feed__center">
                    <FeedMain />
                </div>
                <div className="feed__right">
                    <FeedTrends />
                </div>
            </div>
        </div>
     );
}

const FeedProfile = () => {

    return (
        <div className="feed__profile">
            <div className="feed__profile-cap">
                <img className="feed__profile-cap_img" src={ProfileImageCap} alt={'cap'} />
            </div>
            <div className="feed__profile-info">
                <div className="feed__profile-circle">
                    <img className="feed__profile-circle_img" src={ProfileImage} alt="avatar" />
                </div>
                <div className="feed__profile-name">
                    Megan
                </div>
                <div className="feed__profile-username">
                    @megan_cli
                </div>
                <div className="feed__profile-stats">
                    <div className="feed__profile-following">
                        6684
                        <br />
                        Following
                    </div>
                    <div className="feed__profile-divider"></div>
                    <div className="feed__profile-followers">
                        9991
                        <br />
                        Followers
                    </div>
                </div>
                <div className="feed__profile-link">
                    <Link to={'/mypage'}>My Profile</Link>
                </div>
            </div>
        </div>
    )
}


const FeedFollow = () => {

    return (
        <div className="feed__follow">
            <div className="feed__follow-title">
                Who is to follow you
            </div>

            <div className="feed__follow-card">
                <img className="feed__follow-card_img" src={ProfileImage} alt={'profile'} />
                <div className="feed__follow-card_info">
                    <div className="feed__follow-card_info-name">Product Hunt</div>
                    <div className="feed__follow-card_info-username">@ProductHunt</div>
                </div>
                <button className="feed__follow-card_btn">Follow</button>
            </div>

            <div className="feed__follow-card">
                <img className="feed__follow-card_img" src={ProfileImage} alt={'profile'} />
                <div className="feed__follow-card_info">
                    <div className="feed__follow-card_info-name">Product Hunt</div>
                    <div className="feed__follow-card_info-username">@ProductHunt</div>
                </div>
                <button className="feed__follow-card_btn">Follow</button>
            </div>

            <div className="feed__follow-card">
                <img className="feed__follow-card_img" src={ProfileImage} alt={'profile'} />
                <div className="feed__follow-card_info">
                    <div className="feed__follow-card_info-name">Product Hunt</div>
                    <div className="feed__follow-card_info-username">@ProductHunt</div>
                </div>
                <button className="feed__follow-card_btn">Follow</button>
            </div>

            <div className="feed__follow-more">
                Show More
            </div>

        </div>
    )
}

const FeedMain = () => {


    return (
        <div className="feed__main">
            <div className="feed__input-container">
                <img className="feed__input-img" src={ProfileImage} alt="profile" />
                <div className="feed__input-form_container">
                    <input className="feed__input-input" placeholder="What's happening" />
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
        </div>
    )

}


const FeedPost = () => {

}

const FeedTrends = () => {

}


export default Feed;