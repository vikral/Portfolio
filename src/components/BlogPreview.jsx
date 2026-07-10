import React from 'react'
import { Link } from 'react-router-dom'
import { blogs } from '../data/blogs.js'
import { useFadeIn } from '../hooks/useFadeIn.js'
import { useResponsive } from '../hooks/useResponsive.js'

const CATEGORY_COLORS = {
  WordPress:'#E84B2B', Angular:'#DD0031', WooCommerce:'#7F54B3',
  PHP:'#777BB4', Laravel:'#FF2D20', CSS:'#264DE4', MySQL:'#00758F',
  JavaScript:'#F7DF1E', DevOps:'#2496ED', 'Best Practices':'#2A7A2A', Career:'#C8A97E',
}

export default function BlogPreview() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(150), ref3 = useFadeIn(200)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'
  const recent = blogs.slice(0, 3)

  return (
    <section style={{padding:`${py} ${px}`,borderTop:'1px solid var(--light)',background:'var(--ink)',color:'var(--cream)'}}>
      <div style={{display:'flex',flexDirection: isMobile?'column':'row',justifyContent:'space-between',alignItems: isMobile?'flex-start':'flex-end',gap:'20px',marginBottom: isMobile?'40px':'64px'}}>
        <div ref={ref1}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--warm)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <span style={{width:'24px',height:'1px',background:'var(--warm)',display:'block'}}/>
            From the Blog
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,76px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--cream)'}}>
            Latest<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Writing</em>
          </div>
        </div>
        <Link to="/blog" ref={ref2} style={{fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--warm)',textDecoration:'none',display:'flex',alignItems:'center',gap:'10px',borderBottom:'1px solid var(--warm)',paddingBottom:'4px',flexShrink:0}}>
          All {blogs.length} Articles →
        </Link>
      </div>

      <div ref={ref3} style={{display:'grid',gridTemplateColumns: isMobile?'1fr':isTablet?'repeat(2,1fr)':'repeat(3,1fr)',gap:'1px',background:'#1A1A1A',border:'1px solid #1A1A1A'}}>
        {recent.map((blog) => (
          <PreviewCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  )
}

function PreviewCard({ blog }) {
  const [hover, setHover] = React.useState(false)
  const { isMobile } = useResponsive()
  const catColor = CATEGORY_COLORS[blog.category] || 'var(--accent)'

  return (
    <Link to={`/blog/${blog.id}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display:'block', textDecoration:'none',
        background: hover ? '#161616' : '#111',
        padding: isMobile ? '28px 20px' : '36px 32px',
        position:'relative', overflow:'hidden',
        transition:'background .3s',
      }}>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'2px',background:catColor,transform:hover?'scaleX(1)':'scaleX(0)',transformOrigin:'left',transition:'transform .3s'}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',background:catColor,color:'#fff',padding:'3px 10px'}}>{blog.category}</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',color:'#555'}}>{blog.date}</span>
      </div>
      <h3 style={{fontFamily:"'Syne',sans-serif",fontSize: isMobile?'15px':'17px',fontWeight:800,color:'var(--cream)',marginBottom:'10px',lineHeight:1.3,transition:'color .3s'}}>
        {blog.title}
      </h3>
      <p style={{fontSize:'13px',color:'#666',lineHeight:1.7,fontWeight:300,marginBottom:'20px'}}>
        {blog.excerpt}
      </p>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:catColor,display:'flex',alignItems:'center',gap:'6px'}}>
        Read <span style={{display:'inline-block',transition:'transform .3s',transform:hover?'translateX(4px)':'none'}}>→</span>
      </div>
    </Link>
  )
}
