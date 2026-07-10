import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const services = [
  { num:'01', title:'Web Design', features:['Custom Tailored Design','Responsive Layouts','Interactive UI Elements','Mobile-First Approach'],
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:48,height:48,color:'var(--warm)'}}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
  { num:'02', title:'Development', features:['WordPress Themes & Plugins','Angular Applications','Cross-Browser Compatibility','Performance Optimization'],
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:48,height:48,color:'var(--warm)'}}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { num:'03', title:'E-Commerce', features:['WooCommerce Setup & Customization','Payment Gateway Integration','Inventory & User Management','Email Notification Systems'],
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:48,height:48,color:'var(--warm)'}}><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></svg> },
]

export default function Services() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(100), ref3 = useFadeIn(150)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'
  const cols = isMobile ? 1 : 3

  return (
    <section id="services" style={{padding:`${py} ${px}`,background:'var(--ink)',color:'var(--cream)'}}>
      <div ref={ref1} style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--warm)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
        <span style={{width:'24px',height:'1px',background:'var(--warm)',display:'block'}}/>What I Offer
      </div>
      <div ref={ref2} style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--cream)',marginBottom:'48px'}}>
        Empowering Brands<br/>Through <em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Design</em>
      </div>
      <div ref={ref3} style={{display:'grid',gridTemplateColumns:`repeat(${cols},1fr)`,gap:'1px',background:'#1A1A1A',border:'1px solid #1A1A1A'}}>
        {services.map((s,i) => (
          <div key={i} style={{background:'#111',padding: isMobile ? '40px 28px' : '56px 40px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:'-20px',right:'-10px',fontFamily:"'Bebas Neue',sans-serif",fontSize:'120px',color:'#1A1A1A',lineHeight:1,pointerEvents:'none'}}>{s.num}</div>
            <div style={{marginBottom:'28px'}}>{s.icon}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:'20px',fontWeight:800,color:'var(--cream)',marginBottom:'20px'}}>{s.title}</div>
            <ul style={{listStyle:'none',marginBottom:'32px'}}>
              {s.features.map((f,j) => (
                <li key={j} style={{fontSize:'13px',color:'#888',padding:'10px 0',borderBottom:'1px solid #1A1A1A',display:'flex',alignItems:'center',gap:'10px'}}>
                  <span style={{width:'4px',height:'4px',borderRadius:'50%',background:'var(--accent)',flexShrink:0,display:'inline-block'}}/>{f}
                </li>
              ))}
            </ul>
            <a href="#contact" style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--warm)',textDecoration:'none',display:'flex',alignItems:'center',gap:'10px'}}>
              Schedule a Consultation →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
