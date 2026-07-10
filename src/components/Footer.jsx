import React from 'react'
import { Link } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive.js'

export default function Footer() {
  const { isMobile } = useResponsive()
  return (
    <footer style={{
      padding: isMobile ? '32px 20px' : '48px',
      background:'var(--ink)', borderTop:'1px solid #1A1A1A',
      display:'flex', flexDirection: isMobile ? 'column' : 'row',
      justifyContent:'space-between', alignItems:'center',
      gap: isMobile ? '16px' : '0',
      textAlign: isMobile ? 'center' : 'left',
    }}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'24px',letterSpacing:'.1em',color:'var(--cream)'}}>Vikral</div>
      {!isMobile && (
        <ul style={{display:'flex',gap:'28px',listStyle:'none',alignItems:'center'}}>
          {[['/#','Home'],['/#about','About'],['/#work','Projects'],['/#services','Services'],['/#contact','Contact']].map(([href,label]) => (
            <li key={label}>
              <a href={href} style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:600,letterSpacing:'.15em',textTransform:'uppercase',color:'#555',textDecoration:'none'}}>{label}</a>
            </li>
          ))}
          <li>
            <Link to="/blog" style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:600,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--warm)',textDecoration:'none'}}>Blog</Link>
          </li>
        </ul>
      )}
      <div style={{fontSize:'12px',color:'#444'}}>© 2025 vikral. All rights reserved.</div>
    </footer>
  )
}
