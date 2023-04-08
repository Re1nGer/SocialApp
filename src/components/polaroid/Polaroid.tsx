import './polaroid.css'

type PolaroidPropType = {
  imgSrc: string
  alt: string
  rotate?: string
}

const Polaroid = ({ imgSrc, alt, rotate }: PolaroidPropType) => {
  return (
    <div className='polaroid__container'>
      <div className='polaroid' style={{ rotate: rotate }}>
        <img src={imgSrc} alt={alt} loading='lazy' />
      </div>
    </div>
  )
}

export default Polaroid
