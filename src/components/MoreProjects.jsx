import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const cards = [
  { num:'01', title:"Author's Website", desc:"Showcase site for Author Rashmi Trivedi — six Amazon best-selling books.", tech:['WordPress','Elementor','Custom Theme','Bootstrap'] },
  { num:'02', title:'Deeproserves', desc:"Professional site for award-winning Life Coach Deepak Sharma — NLP Practitioner, Hypnotherapist.", tech:['WooCommerce','Custom Theme','Elementor','WpForms'] },
  { num:'03', title:'Shubhamshukla.co', desc:"A simple, clean blogging website with minimal design. Admin can add and edit posts through WordPress.", tech:['WordPress','Gutenberg','CSS Grid'] },
  { num:'04', title:'LitGleam', desc:"Monthly literary magazine focused on Literature & Lifestyle — an imprint of BlueRose Publishers.", tech:['WordPress','Elementor','Custom Theme','Bootstrap'] },
  { num:'05', title:'Club Living', desc:"Exclusive lifestyle membership in Panama City for smart apartment communities.", tech:['WordPress','PHP','Divi','Elementor','MySQL'] },
  { num:'06', title:'One Page Portfolio', desc:"One-page design featuring a portfolio with light and dark modes and minimal aesthetics.", tech:['HTML','CSS','JavaScript'] },
]

export default function MoreProjects() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(150), ref3 = useFadeIn(200)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'
  const cols = isMobile ? 1 : isTablet ? 2 : 3

  return (
    <section id="more-projects" style={{padding:`${py} ${px}`,borderTop:'1px solid var(--light)'}}>
      <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',gap: isMobile ? '20px' : '80px',alignItems:'end',marginBottom: isMobile ? '36px' : '64px'}}>
        <div ref={ref1}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>More Work
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em'}}>
            Other<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Projects</em>
          </div>
        </div>
        <p ref={ref2} style={{fontSize:'15px',color:'var(--mid)',fontWeight:300,lineHeight:1.8}}>
          A collection of additional websites and solutions built for diverse clients — from personal blogs to luxury lifestyle membership platforms.
        </p>
      </div>
      <div ref={ref3} style={{display:'grid',gridTemplateColumns:`repeat(${cols},1fr)`,gap:'1px',background:'var(--light)',border:'1px solid var(--light)'}}>
        {cards.map((c,i) => <MoreCard key={i} {...c} />)}
      </div>
    </section>
  )
}

function MoreCard({ num, title, desc, tech }) {
  const [hover, setHover] = React.useState(false)
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{background:hover?'var(--ink)':'var(--cream)',padding:'32px 28px',position:'relative',overflow:'hidden',transition:'background .4s',cursor:'default'}}>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'2px',background:'var(--accent)',transform:hover?'scaleX(1)':'scaleX(0)',transformOrigin:'left',transition:'transform .4s'}}/>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'44px',color:hover?'#222':'var(--light)',lineHeight:1,marginBottom:'16px',transition:'color .4s'}}>{num}</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:'17px',fontWeight:800,color:hover?'var(--cream)':'var(--ink)',marginBottom:'10px',transition:'color .4s'}}>{title}</div>
      <p style={{fontSize:'13px',color:hover?'var(--cream)':'var(--mid)',lineHeight:1.7,fontWeight:300,marginBottom:'16px',transition:'color .4s'}}>{desc}</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
        {tech.map((t,i) => <span key={i} style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',border:`1px solid ${hover?'rgba(200,169,126,.3)':'var(--light)'}`,color:hover?'var(--warm)':'var(--mid)',padding:'3px 8px',transition:'all .4s'}}>{t}</span>)}
      </div>
    </div>
  )
}
