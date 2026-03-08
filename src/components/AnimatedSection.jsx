import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const easing = [0.22, 1, 0.36, 1]

export function AnimatedSection({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: easing }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: easing }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Texto que entra línea por línea
export function AnimatedText({ text, className, delay = 0, tag = 'p' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const Tag = motion[tag] || motion.p

  return (
    <div ref={ref} className="overflow-hidden">
      <Tag
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.7, delay, ease: easing }}
        className={className}
      >
        {text}
      </Tag>
    </div>
  )
}

// Línea horizontal que se expande
export function AnimatedLine({ delay = 0, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1, delay, ease: easing }}
      className={`h-px bg-[#1e1e1e] origin-left ${className}`}
    />
  )
}

// Fade simple sin movimiento
export function AnimatedFade({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, delay, ease: easing }}
      className={className}
    >
      {children}
    </motion.div>
  )
}