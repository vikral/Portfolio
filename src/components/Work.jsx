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
    <section id="work" style={{padding:`${py} ${px}`,background:'var(--ink)',color:'var(--cream)',position:'relative',overflow:'hidden'}}>
      <div aria-hidden="true" style={{position:'absolute',top:'28px',right:px,fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(90px,19vw,260px)',lineHeight:'.8',letterSpacing:'-.04em',color:'transparent',WebkitTextStroke:'1px #1a1a1a',pointerEvents:'none',userSelect:'none'}}>01—05</div>
      <div style={{display:'flex',flexDirection:isMobile?'column':'row',justifyContent:'space-between',alignItems:isMobile?'stretch':'flex-end',gap:'24px',marginBottom:isMobile?'40px':'64px',position:'relative',zIndex:1}}>
        <div ref={ref1}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.28em',textTransform:'uppercase',color:'var(--warm)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'22px'}}>
            <span style={{width:'32px',height:'1px',background:'var(--accent)',display:'block'}}/>Featured Projects <span style={{color:'#555'}}>— 2021 / 2025</span>
          </div>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontWeight:400,fontSize:'clamp(40px,7vw,76px)',lineHeight:'.9',letterSpacing:'-.01em',color:'var(--cream)'}}>
            Selected <em style={{fontFamily:"'DM Serif Display',serif",fontWeight:400,fontStyle:'italic',color:'var(--accent)',letterSpacing:'-.04em'}}>Work</em>
          </h2>
        </div>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:'24px',maxWidth:isMobile?'none':'300px'}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:300,lineHeight:1.75,color:'#777',maxWidth:'220px'}}>A selection of products and tools built to solve real problems.</p>
          <a href="#more-projects" aria-label="Explore more projects" style={{width:'52px',height:'52px',flexShrink:0,border:'1px solid #34312c',borderRadius:'50%',color:'var(--cream)',textDecoration:'none',display:'grid',placeItems:'center',fontSize:'20px',transition:'background .25s,color .25s'}} onMouseEnter={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.color='#fff'}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--cream)'}}>↗</a>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(2,1fr)',gap:'10px',position:'relative',zIndex:1}}>
        {projects.filter(project => project.name !== 'Langly Plugin').map((project,i)=><WorkItem key={project.name} {...project} index={i+1} delay={i*50} isMobile={isMobile}/ >)}
        <ContactWorkCard isMobile={isMobile} delay={220} />
        {projects.filter(project => project.name === 'Langly Plugin').map((project,i)=><WorkItem key={project.name} {...project} index={5} delay={i*50+270} isMobile={isMobile}/ >)}
      </div>
    </section>
  )
}

function ContactWorkCard({isMobile,delay}) {
  const ref=useFadeIn(delay)
  return (
    <article ref={ref} style={{position:'relative',aspectRatio:isMobile?'4/3':'4/3',overflow:'hidden',background:'#17120f',border:'1px solid #33241e',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:isMobile?'24px':'32px',isolation:'isolate'}}>
      <div aria-hidden="true" style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 100% 0%,rgba(232,75,43,.2),transparent 62%)',pointerEvents:'none'}}/>
      <div style={{position:'relative',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'#d6a28f',border:'1px solid #ffffff24',padding:'7px 10px'}}>More work, on request</span>
        <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'18px',color:'#aaa'}}>06 <span style={{color:'var(--accent)'}}>↗</span></span>
      </div>
      <div style={{position:'relative'}}>
        <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontWeight:400,fontSize:isMobile?'clamp(30px,8vw,46px)':'clamp(34px,4vw,54px)',letterSpacing:'-.015em',color:'var(--cream)',lineHeight:'.95',marginBottom:'10px'}}>Have a project<br/><em style={{fontFamily:"'DM Serif Display',serif",fontWeight:400,color:'var(--accent)'}}>in mind?</em></h3>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:300,lineHeight:1.7,color:'#aaa',marginBottom:'20px'}}>Get in touch to see more work and talk about what we can build together.</p>
        <a href="#contact" style={{display:'inline-flex',alignItems:'center',gap:'12px',padding:'12px 16px',background:'var(--accent)',color:'#fff',fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',textDecoration:'none'}}>Contact me <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  )
}

function WorkItem({name,desc,tag,bg,tech,large,delay,index,isMobile}) {
  const [hover,setHover]=React.useState(false)
  const ref=useFadeIn(delay)
  return (
    <article ref={ref} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{position:'relative',aspectRatio:isMobile?'4/3':large?'16/7':'4/3',overflow:'hidden',gridColumn:(!isMobile&&large)?'span 2':undefined,background:'#10100f',border:'1px solid #1c1b19',isolation:'isolate'}}>
      <div aria-hidden="true" style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 75% 30%,${bg} 0%,#10100f 70%)`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Bebas Neue',sans-serif",fontSize:isMobile?'clamp(28px,8vw,56px)':'clamp(52px,9vw,130px)',color:'rgba(245,240,232,.09)',letterSpacing:'-.035em',transition:'transform .7s cubic-bezier(.2,.7,.2,1)',transform:hover?'scale(1.035)':'scale(1)',userSelect:'none',textAlign:'center',padding:'20px'}}>{name.toUpperCase()}</div>
      <div aria-hidden="true" style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.05) 30%,rgba(0,0,0,.86) 100%)'}}/>
      <div style={{position:'absolute',top:'20px',left:'22px',right:'22px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'#bbb',border:'1px solid #ffffff24',padding:'7px 10px',background:'#00000030'}}>{tag}</span>
        <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'18px',color:'#aaa'}}>0{index} <span style={{color:'var(--accent)'}}>↗</span></span>
      </div>
      <div style={{position:'absolute',left:isMobile?'22px':'32px',right:isMobile?'22px':'32px',bottom:isMobile?'22px':'30px',display:'flex',flexDirection:'column',alignItems:'flex-start',transform:hover?'translateY(-3px)':'none',transition:'transform .3s'}}>
        <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontWeight:400,fontSize:isMobile?'clamp(27px,7vw,42px)':'clamp(34px,5vw,64px)',letterSpacing:'-.015em',color:'var(--cream)',lineHeight:'.95',marginBottom:'8px'}}>{name}</h3>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:isMobile?'12px':'13px',fontWeight:300,color:'#aaa',marginBottom:'16px'}}>{desc}</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>{tech.map(t=><span key={t} style={{fontFamily:"'Syne',sans-serif",fontSize:'8px',fontWeight:600,letterSpacing:'.09em',textTransform:'uppercase',border:'1px solid #ffffff20',color:'#c2bdb4',padding:'5px 8px',background:'#00000026'}}>{t}</span>)}</div>
      </div>
    </article>
  )
}
