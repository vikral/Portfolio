import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const jobs = [
  { company:'RxLogix', period:'Sept 2023 – Present', title:'Software Engineer',
    bullets:['Design and develop custom WordPress themes from scratch','Create custom plugins to extend WordPress functionality','Implementation of continuous integration and daily backups','Working on in-house Angular projects','Planning meetings and reports coordination','Implement custom post types, taxonomies, and fields','Optimize website performance and ensure cross-browser compatibility','Collaborate with designers to create responsive and visually appealing websites'] },
  { company:'Java R&D', period:'Previous Role', title:'WordPress Developer',
    bullets:['Developed and maintained WordPress-based web applications','Led team initiatives with empathy and clear goal-setting','Standardized development patterns across projects','Optimized site performance and implemented system improvements'] },
  { company:'BRP', period:'Previous Role', title:'Developer',
    bullets:['Contributed to web development projects across multiple stacks','Worked on theme and plugin customizations','Executed ideas that added measurable value to ongoing projects'] },
]

export default function Experience() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(150), ref3 = useFadeIn(200)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'

  return (
    <section id="experience" style={{padding:`${py} ${px}`,borderTop:'1px solid var(--light)'}}>
      <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',gap: isMobile ? '20px' : '80px',alignItems:'end',marginBottom: isMobile ? '40px' : '80px'}}>
        <div ref={ref1}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>Work History
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em'}}>
            My<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Experience</em>
          </div>
        </div>
        <p ref={ref2} style={{fontSize:'15px',color:'var(--mid)',fontWeight:300,lineHeight:1.8}}>
          From startup environments to established companies — shipping real products across WordPress, Angular, PHP, and beyond, always focused on quality and collaboration.
        </p>
      </div>
      <div ref={ref3} style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--light)',border:'1px solid var(--light)'}}>
        {jobs.map((job,i) => <ExpItem key={i} {...job} isMobile={isMobile} />)}
      </div>
    </section>
  )
}

function ExpItem({ company, period, title, bullets, isMobile }) {
  const [hover, setHover] = React.useState(false)
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{background:hover?'#FDFAF4':'var(--cream)',padding: isMobile ? '24px 20px' : '48px',display:'grid',gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',gap: isMobile ? '12px' : '48px',alignItems:'start',position:'relative',overflow:'hidden',transition:'background .4s'}}>
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:'3px',background:'var(--accent)',transform:hover?'scaleY(1)':'scaleY(0)',transformOrigin:'top',transition:'transform .4s'}}/>
      <div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize: isMobile ? '24px' : '28px',color:'var(--ink)',letterSpacing:'.02em'}}>{company}</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:600,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--accent)',marginTop:'6px'}}>{period}</div>
      </div>
      <div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize: isMobile ? '15px' : '18px',fontWeight:800,color:'var(--ink)',marginBottom:'16px'}}>{title}</div>
        <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
          {bullets.map((b,i) => (
            <li key={i} style={{fontSize:'14px',color:'var(--mid)',fontWeight:300,lineHeight:1.7,paddingLeft:'20px',position:'relative'}}>
              <span style={{position:'absolute',left:0,color:'var(--accent)'}}>—</span>{b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
