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
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'12px'}}>
          <ul style={{display:'flex',gap:'28px',listStyle:'none',alignItems:'center'}}>
            {[['/#','Home'],['/know-me','Know Me'],['/#about','About'],['/#work','Projects'],['/#services','Services'],['/#contact','Contact']].map(([href,label]) => (
              <li key={label}>
                <a href={href} style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:600,letterSpacing:'.15em',textTransform:'uppercase',color:'#555',textDecoration:'none'}}>{label}</a>
              </li>
            ))}
            <li>
              <Link to="/blog" style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:600,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--warm)',textDecoration:'none'}}>Blog</Link>
            </li>
          </ul>
          <div style={{display:'flex',gap:'16px',justifyContent:'center'}}>
            <a href="https://www.linkedin.com/in/vikral/" target="_blank" rel="noopener noreferrer" style={{color:'#555',textDecoration:'none',fontSize:'10px',fontFamily:"'Syne',sans-serif",letterSpacing:'.1em',textTransform:'uppercase'}}>LinkedIn</a>
            <a href="https://instagram.com/vikral_" target="_blank" rel="noopener noreferrer" style={{color:'#555',textDecoration:'none',fontSize:'10px',fontFamily:"'Syne',sans-serif",letterSpacing:'.1em',textTransform:'uppercase'}}>Instagram</a>
            <a href="https://x.com/iamvikral" target="_blank" rel="noopener noreferrer" style={{color:'#555',textDecoration:'none',fontSize:'10px',fontFamily:"'Syne',sans-serif",letterSpacing:'.1em',textTransform:'uppercase'}}>X</a>
          </div>
        </div>
      )}
      <div style={{fontSize:'12px',color:'#444'}}>© 2026 vikral. All rights reserved.</div>
    </footer>
  )
}
