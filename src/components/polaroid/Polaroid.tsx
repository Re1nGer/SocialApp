import { LegacyRef, forwardRef } from 'react'
import './polaroid.css'

type PolaroidPropType = {
  imgSrc: string
  alt: string
  caption?: string
}

type Ref = LegacyRef<HTMLDivElement>

const Polaroid = ({ imgSrc, alt, caption }: PolaroidPropType, ref: Ref) => {
  return (
    <div className='polaroid__container' ref={ref}>
      <div className='polaroid'>
        <img src={imgSrc} alt={alt} loading='lazy' />
        <div className='polaroid__caption'>{caption}</div>
      </div>
    </div>
  )
}

export default forwardRef(Polaroid)
