import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogs } from '../data/blogs.js'
import { useResponsive } from '../hooks/useResponsive.js'
import { useFadeIn } from '../hooks/useFadeIn.js'
import Footer from '../components/Footer.jsx'
import Cursor from '../components/Cursor.jsx'

const CATEGORY_COLORS = {
  WordPress:      '#E84B2B',
  Angular:        '#DD0031',
  WooCommerce:    '#7F54B3',
  PHP:            '#777BB4',
  Laravel:        '#FF2D20',
  CSS:            '#264DE4',
  MySQL:          '#00758F',
  JavaScript:     '#F7DF1E',
  DevOps:         '#2496ED',
  'Best Practices':'#2A7A2A',
  Career:         '#C8A97E',
}

const ALL = 'All'

export default function BlogList() {
  const { isMobile, isTablet } = useResponsive()
    useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const ref1 = useFadeIn(0)
  const ref2 = useFadeIn(150)

  const categories = [ALL, ...Array.from(new Set(blogs.map(b => b.category)))]
  const [active, setActive] = useState(ALL)
  const [search, setSearch] = useState('')

  const filtered = blogs.filter(b => {
    const matchCat  = active === ALL || b.category === active
    const matchText = b.title.toLowerCase().includes(search.toLowerCase()) ||
                      b.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchText
  })

  return (
    <>
      <Cursor />
      {/* Nav */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        padding: isMobile ? '16px 20px' : '24px 48px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        background:'var(--cream)',borderBottom:'1px solid var(--light)',
      }}>
        <Link to="/" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'22px',letterSpacing:'.1em',color:'var(--ink)',textDecoration:'none'}}>
          ← Vikral
        </Link>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--mid)'}}>
          Blog
        </span>
        <Link to="/#contact" style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',background:'var(--accent)',color:'#fff',padding:'6px 14px',borderRadius:'100px',textDecoration:'none'}}>
          Hire Me
        </Link>
      </nav>

      <main style={{paddingTop: isMobile ? '70px' : '90px', minHeight:'100vh'}}>
        {/* Hero */}
        <div style={{
          padding: isMobile ? '60px 20px 40px' : '80px 48px 60px',
          borderBottom:'1px solid var(--light)',
          background:'var(--ink)',color:'var(--cream)',
          position:'relative',overflow:'hidden',
        }}>
          <div style={{position:'absolute',top:'-60px',right:'-20px',fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(100px,20vw,300px)',color:'transparent',WebkitTextStroke:'1px #1A1A1A',lineHeight:1,pointerEvents:'none',userSelect:'none'}}>
            BLOG
          </div>
          <div ref={ref1} style={{position:'relative',zIndex:1}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--warm)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
              <span style={{width:'24px',height:'1px',background:'var(--warm)',display:'block'}}/>
              Writing & Insights
            </div>
            <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(48px,8vw,100px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--cream)',marginBottom:'20px'}}>
              Thoughts on<br/>
              <em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Code & Craft</em>
            </h1>
            <p style={{fontSize:'15px',fontWeight:300,color:'#888',maxWidth:'500px',lineHeight:1.8}}>
              {blogs.length} articles on WordPress, Angular, PHP, and everything in between.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div ref={ref2} style={{
          padding: isMobile ? '24px 20px' : '28px 48px',
          borderBottom:'1px solid var(--light)',
          display:'flex',flexDirection: isMobile ? 'column' : 'row',
          gap:'16px',alignItems: isMobile ? 'stretch' : 'center',
          justifyContent:'space-between',
          position:'sticky',top: isMobile ? '58px' : '78px',
          background:'var(--cream)',zIndex:50,
        }}>
          {/* Category pills */}
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,
                letterSpacing:'.15em',textTransform:'uppercase',
                border:`1px solid ${active === cat ? 'var(--accent)' : 'var(--light)'}`,
                background: active === cat ? 'var(--accent)' : 'transparent',
                color: active === cat ? '#fff' : 'var(--mid)',
                padding:'6px 14px',borderRadius:'100px',cursor:'pointer',
                transition:'all .2s',
              }}>
                {cat}
              </button>
            ))}
          </div>
          {/* Search */}
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search articles…"
            style={{
              fontFamily:"'DM Sans',sans-serif",fontSize:'13px',
              border:'1px solid var(--light)',background:'transparent',
              color:'var(--ink)',padding:'8px 16px',outline:'none',
              width: isMobile ? '100%' : '220px',
            }}
          />
        </div>

        {/* Grid */}
        <div style={{
          padding: isMobile ? '40px 20px' : '60px 48px',
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
          gap:'1px',
          background:'var(--light)',
          border:'1px solid var(--light)',
          margin: isMobile ? '0' : '0',
        }}>
          {filtered.length === 0 && (
            <div style={{gridColumn:'1/-1',padding:'80px 0',textAlign:'center',color:'var(--mid)',fontFamily:"'Syne',sans-serif",fontSize:'14px',background:'var(--cream)'}}>
              No articles match your search.
            </div>
          )}
          {filtered.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} index={i} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

