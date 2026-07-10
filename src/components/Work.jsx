import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const projects = [
  { name:'BucketListRaffel', desc:'Lottery platform with user management, auth & configurable graphics', tag:'Lottery / WooCommerce', bg:'#0A0A14', tech:['WordPress','PHP','WooCommerce','Elementor','MySQL'], large:true },
  { name:'Canablue', desc:'AI-driven real estate platform — Punta Cana', tag:'Real Estate / AI', bg:'#051210', tech:['WordPress','Gravity Forms','ChatBot','MySQL'] },
  { name:'BlueRoseOne', desc:'Author self-publishing dashboard — manuscripts, royalties, sales', tag:'Publishing / Dashboard', bg:'#14080A', tech:['Laravel','PHP','MySQL','JavaScript'] },
  { name:'Tripple.social', desc:'Life-centric social platform — Digital Legacy', tag:'Social Media', bg:'#0D0A16', tech:['WordPress','Custom Theme','Elementor'] },
  { name:'Langly Plugin', desc:'Customizable Google Translate dropdown — minimal & modern styles', tag:'WordPress Plugin', bg:'#101610', tech:['PHP','JavaScript','WP Hooks','API'], large:true },
]

export default function Work() {
  const ref1 = useFadeIn(0)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'

  return (
    <section id="work" style={{padding:`${py} ${px}`,background:'var(--ink)',color:'var(--cream)'}}>
      <div style={{display:'flex',flexDirection: isMobile ? 'column' : 'row',justifyContent:'space-between',alignItems: isMobile ? 'flex-start' : 'flex-end',gap:'20px',marginBottom: isMobile ? '40px' : '80px'}}>
        <div ref={ref1}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--warm)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <span style={{width:'24px',height:'1px',background:'var(--warm)',display:'block'}}/>Featured Projects
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--cream)'}}>
            Selected<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Work</em>
          </div>
        </div>
        <a href="#more-projects" style={{fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--warm)',textDecoration:'none',display:'flex',alignItems:'center',gap:'10px',borderBottom:'1px solid var(--warm)',paddingBottom:'4px'}}>
          More Projects →
        </a>
      </div>
      <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',gap:'2px'}}>
        {projects.map((p,i) => <WorkItem key={i} {...p} delay={i*50} isMobile={isMobile} />)}
      </div>
    </section>
  )
}

function WorkItem({ name, desc, tag, bg, tech, large, delay, isMobile }) {
  const [hover, setHover] = React.useState(false)
  const ref = useFadeIn(delay)
  return (
    <div ref={ref}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{position:'relative',aspectRatio: isMobile ? '4/3' : large ? '16/7' : '4/3',overflow:'hidden',gridColumn: (!isMobile && large) ? 'span 2' : undefined}}>
      <div style={{position:'absolute',inset:0,background:bg,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Bebas Neue',sans-serif",fontSize: isMobile ? 'clamp(24px,6vw,48px)' : 'clamp(40px,5.5vw,90px)',color:'#222',letterSpacing:'-.02em',transition:'transform .6s',transform:hover?'scale(1.05)':'scale(1)',userSelect:'none',textAlign:'center',padding:'16px'}}>{name.toUpperCase()}</div>
      <span style={{position:'absolute',top:'16px',left:'16px',fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',background:'var(--accent)',color:'#fff',padding:'5px 12px'}}>{tag}</span>
      <div style={{position:'absolute',inset:0,padding:'24px',display:'flex',flexDirection:'column',justifyContent:'flex-end',background:'linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 60%)',opacity: isMobile ? 1 : hover ? 1 : 0,transition:'opacity .4s'}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize: isMobile ? '18px' : '24px',color:'var(--cream)',marginBottom:'6px'}}>{name}</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:600,letterSpacing:'.15em',color:'var(--warm)',textTransform:'uppercase',marginBottom:'10px'}}>{desc}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
          {tech.map((t,i) => <span key={i} style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',border:'1px solid rgba(200,169,126,.4)',color:'var(--warm)',padding:'3px 8px'}}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}
