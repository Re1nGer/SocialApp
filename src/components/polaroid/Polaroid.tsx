import { LegacyRef, forwardRef } from 'react'
import './polaroid.css'

type PolaroidPropType = {
  imgSrc: string
  alt: string
  rotate?: string
}

type Ref = LegacyRef<HTMLDivElement>

const Polaroid = ({ imgSrc, alt, rotate }: PolaroidPropType, ref: Ref) => {
  return (
    <div className='polaroid__container' ref={ref}>
      <div className='polaroid' style={{ rotate: rotate }}>
        <img src={imgSrc} alt={alt} loading='lazy' />
      </div>
    </div>
  )
}

export default forwardRef(Polaroid)