function BlogCard({ blog, index }) {
  const [hover, setHover] = useState(false)
  const { isMobile } = useResponsive()
  const catColor = CATEGORY_COLORS[blog.category] || 'var(--accent)'

  return (
    <Link
      to={`/blog/${blog.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display:'block',textDecoration:'none',
        background: hover ? 'var(--ink)' : 'var(--cream)',
        padding: isMobile ? '28px 20px' : '36px 32px',
        position:'relative',overflow:'hidden',
        transition:'background .35s',
      }}
    >
      {/* Accent bottom line */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'2px',background:'var(--accent)',transform:hover?'scaleX(1)':'scaleX(0)',transformOrigin:'left',transition:'transform .35s'}}/>

      {/* Cover image or gradient */}
      {blog.cover ? (
        <div style={{width:'100%',aspectRatio:'16/9',marginBottom:'20px',overflow:'hidden'}}>
          <img src={blog.cover} alt={blog.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .5s',transform:hover?'scale(1.04)':'scale(1)'}}/>
        </div>
      ) : (
        <div style={{
          width:'100%',aspectRatio:'16/9',marginBottom:'20px',
          background:`linear-gradient(135deg, ${catColor}22, ${catColor}44)`,
          display:'flex',alignItems:'center',justifyContent:'center',
          overflow:'hidden',position:'relative',
        }}>
          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(20px,4vw,48px)',color: hover?'rgba(255,255,255,.15)':'rgba(0,0,0,.07)',letterSpacing:'-.01em',userSelect:'none',textAlign:'center',padding:'0 16px'}}>
            {blog.title.toUpperCase()}
          </span>
          <div style={{position:'absolute',top:'12px',right:'12px',width:'8px',height:'8px',borderRadius:'50%',background:catColor}}/>
        </div>
      )}

      {/* Meta */}
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px',flexWrap:'wrap'}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',background:catColor,color:'#fff',padding:'3px 10px',borderRadius:'2px'}}>{blog.category}</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',color: hover?'#777':'var(--mid)',letterSpacing:'.05em',transition:'color .35s'}}>{blog.date}</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',color: hover?'#666':'var(--light)',transition:'color .35s'}}>· {blog.readTime}</span>
      </div>

      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize: isMobile?'16px':'18px',fontWeight:800,color: hover?'var(--cream)':'var(--ink)',marginBottom:'10px',lineHeight:1.3,transition:'color .35s'}}>
        {blog.title}
      </h2>
      <p style={{fontSize:'13px',color: hover?'#aaa':'var(--mid)',lineHeight:1.7,fontWeight:300,transition:'color .35s'}}>
        {blog.excerpt}
      </p>
      <div style={{marginTop:'20px',fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color: hover?'var(--warm)':'var(--accent)',display:'flex',alignItems:'center',gap:'6px',transition:'color .35s'}}>
        Read Article <span style={{transition:'transform .3s',transform:hover?'translateX(4px)':'none',display:'inline-block'}}>→</span>
      </div>
    </Link>
  )
}
