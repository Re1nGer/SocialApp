import { Icon } from '@iconify/react'

export function FeedTrends(): JSX.Element {
  return (
    <div className='feed__trends'>
      <div className='feed__trends-title'>Trends For you</div>
      <div className='feed__trends-subtitle'>Trending in Sweden</div>
      <div className='feed__trends-hash_block'>
        <div className='feed__trends-title_container'>
          <div className='feed__trends-hash_block-title'>#SWE</div>
          <div className='feed__trends-hash_block-subtitle'>97.7 k Tweets</div>
        </div>
        <div className='feed__trends-hash_block-icon'>
          <Icon icon='ph:dots-three-outline' fontSize={20} />
        </div>
      </div>
      <div className='feed__trends-hash_block'>
        <div className='feed__trends-title_container'>
          <div className='feed__trends-hash_block-title'>#SWE</div>
          <div className='feed__trends-hash_block-subtitle'>97.7 k Tweets</div>
        </div>
        <div className='feed__trends-hash_block-icon'>
          <Icon icon='ph:dots-three-outline' fontSize={20} />
        </div>
      </div>
      <div className='feed__trends-hash_block'>
        <div className='feed__trends-title_container'>
          <div className='feed__trends-hash_block-title'>#SWE</div>
          <div className='feed__trends-hash_block-subtitle'>97.7 k Tweets</div>
        </div>
        <div className='feed__trends-hash_block-icon'>
          <Icon icon='ph:dots-three-outline' fontSize={20} />
        </div>
      </div>
    </div>
  )
}
