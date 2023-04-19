import './WarframeLoader.scss'
import { motion } from 'framer-motion'

function WarframeLoader() {
  return (
    <div className='loader'>
      <motion.div
        animate={{
          rotate: [0, 0, 90, 180, 180, 270, 270, 360],
        }}
        className='spin'
        transition={{ duration: 2.25, ease: 'linear', repeat: Infinity }}
      ></motion.div>
      <motion.div
        animate={{
          scale: [1, 1, 0.8, 0.8, 1, 1, 0.8, 0.8, 1],
        }}
        className='bounce'
        transition={{ duration: 2.25, ease: 'linear', repeat: Infinity }}
      ></motion.div>
    </div>
  )
}

export default WarframeLoader
