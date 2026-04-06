import { motion } from 'framer-motion'

function GlowButton({ children, className = '', ...props }) {
  const MotionButton = motion.button

  return (
    <MotionButton
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl px-4 py-2 font-medium transition glass glow-border ${className}`}
      {...props}
    >
      {children}
    </MotionButton>
  )
}

export default GlowButton
