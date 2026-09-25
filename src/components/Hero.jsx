import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

export default function Hero() {
  const ref1 = useFadeIn(100)
  const ref2 = useFadeIn(300)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'

  return (
    <section style={{
      minHeight:'100svh',
      padding: isMobile ? `0 ${px}` : `0 ${px}`,
      display:'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      alignItems:'center',position:'relative',overflow:'hidden',
    }}>
      {/* BG text */}
      <div style={{
        position:'absolute',bottom:'-40px',right:'-20px',
        fontFamily:"'Bebas Neue',sans-serif",
        fontSize: isMobile ? 'clamp(80px,25vw,140px)' : 'clamp(120px,18vw,280px)',
        color:'transparent',WebkitTextStroke:'1px var(--light)',letterSpacing:'-.02em',
        lineHeight:1,pointerEvents:'none',userSelect:'none',zIndex:0,
      }}>CODE</div>

      {/* Left / main content */}
      <div ref={ref1} style={{position:'relative',zIndex:1,paddingTop: isMobile ? '100px' : '80px', paddingBottom: isMobile ? '60px' : '0'}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'20px',display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{display:'block',width:'32px',height:'1px',background:'var(--accent)'}}/>
          Hey, I'm
        </div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize: isMobile ? 'clamp(64px,16vw,100px)' : 'clamp(72px,10vw,140px)',lineHeight:.88,letterSpacing:'-.01em',color:'var(--ink)',marginBottom:'8px'}}>
          Shubham
          <span style={{color:'var(--accent)',display:'block',fontFamily:"'DM Serif Display',serif",fontStyle:'italic',fontSize: isMobile ? 'clamp(52px,13vw,80px)' : 'clamp(60px,8vw,110px)'}}>Choudhary</span>
        </h1>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:'13px',fontWeight:600,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--warm)',marginBottom:'20px'}}>Software Engineer</div>
        <p style={{fontSize:'15px',fontWeight:300,color:'var(--mid)',maxWidth: isMobile ? '100%' : '420px',margin:'0 0 32px',lineHeight:1.8}}>
          5+ years of experience delivering scalable WordPress, WooCommerce, Drupal, and Angular solutions with clean code, CMS architecture, performance optimization, SEO, and accessibility in mind.
        </p>

        {/* Mobile stats (shown only on mobile) */}
        {isMobile && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'var(--light)',border:'1px solid var(--light)',marginBottom:'32px'}}>
            {[['5+','Years'],['03','Companies'],['CMS','Specialist']].map(([n,l],i) => (
              <div key={i} style={{background:'var(--cream)',padding:'16px 12px',textAlign:'center'}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'36px',lineHeight:1,color:'var(--ink)'}}>{n}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--mid)',marginTop:'4px'}}>{l}</div>
              </div>
            ))}
          </div>
        )}

        <a href="#contact" style={{
          display:'inline-flex',alignItems:'center',gap:'14px',background:'var(--ink)',
          color:'var(--cream)',fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,
          letterSpacing:'.15em',textTransform:'uppercase',textDecoration:'none',
          padding: isMobile ? '15px 24px' : '18px 32px',
        }}>
          Get in Touch →
        </a>
      </div>

      {/* Right stats (desktop only) */}
      {!isMobile && (
        <div ref={ref2} style={{position:'relative',zIndex:1,paddingTop:'80px',display:'flex',flexDirection:'column',alignItems:'flex-end',justifyContent:'center',gap:'40px'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'var(--light)',border:'1px solid var(--light)',width:'320px'}}>
            {[
              {num:'5+',label:'Years\nExperience'},
              {num:'03',label:'Companies\nWorked'},
              {num:'CMS',label:'WordPress\nWooCommerce'},
            ].map((s,i) => (
              <div key={i} style={{background:'var(--cream)',padding:'28px 24px'}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'52px',lineHeight:1,color:'var(--ink)'}}>{s.num}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--mid)',marginTop:'6px',whiteSpace:'pre-line'}}>{s.label}</div>
              </div>
            ))}
            <div style={{background:'var(--cream)',padding:'28px 24px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',fontSize:'13px',color:'var(--mid)'}}>WordPress &</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',fontSize:'13px',color:'var(--mid)'}}>Angular Dev</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isMobile && (
        <div style={{position:'absolute',bottom:'40px',left:px,display:'flex',alignItems:'center',gap:'14px',fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--mid)'}}>
          <div style={{width:'48px',height:'1px',background:'var(--mid)',position:'relative',overflow:'hidden'}}>
            <div className="scroll-line-anim" />
          </div>
          Scroll to explore
        </div>
      )}
    </section>
  )
}
