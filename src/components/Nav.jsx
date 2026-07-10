import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive.js'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { isMobile } = useResponsive()

  const close = () => { setOpen(false); document.body.style.overflow = '' }
  const toggle = () => {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        padding: isMobile ? '16px 20px' : '24px 48px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        background:'var(--cream)',
        borderBottom: isMobile ? '1px solid var(--light)' : 'none',
      }}>
        <a href="#" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'22px',letterSpacing:'.1em',color:'var(--ink)',textDecoration:'none'}}>Vikral</a>

        {!isMobile && (
          <ul style={{display:'flex',gap:'32px',listStyle:'none',alignItems:'center'}}>
            {['about','experience','work','services','contact'].map(id => (
              <li key={id}><NavLink href={`#${id}`}>{id.charAt(0).toUpperCase()+id.slice(1)}</NavLink></li>
            ))}
            <li>
              <Link to="/blog" style={{fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'#fff',background:'var(--accent)',padding:'7px 16px',borderRadius:'100px',textDecoration:'none'}}>
                Blogs
              </Link>
              <Link to="/know-me">Know Me</Link>
            </li>
          </ul>
        )}

        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          {!isMobile && (
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',background:'var(--ink)',color:'#fff',padding:'6px 14px',borderRadius:'100px'}}>Available for Work</span>
          )}
          {isMobile && (
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',background:'var(--accent)',color:'#fff',padding:'5px 10px',borderRadius:'100px'}}>Available</span>
          )}
          <button onClick={toggle} aria-label="Toggle menu" style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:'5px',width:'36px',height:'36px',cursor:'pointer',background:'none',border:'none',padding:'4px',zIndex:200}}>
            <span style={{display:'block',width:'100%',height:'1.5px',background:'var(--ink)',transition:'transform .3s, opacity .3s',transform:open?'translateY(6.5px) rotate(45deg)':'none'}}/>
            <span style={{display:'block',width:'100%',height:'1.5px',background:'var(--ink)',transition:'transform .3s, opacity .3s',opacity:open?0:1}}/>
            <span style={{display:'block',width:'100%',height:'1.5px',background:'var(--ink)',transition:'transform .3s, opacity .3s',transform:open?'translateY(-6.5px) rotate(-45deg)':'none'}}/>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div style={{
        display:'flex',position:'fixed',inset:0,background:'var(--cream)',zIndex:150,
        flexDirection:'column',alignItems:'center',justifyContent:'center',
        opacity:open?1:0,pointerEvents:open?'all':'none',transition:'opacity .3s',
      }}>

        {/* ── Close button ── */}
        <button
          onClick={close}
          aria-label="Close menu"
          style={{
            position:'absolute',top:'20px',right:'20px',
            width:'44px',height:'44px',
            display:'flex',alignItems:'center',justifyContent:'center',
            background:'none',border:'1.5px solid var(--light)',
            cursor:'pointer',borderRadius:'50%',
            transition:'border-color .2s, background .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.background = 'var(--accent)'
            e.currentTarget.querySelector('svg').style.stroke = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--light)'
            e.currentTarget.style.background = 'none'
            e.currentTarget.querySelector('svg').style.stroke = 'var(--ink)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="var(--ink)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{transition:'stroke .2s'}}>
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Nav links */}
        {['about','experience','work','services','contact'].map(id => (
          <a key={id} href={`#${id}`} onClick={close} style={{
            fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,10vw,60px)',
            color:'var(--ink)',textDecoration:'none',letterSpacing:'.05em',lineHeight:1.4,
          }}>
            {id.charAt(0).toUpperCase()+id.slice(1)}
          </a>
        ))}
        <Link to="/blog" onClick={close} style={{
          fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,10vw,60px)',
          color:'var(--accent)',textDecoration:'none',letterSpacing:'.05em',lineHeight:1.4,
        }}>
          Blog
        </Link>

        <div style={{position:'absolute',bottom:'40px'}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',background:'var(--accent)',color:'#fff',padding:'6px 14px',borderRadius:'100px'}}>Available for Work</span>
        </div>
      </div>
    </>
  )
}

function NavLink({ href, children }) {
  const [hover, setHover] = useState(false)
  return (
    <a href={href} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:600,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink)',textDecoration:'none',position:'relative'}}>
      {children}
      <span style={{position:'absolute',bottom:'-2px',left:0,width:hover?'100%':'0',height:'1px',background:'var(--accent)',transition:'width .3s'}}/>
    </a>
  )
}