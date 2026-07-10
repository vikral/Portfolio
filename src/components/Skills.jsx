import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const skills = [
  ['Angular','Frontend Framework'],['WordPress','CMS & Theme Dev'],['HTML & SCSS','Markup & Styling'],
  ['JavaScript','ES6+, jQuery'],['PHP','Backend & Plugins'],['Laravel','PHP Framework'],
  ['MySQL','Database'],['WooCommerce','E-Commerce'],['Elementor / Divi','Page Builders'],
  ['Gutenberg','Block Editor'],['Drupal','CMS'],['Git & GitHub','Version Control'],
]

export default function Skills() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(100), ref3 = useFadeIn(150)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'
  const cols = isMobile ? 2 : isTablet ? 3 : 4

  return (
    <section id="skills" style={{padding:`${py} ${px}`,background:'var(--ink)',color:'var(--cream)'}}>
      <div ref={ref1} style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--warm)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
        <span style={{width:'24px',height:'1px',background:'var(--warm)',display:'block'}}/>Tech Stack
      </div>
      <div ref={ref2} style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--cream)',marginBottom:'48px'}}>
        Technologies I<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Work With</em>
      </div>
      <div ref={ref3} style={{display:'grid',gridTemplateColumns:`repeat(${cols},1fr)`,gap:'1px',background:'#1A1A1A',border:'1px solid #1A1A1A'}}>
        {skills.map(([name,sub],i) => (
          <div key={i} style={{background:'#111',padding: isMobile ? '20px 16px' : '32px 28px',display:'flex',alignItems:'flex-start',gap:'12px',transition:'background .3s'}}
            onMouseEnter={e=>e.currentTarget.style.background='#161616'}
            onMouseLeave={e=>e.currentTarget.style.background='#111'}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'var(--accent)',flexShrink:0,marginTop:'5px'}}/>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize: isMobile ? '13px' : '14px',fontWeight:600,color:'var(--cream)'}}>{name}</div>
              <div style={{fontSize:'11px',color:'#555',marginTop:'3px'}}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
