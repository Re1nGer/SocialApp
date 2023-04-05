import ProfileImage from '../../assets/profileImage.jpg'

export function FeedFollow() {
  return (
    <div className='feed__follow'>
      <div className='feed__follow-title'>Who is to follow you</div>

      <div className='feed__follow-card'>
        <img className='feed__follow-card_img' src={ProfileImage} alt='profile' />
        <div className='feed__follow-card_info'>
          <div className='feed__follow-card_info-name'>Product Hunt</div>
          <div className='feed__follow-card_info-username'>@ProductHunt</div>
        </div>
        <button className='feed__follow-card_btn'>Follow</button>
      </div>

      <div className='feed__follow-card'>
        <img className='feed__follow-card_img' src={ProfileImage} alt='profile' />
        <div className='feed__follow-card_info'>
          <div className='feed__follow-card_info-name'>Product Hunt</div>
          <div className='feed__follow-card_info-username'>@ProductHunt</div>
        </div>
        <button className='feed__follow-card_btn'>Follow</button>
      </div>

      <div className='feed__follow-card'>
        <img className='feed__follow-card_img' src={ProfileImage} alt='profile' />
        <div className='feed__follow-card_info'>
          <div className='feed__follow-card_info-name'>Product Hunt</div>
          <div className='feed__follow-card_info-username'>@ProductHunt</div>
        </div>
        <button className='feed__follow-card_btn'>Follow</button>
      </div>

      <div className='feed__follow-more'>Show More</div>
    </div>
  )
}
