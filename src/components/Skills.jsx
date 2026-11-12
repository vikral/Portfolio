import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

const skills = [
  { name:'Angular', sub:'Frontend Framework', icon:'angular', color:'#DD0031' },
  { name:'WordPress', sub:'CMS & Theme Dev', icon:'wordpress', color:'#21759B' },
  { name:'HTML & SCSS', sub:'Markup & Styling', icon:'code', color:'#E44D26' },
  { name:'JavaScript', sub:'ES6+, jQuery', icon:'javascript', color:'#F0DB4F' },
  { name:'PHP', sub:'Backend & Plugins', icon:'php', color:'#777BB4' },
  { name:'Laravel', sub:'PHP Framework', icon:'laravel', color:'#FF2D20' },
  { name:'MySQL', sub:'Database', icon:'mysql', color:'#4479A1' },
  { name:'WooCommerce', sub:'E-Commerce', icon:'woocommerce', color:'#96588A' },
  { name:'Elementor / Divi', sub:'Page Builders', icon:'builders', color:'#92003B' },
  { name:'Gutenberg', sub:'Block Editor', icon:'gutenberg', color:'#1E1E1E' },
  { name:'Drupal', sub:'CMS', icon:'drupal', color:'#0678BE' },
  { name:'Git & GitHub', sub:'Version Control', icon:'git', color:'#F05032' },
]

function TechIcon({ type, color }) {
  const textStyle = { fontFamily: 'Arial, sans-serif', fontWeight: 700, fill: color }

  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      {type === 'angular' && <>
        <path d="M16 2 3 6.7 5 23l11 7 11-7 2-16.3L16 2Z" fill={color} />
        <path d="m16 7-7 16h3.5l1.4-3.5h4.2l1.4 3.5H23L16 7Zm0 5.2 1.1 4h-2.2l1.1-4Z" fill="white" />
      </>}
      {type === 'wordpress' && <>
        <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="2.5" />
        <text x="16" y="22" textAnchor="middle" fontSize="18" fontFamily="Georgia, serif" fontWeight="700" fill={color}>W</text>
      </>}
      {type === 'code' && <>
        <path d="m11 8-7 8 7 8M21 8l7 8-7 8" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m18 5-4 22" stroke="#CD6799" strokeWidth="2.5" strokeLinecap="round" />
      </>}
      {type === 'javascript' && <>
        <rect x="3" y="3" width="26" height="26" rx="3" fill={color} />
        <text x="16" y="22" textAnchor="middle" fontSize="12" style={{ ...textStyle, fill: '#171717' }}>JS</text>
      </>}
      {type === 'php' && <>
        <ellipse cx="16" cy="16" rx="14" ry="9" fill={color} />
        <text x="16" y="19" textAnchor="middle" fontSize="10" style={{ ...textStyle, fill: 'white' }}>php</text>
      </>}
      {type === 'laravel' && <>
        <path d="M16 3 29 26H3L16 3Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="m16 11 8.5 15M16 11 7.5 26" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      </>}
      {type === 'mysql' && <>
        <ellipse cx="16" cy="8" rx="11" ry="4" stroke={color} strokeWidth="2" />
        <path d="M5 8v14c0 2.2 4.9 4 11 4s11-1.8 11-4V8M5 15c0 2.2 4.9 4 11 4s11-1.8 11-4" stroke={color} strokeWidth="2" />
      </>}
      {type === 'woocommerce' && <>
        <path d="M8 11h16l-1.5 16h-13L8 11Z" fill={color} />
        <path d="M12 12V9a4 4 0 0 1 8 0v3" stroke={color} strokeWidth="2.5" />
        <text x="16" y="23" textAnchor="middle" fontSize="11" style={{ ...textStyle, fill: 'white' }}>W</text>
      </>}
      {type === 'builders' && <>
        <rect x="2" y="5" width="13" height="22" rx="2" fill={color} />
        <rect x="17" y="5" width="13" height="22" rx="2" fill="#6C4AB6" />
        <text x="8.5" y="21" textAnchor="middle" fontSize="12" style={{ ...textStyle, fill: 'white' }}>E</text>
        <text x="23.5" y="21" textAnchor="middle" fontSize="12" style={{ ...textStyle, fill: 'white' }}>D</text>
      </>}
      {type === 'gutenberg' && <>
        <rect x="3" y="3" width="12" height="12" rx="2" fill={color} />
        <rect x="17" y="3" width="12" height="12" rx="2" fill={color} opacity=".68" />
        <rect x="3" y="17" width="12" height="12" rx="2" fill={color} opacity=".68" />
        <rect x="17" y="17" width="12" height="12" rx="2" fill={color} />
      </>}
      {type === 'drupal' && <>
        <circle cx="16" cy="16" r="13" fill={color} />
        <text x="16" y="22" textAnchor="middle" fontSize="18" style={{ ...textStyle, fill: 'white' }}>D</text>
      </>}
      {type === 'git' && <>
        <path d="m16 3 13 13-13 13L3 16 16 3Z" fill={color} />
        <path d="M11 11l10 10M11 11v9M21 21v-9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="11" cy="11" r="2" fill="white" />
        <circle cx="11" cy="20" r="2" fill="white" />
        <circle cx="21" cy="11" r="2" fill="white" />
      </>}
    </svg>
  )
}

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
        {skills.map(({ name, sub, icon, color }) => (
          <div key={name} style={{background:'#111',padding: isMobile ? '20px 16px' : '32px 28px',display:'flex',alignItems:'flex-start',gap:'12px',transition:'background .3s'}}
            onMouseEnter={e=>e.currentTarget.style.background='#161616'}
            onMouseLeave={e=>e.currentTarget.style.background='#111'}>
            <TechIcon type={icon} color={color} />
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
