import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const jobs = [
  { company:'RxLogix', period:'Sept 2023 – Present', title:'Software Engineer',
    bullets:['Design and develop custom WordPress themes from scratch','Create custom plugins to extend WordPress functionality','Implementation of continuous integration and daily backups','Working on in-house Angular projects','Planning meetings and reports coordination','Implement custom post types, taxonomies, and fields','Optimize website performance and ensure cross-browser compatibility','Collaborate with designers to create responsive and visually appealing websites'] },
  { company:'Java R&D', period:'2023 — 2023', title:'Software Engineer',
    bullets:['Developed and maintained WordPress-based web applications','Led team initiatives with empathy and clear goal-setting','Standardized development patterns across projects','Optimized site performance and implemented system improvements'] },
  { company:'BLUEROSE PUBLISHERS', period:'2021 — 2023', title:'Web Developer',
    bullets:['Contributed to web development projects across multiple stacks','Worked on theme and plugin customizations','Executed ideas that added measurable value to ongoing projects'] },
]

export default function Experience() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(150), ref3 = useFadeIn(200)
  const [openIndex, setOpenIndex] = React.useState(null)
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
        {jobs.map((job,i) => (
          <ExpItem
            key={job.company}
            {...job}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}

function ExpItem({ company, period, title, bullets, index, isOpen, onToggle }) {
  const panelId = `experience-panel-${index}`

  return (
    <article className={`experience-item${isOpen ? ' is-open' : ''}`}>
      <button
        className="experience-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="experience-job">
          <span className="experience-company">{company}</span>
          <span className="experience-role-preview">{title}</span>
        </span>
        <span className="experience-period">{period}</span>
        <span className="experience-chevron-wrap" aria-hidden="true">
          <span className="experience-chevron" />
        </span>
      </button>
      <div className="experience-panel" id={panelId} aria-hidden={!isOpen}>
        <div className="experience-panel-inner">
          <div className="experience-panel-heading">
            <span className="experience-panel-mark" />
            <span>Selected contributions</span>
          </div>
          <ul className="experience-bullets">
            {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        </div>
      </div>
    </article>
  )
}
