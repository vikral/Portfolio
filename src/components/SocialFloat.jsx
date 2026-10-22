import React from 'react'
import { useResponsive } from '../hooks/useResponsive.js'

const links = [
  { label:'LinkedIn', short:'in', href:'https://www.linkedin.com/in/vikral/' },
  { label:'Instagram', short:'ig', href:'https://instagram.com/vikral_' },
  { label:'X', short:'𝕏', href:'https://x.com/iamvikral' },
  { label:'Email', short:'@', href:'mailto:vikralshubham1@gmail.com' },
]

export default function SocialFloat() {
  const { isMobile, isTablet } = useResponsive()
  const compact = isMobile || isTablet

  return (
    <nav aria-label="Social media and contact links" style={{
      position:'fixed', zIndex:900, right:compact?'12px':'24px', bottom:'max(16px, env(safe-area-inset-bottom))',
      display:'flex', flexDirection:compact?'row':'column', gap:compact?'8px':'10px',
      padding:compact?'8px':'10px', background:'rgba(13,13,13,.9)', border:'1px solid #ffffff1c',
      borderRadius:'999px', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
      boxShadow:'0 8px 28px rgba(0,0,0,.3)',
    }}>
      {links.map(({label,short,href})=>(
        <a key={label} href={href} aria-label={label} title={label}
          target={href.startsWith('http')?'_blank':undefined}
          rel={href.startsWith('http')?'noopener noreferrer':undefined}
          style={{width:compact?'42px':'40px',height:compact?'42px':'40px',display:'grid',placeItems:'center',borderRadius:'50%',border:'1px solid #ffffff20',color:'var(--cream)',background:'#ffffff08',fontFamily:"'Syne',sans-serif",fontSize:'13px',fontWeight:700,textDecoration:'none',transition:'background .2s,color .2s,border-color .2s'}}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='var(--accent)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='#ffffff08';e.currentTarget.style.color='var(--cream)';e.currentTarget.style.borderColor='#ffffff20'}}>
          {short}
        </a>
      ))}
    </nav>
  )
}
