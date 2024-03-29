import Polaroid from '../polaroid/Polaroid';
import Girl from '../../assets/girl1.jpg';
import Girl1 from '../../assets/girl2.jpg';
import Girl2 from '../../assets/girl3.jpg';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, Power3 } from 'gsap'

const PolaroidMenu = (): JSX.Element => {

  const [anchor, setAnchor] = useState<number>(300)

  const imageRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        rotate: '-15deg',
        ease: Power3.easeInOut,
        duration: 1,
        opacity: 1,
      })
      gsap.to(image1Ref.current, {
        rotate: '5deg',
        ease: Power3.easeInOut,
        y: anchor,
        duration: 1,
        opacity: 1,
      })
      gsap.to(image2Ref.current, {
        rotate: '-15deg',
        ease: Power3.easeInOut,
        y: 2 * anchor,
        duration: 1,
        opacity: 1,
      })
    })

    return () => {
      ctx.revert()
    }
  }, []);

  return <>
    <Polaroid ref={imageRef} imgSrc={Girl} alt='front' />
    <Polaroid ref={image1Ref} imgSrc={Girl1} alt='some' />
    <Polaroid ref={image2Ref} imgSrc={Girl2} alt='some' />
  </>;
};

export default PolaroidMenu;
