import { useEffect } from 'react'
import hoverEffect from 'hover-effect'
import GirlImage from '../../assets/girl1.jpg'
import GirlImage2 from '../../assets/girl3.jpg'
import Overlay from '../../assets/download.jpg'

function LoginImage(): JSX.Element {
  useEffect(() => {
    new hoverEffect({
      parent: document.querySelector('.login__left_img'),
      intensity: 0.3,
      image1: GirlImage,
      image2: GirlImage2,
      displacementImage: Overlay,
      imagesRatio: 16 / 9,
      speedOut: 0.5,
      speedIn: 0.5,
    })
  }, [])

  return (
    <div className='login__left'>
      <div className='login__left_img' />
    </div>
  )
}

export default LoginImage
