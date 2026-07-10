import React, { useEffect, useRef } from 'react'
import { useResponsive } from '../hooks/useResponsive'

export default function Cursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const glowRef  = useRef(null)
  const pos      = useRef({ mx:0, my:0, rx:0, ry:0 })
  const rafRef   = useRef(null)
  const { isMobile } = useResponsive()

  useEffect(() => {
    if (isMobile) return

    // ── Move dot instantly, ring lags behind ──
    const onMove = (e) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px'
        glowRef.current.style.top  = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    // ── Ring follows with smooth lerp ──
    const loop = () => {
      pos.current.rx += (pos.current.mx - pos.current.rx) * 0.10
      pos.current.ry += (pos.current.my - pos.current.ry) * 0.10
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + 'px'
        ringRef.current.style.top  = pos.current.ry + 'px'
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    // ── Hover state — expand + accent color ──
    const onEnter = () => {
      if (dotRef.current) {
        dotRef.current.style.width      = '8px'
        dotRef.current.style.height     = '8px'
        dotRef.current.style.background = 'var(--accent)'
        dotRef.current.style.opacity    = '0.6'
      }
      if (ringRef.current) {
        ringRef.current.style.width       = '56px'
        ringRef.current.style.height      = '56px'
        ringRef.current.style.borderColor = 'var(--accent)'
        ringRef.current.style.background  = 'rgba(232,75,43,0.06)'
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = '0.5'
        glowRef.current.style.width   = '80px'
        glowRef.current.style.height  = '80px'
      }
    }
    const onLeave = () => {
      if (dotRef.current) {
        dotRef.current.style.width      = '6px'
        dotRef.current.style.height     = '6px'
        dotRef.current.style.background = '#fff'
        dotRef.current.style.opacity    = '1'
      }
      if (ringRef.current) {
        ringRef.current.style.width       = '36px'
        ringRef.current.style.height      = '36px'
        ringRef.current.style.borderColor = 'rgba(255,255,255,0.5)'
        ringRef.current.style.background  = 'transparent'
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = '0.2'
        glowRef.current.style.width   = '40px'
        glowRef.current.style.height  = '40px'
      }
    }

    const els = document.querySelectorAll('a,button,input,textarea')
    els.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // ── Click pulse ──
    const onClick = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(0.75)'
        setTimeout(() => {
          if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
        }, 150)
      }
    }
    document.addEventListener('mousedown', onClick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onClick)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Outer glow — soft blurred circle */}
      <div ref={glowRef} style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,75,43,0.4) 0%, transparent 70%)',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9996,
        transform: 'translate(-50%,-50%)',
        filter: 'blur(8px)',
        opacity: 0.2,
        transition: 'width .4s ease, height .4s ease, opacity .4s ease',
        mixBlendMode: 'screen',
      }}/>

      {/* Ring — lags behind with lerp */}
      <div ref={ringRef} style={{
        width: '36px',
        height: '36px',
        border: '1px solid rgba(255,255,255,0.5)',
        borderRadius: '50%',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9997,
        transform: 'translate(-50%,-50%)',
        transition: 'width .35s cubic-bezier(.25,.46,.45,.94), height .35s cubic-bezier(.25,.46,.45,.94), border-color .3s, background .3s',
        mixBlendMode: 'difference',
      }}/>

      {/* Dot — follows cursor instantly */}
      <div ref={dotRef} style={{
        width: '6px',
        height: '6px',
        background: '#fff',
        borderRadius: '50%',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        transition: 'width .25s ease, height .25s ease, background .25s ease, opacity .25s ease',
        mixBlendMode: 'difference',
      }}/>
    </>
  )
}