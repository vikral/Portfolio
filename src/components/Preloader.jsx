import React, { useEffect, useRef, useState } from 'react'

const EXIT_DURATION = 950
const MIN_DISPLAY_TIME = 1900

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const wordmarkRef = useRef(null)

  useEffect(() => {
    const startedAt = Date.now()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minDisplayTime = reducedMotion ? 600 : MIN_DISPLAY_TIME
    const exitDuration = reducedMotion ? 120 : EXIT_DURATION
    let cancelled = false
    let exitTimer
    let hideTimer

    const finishLoading = () => {
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve()
      fontsReady.then(() => {
        if (cancelled) return

        const remainingTime = Math.max(0, minDisplayTime - (Date.now() - startedAt))
        exitTimer = window.setTimeout(() => {
          const wordmark = wordmarkRef.current
          const headerLogo = document.querySelector('.nav-brand')

          if (wordmark && headerLogo) {
            const from = wordmark.getBoundingClientRect()
            const to = headerLogo.getBoundingClientRect()
            const x = to.left + to.width / 2 - (from.left + from.width / 2)
            const y = to.top + to.height / 2 - (from.top + from.height / 2)
            const scale = to.width / from.width

            wordmark.style.setProperty('--logo-flight-x', `${x}px`)
            wordmark.style.setProperty('--logo-flight-y', `${y}px`)
            wordmark.style.setProperty('--logo-flight-scale', `${scale}`)
          }

          setExiting(true)
          hideTimer = window.setTimeout(() => setVisible(false), exitDuration)
        }, remainingTime)
      })
    }

    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', finishLoading)
      window.clearTimeout(exitTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    if (!visible) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className={`preloader${exiting ? ' is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Vikral portfolio"
      aria-hidden={exiting}
    >
      <div className="preloader-grid" aria-hidden="true" />
      <span className="preloader-corner preloader-corner-top">INDEPENDENT DEVELOPER<br />PORTFOLIO</span>
      <span className="preloader-corner preloader-corner-bottom">DESIGNED TO MAKE AN IMPACT</span>

      <div className="preloader-center">
        <div className="preloader-brand-wrap">
          <span className="preloader-orbit" aria-hidden="true" />
          <div className="preloader-wordmark" ref={wordmarkRef}>Vikral</div>
        </div>
        <p className="preloader-caption">Loading your experience</p>
        <div className="preloader-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  )
}
