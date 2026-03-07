import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2000)
    const t2 = setTimeout(() => setVisible(false), 2800)
    const t3 = setTimeout(() => onComplete(), 3100)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[999] bg-[#0a0a0a] flex items-center justify-center"
        >
          <div className="flex items-baseline gap-3">
            <motion.span
              animate={{ opacity: exiting ? 0 : 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(22px, 3vw, 38px)',
                fontWeight: '200',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              David
            </motion.span>
            <motion.span
              animate={{ opacity: exiting ? 0 : 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: exiting ? 0.2 : 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(22px, 3vw, 38px)',
                fontWeight: '200',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              Quijada
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen