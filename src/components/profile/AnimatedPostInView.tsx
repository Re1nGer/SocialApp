import React, { useRef } from 'react'
import { motion } from 'framer-motion'

type AnimatedPostInViewPropsType = {
  children: JSX.Element
}

export function AnimatedPostInView({ children }: AnimatedPostInViewPropsType): JSX.Element {
  const ref = useRef(null)

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      whileTap={{ scale: 1.1 }}
      whileInView={{ scale: 1, opacity: 1 }}
    >
      {children}
    </motion.section>
  )
}
