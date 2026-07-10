import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const steps = [
  { num:'01', title:'Discovery', text:'Deep dive into your brand, goals, and audience. Detailed consultations that inform every design and development decision.',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { num:'02', title:'Design', text:'Visually compelling concepts that translate ideas into tangible designs aligned with your brand and user expectations.',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
  { num:'03', title:'Development', text:'Clean, reusable, scalable code. Responsive and performant across all devices and browsers — from WordPress to Angular.',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { num:'04', title:'Launch', text:'Rigorous testing before going live. CI setup, daily backups, and post-launch support to help you maximize your presence.',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
]

export default function Process() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(150), ref3 = useFadeIn(200)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'
  const cols = isMobile ? 1 : isTablet ? 2 : 4

  return (
    <section style={{padding:`${py} ${px}`,borderTop:'1px solid var(--light)'}}>
      <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',gap: isMobile ? '20px' : '80px',alignItems:'end',marginBottom: isMobile ? '36px' : '80px'}}>
        <div ref={ref1}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>My Process
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em'}}>
            Creative<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Workflow</em>
          </div>
        </div>
        <div ref={ref2} style={{display:'flex',flexDirection:'column',alignItems: isMobile ? 'flex-start' : 'flex-end',gap:'20px'}}>
          <p style={{fontSize:'14px',color:'var(--mid)',fontWeight:300,lineHeight:1.8,maxWidth:'320px',textAlign: isMobile ? 'left' : 'right'}}>
            Every step is intentional — designed to bring your vision to life with precision and craft.
          </p>
          <a href="#contact" style={{display:'inline-flex',alignItems:'center',gap:'14px',border:'1.5px solid var(--ink)',color:'var(--ink)',fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',textDecoration:'none',padding:'14px 24px'}}>
            Start a Project →
          </a>
        </div>
      </div>
      <div ref={ref3} style={{display:'grid',gridTemplateColumns:`repeat(${cols},1fr)`,gap:'1px',background:'var(--light)',border:'1px solid var(--light)'}}>
        {steps.map((s,i) => (
          <div key={i} style={{background:'var(--cream)',padding: isMobile ? '32px 24px' : '48px 32px'}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'64px',lineHeight:1,color:'var(--light)',marginBottom:'16px'}}>{s.num}</div>
            <div style={{width:'40px',height:'40px',border:'1px solid var(--light)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'24px',color:'var(--accent)'}}>{s.icon}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:'17px',fontWeight:800,color:'var(--ink)',marginBottom:'12px'}}>{s.title}</div>
            <p style={{fontSize:'14px',color:'var(--mid)',lineHeight:1.8,fontWeight:300}}>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
