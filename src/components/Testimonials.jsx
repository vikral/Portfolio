import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const testimonials = [
  { quote:'Working with Shubham was a game-changer for our online presence. The new website exceeded our expectations in both design and functionality.', name:'Arun Jack', role:'CTO, TheBLR', initials:'AJ' },
  { quote:"Shubham delivered a stunning website that truly reflects our brand's essence. He continuously involves client feedback. Highly recommend his expertise!", name:'Victor Sorto', role:'Founder, Rank Quantum', initials:'VS' },
]

export default function Testimonials() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(150)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'

  return (
    <section style={{padding:`${py} ${px}`,background:'var(--light)',borderTop:'1px solid #D8D2C6'}}>
      <div ref={ref1} style={{marginBottom: isMobile ? '36px' : '64px'}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
          <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>Success Stories
        </div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em'}}>
          Clients Who<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Trust My Work</em>
        </div>
      </div>
      <div ref={ref2} style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',gap:'2px',background:'#D0C9BC',border:'1px solid #D0C9BC'}}>
        {testimonials.map((t,i) => (
          <div key={i} style={{background:'var(--cream)',padding: isMobile ? '32px 24px' : '56px 48px'}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',fontSize: isMobile ? '17px' : '20px',lineHeight:1.6,color:'var(--ink)',marginBottom:'32px'}}>
              <span style={{display:'block',fontSize:'64px',color:'var(--light)',lineHeight:1,marginBottom:'-16px',fontFamily:"'DM Serif Display',serif"}}>"</span>
              {t.quote}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
              <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'linear-gradient(135deg,var(--warm),var(--accent))',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Bebas Neue',sans-serif",fontSize:'18px',color:'#fff',flexShrink:0}}>{t.initials}</div>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:'14px',color:'var(--ink)'}}>{t.name}</div>
                <div style={{fontSize:'13px',color:'var(--mid)',fontWeight:300}}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
