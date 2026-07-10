import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const cards = [
  { num:'01', title:'Tailored Solutions', text:'No templates. Every pixel and every line of code is crafted with your unique requirements in mind — from theme structure to plugin logic.' },
  { num:'02', title:'Team Leadership', text:"I've led development teams with empathy and clear goal-setting — ensuring every collaborator is motivated, aligned, and shipping great work." },
  { num:'03', title:'Modern Tech Stack', text:'Staying at the forefront of WordPress, Angular, Laravel, and modern tooling — bringing the most innovative, performant solutions to every project.' },
]

export default function Why() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(150), ref3 = useFadeIn(200)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'

  return (
    <section style={{padding:`${py} ${px}`,borderTop:'1px solid var(--light)'}}>
      <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',gap: isMobile ? '20px' : '80px',alignItems:'end',marginBottom: isMobile ? '36px' : '80px'}}>
        <div ref={ref1}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>Why Work With Me
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em'}}>
            Designed to<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Stand Out</em>
          </div>
        </div>
        <p ref={ref2} style={{fontSize:'15px',color:'var(--mid)',fontWeight:300,lineHeight:1.8}}>
          Every brand deserves a digital presence as unique as its vision. I combine thoughtful design, modern technology, and strategic thinking to build experiences that leave a lasting impression.
        </p>
      </div>
      <div ref={ref3} style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',gap:'1px',background:'var(--light)',border:'1px solid var(--light)'}}>
        {cards.map((c,i) => <WhyCard key={i} {...c} />)}
      </div>
    </section>
  )
}

function WhyCard({ num, title, text }) {
  const [hover, setHover] = React.useState(false)
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{background:hover?'var(--ink)':'var(--cream)',padding:'40px 32px',position:'relative',overflow:'hidden',transition:'background .4s',cursor:'default'}}>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'3px',background:'var(--accent)',transform:hover?'scaleX(1)':'scaleX(0)',transformOrigin:'left',transition:'transform .4s'}}/>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'56px',color:hover?'#222':'var(--light)',lineHeight:1,marginBottom:'20px',transition:'color .4s'}}>{num}</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:'17px',fontWeight:700,color:hover?'var(--cream)':'var(--ink)',marginBottom:'14px',transition:'color .4s'}}>{title}</div>
      <p style={{fontSize:'14px',color:hover?'var(--cream)':'var(--mid)',lineHeight:1.8,fontWeight:300,transition:'color .4s'}}>{text}</p>
    </div>
  )
}
