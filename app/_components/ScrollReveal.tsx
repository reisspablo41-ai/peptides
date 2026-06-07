'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const variants = {
  'fade-up':    { hidden: { opacity: 0, y: 48 },   visible: { opacity: 1, y: 0 }   },
  'fade-down':  { hidden: { opacity: 0, y: -32 },  visible: { opacity: 1, y: 0 }   },
  'fade-left':  { hidden: { opacity: 0, x: -56 },  visible: { opacity: 1, x: 0 }   },
  'fade-right': { hidden: { opacity: 0, x: 56 },   visible: { opacity: 1, x: 0 }   },
  'scale-up':   { hidden: { opacity: 0, scale: 0.90 }, visible: { opacity: 1, scale: 1 } },
  'fade':       { hidden: { opacity: 0 },          visible: { opacity: 1 }         },
}

type Variant = keyof typeof variants

interface Props {
  children: React.ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.65,
  className,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-72px' })

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref as never}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
