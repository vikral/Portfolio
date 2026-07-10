import React, { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el  = document.documentElement
      const top = el.scrollTop  || document.body.scrollTop
      const h   = el.scrollHeight - el.clientHeight
      setProgress(h > 0 ? (top / h) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '3px', zIndex: 9999,
      background: 'var(--light)',
    }}>
      <div style={{
        height: '100%',
        width:  `${progress}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--warm))',
        transition: 'width 0.05s linear',
        boxShadow: '0 0 8px var(--accent)',
      }} />
    </div>
  )
}
