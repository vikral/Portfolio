import React from 'react'
import { Link } from 'react-router-dom'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const profileImg = '/og-image.png'

export default function About() {
  const ref1 = useFadeIn(0)
  
  const ref2 = useFadeIn(200)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'

  return (
    <section id="about" style={{
      padding:`${py} ${px}`,
      borderTop:'1px solid var(--light)',
      display:'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '48px' : '80px',
      alignItems:'center',
    }}>
      {/* Photo side */}
      <div ref={ref1} style={{position:'relative',paddingBottom: isMobile ? '0' : '24px'}}>
        <div style={{
          width:'100%',
          aspectRatio:'4/5',
          overflow:'hidden',
          position:'relative',
        }}>
          <img
            src={profileImg}
            alt="Shubham Vikral"
            style={{
              width:'100%',height:'100%',
              objectFit:'cover',
              objectPosition:'center top',
              display:'block',
            }}
          />
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, transparent 60%, rgba(13,13,13,0.15))'}}/>
        </div>
      </div>

      {/* Text side */}
      <div ref={ref2} style={{paddingTop: isMobile ? '40px' : '0'}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
          <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>About Me
        </div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em',marginBottom:'24px'}}>
          Discover My<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Journey</em>
        </div>
        <p style={{fontSize:'15px',color:'var(--mid)',lineHeight:1.9,fontWeight:300,margin:'0 0 16px'}}>
          I am a Software Engineer with 5+ years of experience delivering scalable CMS and web application solutions across WordPress, WooCommerce, Drupal, Angular, PHP, JavaScript, and MySQL.
        </p>
        <p style={{fontSize:'15px',color:'var(--mid)',lineHeight:1.9,fontWeight:300,margin:'0 0 20px'}}>
          My work spans custom WordPress theme and plugin development, ACF Pro architecture, e-commerce workflows, REST API integrations, performance optimization, SEO, accessibility, and CMS tools that non-technical teams can manage confidently.
        </p>
        <p style={{fontSize:'15px',color:'var(--mid)',lineHeight:1.9,fontWeight:300,margin:'0 0 24px'}}>
          Want to know more about me?
          <Link to="/know-me" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600,marginLeft:'6px',borderBottom:'1px solid var(--accent)'}}>Read my full story →</Link>
        </p>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(3,1fr)',
          gap:'1px',background:'var(--light)',border:'1px solid var(--light)',
          margin:'28px 0 36px',
        }}>
          {[['5+','Years of Experience'],['03','Companies'],['CMS','Core Focus']].map(([n,l],i) => (
            <div key={i} style={{background:'var(--cream)',padding: isMobile ? '16px 12px' : '24px 20px'}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize: isMobile ? '36px' : '48px',lineHeight:1,color:'var(--ink)'}}>{n}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize: isMobile ? '8px' : '10px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--mid)',marginTop:'4px'}}>{l}</div>
            </div>
          ))}
        </div>
        <a href="#contact" style={{
          display:'inline-flex',alignItems:'center',gap:'14px',
          border:'1.5px solid var(--ink)',color:'var(--ink)',
          fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,
          letterSpacing:'.15em',textTransform:'uppercase',textDecoration:'none',
          padding: isMobile ? '14px 22px' : '16px 28px',
        }}>
          Let's Work Together →
        </a>
      </div>
    </section>
  )
}
