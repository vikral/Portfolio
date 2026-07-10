import React from 'react'

const items = ['WordPress','Angular','Theme Development','Plugin Development','WooCommerce','PHP & JavaScript','Performance Optimization','Laravel']
const doubled = [...items,...items]

export default function Marquee() {
  return (
    <div style={{borderTop:'1px solid var(--light)',borderBottom:'1px solid var(--light)',overflow:'hidden',padding:'18px 0'}}>
      <div style={{display:'flex',animation:'marquee 22s linear infinite',whiteSpace:'nowrap'}}>
        {doubled.map((item,i) => (
          <span key={i} style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(14px,2.5vw,20px)',letterSpacing:'.1em',color:'var(--mid)',padding:'0 32px',display:'flex',alignItems:'center',gap:'32px',flexShrink:0}}>
            {item}
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--accent)',flexShrink:0,display:'inline-block'}}/>
          </span>
        ))}
      </div>
    </div>
  )
}
