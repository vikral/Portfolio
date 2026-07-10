import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

export default function CTA() {
  const ref = useFadeIn(0)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '100px' : '160px'

  return (
    <section style={{padding:`${py} ${px}`,background:'var(--cream)',textAlign:'center',position:'relative',overflow:'hidden',borderTop:'1px solid var(--light)'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(60px,18vw,280px)',color:'transparent',WebkitTextStroke:'1px var(--light)',whiteSpace:'nowrap',pointerEvents:'none',userSelect:'none'}}>
        LETS BUILD
      </div>
      <div ref={ref} style={{position:'relative',zIndex:1}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--mid)',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',marginBottom:'16px'}}>
          <span style={{width:'24px',height:'1px',background:'var(--mid)',display:'block'}}/>Have a Project in Mind?
        </div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(44px,9vw,120px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--ink)',marginBottom:'32px'}}>
          Let's Turn Ideas<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)',display:'block'}}>into Reality</em>
        </div>
        <a href="#contact" style={{display:'inline-flex',alignItems:'center',gap:'14px',background:'var(--ink)',color:'var(--cream)',fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',textDecoration:'none',padding: isMobile ? '16px 28px' : '20px 40px',marginTop:'8px'}}>
          Schedule a Consultation →
        </a>
      </div>
    </section>
  )
}
