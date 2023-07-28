import { motion } from "framer-motion";
function RevealText(): JSX.Element {

  return (
      <motion.h1
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         whileHover={{ opacity: 0 }}
         className='text-xl font-bold py-10 px-5'
      >
        Destiny Arrives All The Same
      </motion.h1>
  )
}

export default RevealText;