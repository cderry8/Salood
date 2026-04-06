import { motion } from 'framer-motion'

function PageMotion({ children }) {
  const MotionDiv = motion.div

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </MotionDiv>
  )
}

export default PageMotion
