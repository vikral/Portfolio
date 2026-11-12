import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive.js'

const items = [
  { label:'Home', to:'/', icon:<><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></> },
  { label:'Blog', to:'/blog', icon:<><path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M5 17a2 2 0 0 1 2-2h12M9 7h6M9 11h6"/></> },
  { label:'Know Me', to:'/know-me', icon:<><circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2z"/></> },
  { label:'Contact', to:'/#contact', icon:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></> },
]

export default function MobileNav() {
  const { isMobile, isTablet } = useResponsive()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== '/' || !location.state?.scrollToContact) return
    const frame = requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })
      navigate('/', { replace:true, state:null })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.state, navigate])

  if (!isMobile && !isTablet) return null

  return (
    <nav aria-label="Quick navigation" style={{position:'fixed',zIndex:850,left:'12px',right:'12px',bottom:'max(10px, env(safe-area-inset-bottom))',display:'grid',gridTemplateColumns:'repeat(4,1fr)',padding:'7px 5px',border:'1px solid rgba(255,255,255,.12)',borderRadius:'20px',background:'rgba(13,13,13,.94)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',boxShadow:'0 8px 30px rgba(0,0,0,.3)'}}>
      {items.map(item=>{
        const active=item.label==='Home'?location.pathname==='/':item.label==='Blog'?location.pathname.startsWith('/blog'):item.label==='Know Me'?location.pathname==='/know-me':false
        const handleContact = item.label === 'Contact' ? event => {
          event.preventDefault()
          if (location.pathname === '/') document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })
          else navigate('/', { state:{ scrollToContact:true } })
        } : undefined
        return <Link key={item.label} to={item.to} onClick={handleContact} aria-label={item.label} aria-current={active?'page':undefined} style={{minHeight:'48px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'4px',color:active?'var(--accent)':'#8d8982',textDecoration:'none',fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.04em',transition:'color .2s',position:'relative'}}>
          {active && <span aria-hidden="true" style={{position:'absolute',top:'-1px',width:'22px',height:'2px',borderRadius:'2px',background:'var(--accent)',boxShadow:'0 0 10px rgba(232,75,43,.7)'}}/>}
          <span style={{width:'30px',height:'30px',display:'grid',placeItems:'center',borderRadius:'11px',background:active?'rgba(232,75,43,.14)':'transparent',transition:'background .2s'}}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{item.icon}</svg>
          </span>
          <span>{item.label}</span>
        </Link>
      })}
    </nav>
  )
}
