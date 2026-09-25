import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogs } from '../data/blogs.js'
import { useResponsive } from '../hooks/useResponsive.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { SITE, absoluteUrl } from '../seo/siteConfig.js'
import ScrollProgress from '../components/ScrollProgress.jsx'
import Footer from '../components/Footer.jsx'
import Cursor from '../components/Cursor.jsx'

const CATEGORY_COLORS = {
  WordPress:'#E84B2B', Angular:'#DD0031', WooCommerce:'#7F54B3',
  PHP:'#777BB4', Laravel:'#FF2D20', CSS:'#264DE4', MySQL:'#00758F',
  JavaScript:'#F7DF1E', DevOps:'#2496ED', 'Best Practices':'#2A7A2A', Career:'#C8A97E',
}

/* ── Copy-code button injected into every <pre><code> block ── */
function useCopyButtons(contentRef, blogId) {
  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    // Remove any buttons injected by a previous render
    container.querySelectorAll('.copy-btn-wrapper').forEach(el => el.remove())

    container.querySelectorAll('pre').forEach(pre => {
      const code = pre.querySelector('code')
      if (!code) return

      pre.style.position = 'relative'

      const wrapper = document.createElement('div')
      wrapper.className = 'copy-btn-wrapper'
      wrapper.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 10;
      `

      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.setAttribute('aria-label', 'Copy code')
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>Copy</span>
      `
      btn.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: #888;
        background: #1a1a1a;
        border: 1px solid #2a2a2a;
        padding: 5px 10px;
        cursor: pointer;
        transition: color .2s, border-color .2s, background .2s;
        border-radius: 2px;
        white-space: nowrap;
      `

      btn.addEventListener('mouseenter', () => {
        btn.style.color = '#fff'
        btn.style.borderColor = 'var(--accent)'
        btn.style.background = '#222'
      })
      btn.addEventListener('mouseleave', () => {
        if (!btn.dataset.copied) {
          btn.style.color = '#888'
          btn.style.borderColor = '#2a2a2a'
          btn.style.background = '#1a1a1a'
        }
      })

      btn.addEventListener('click', async () => {
        // Decode HTML entities so copied text is clean code, not &lt; etc.
        const raw = code.innerHTML
        const txt = raw
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/<[^>]+>/g, '') // strip any remaining tags

        try {
          await navigator.clipboard.writeText(txt)
        } catch {
          // Fallback for older browsers
          const ta = document.createElement('textarea')
          ta.value = txt
          ta.style.position = 'fixed'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
        }

        // Success state
        btn.dataset.copied = 'true'
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Copied!</span>
        `
        btn.style.color = '#4ade80'
        btn.style.borderColor = '#4ade80'
        btn.style.background = '#0a1a0a'

        setTimeout(() => {
          delete btn.dataset.copied
          btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span>Copy</span>
          `
          btn.style.color = '#888'
          btn.style.borderColor = '#2a2a2a'
          btn.style.background = '#1a1a1a'
        }, 2000)
      })

      wrapper.appendChild(btn)
      pre.appendChild(wrapper)
    })

    return () => {
      if (contentRef.current) {
        contentRef.current.querySelectorAll('.copy-btn-wrapper').forEach(el => el.remove())
      }
    }
  }, [blogId])
}

/* ── Main component ─────────────────────────────────────────── */
export default function BlogDetail() {
  const { id } = useParams()
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const contentRef = useRef(null)
  const [tocOpen, setTocOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  const blog  = blogs.find(b => b.id === id)
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date))
  const index = sortedBlogs.findIndex(b => b.id === id)
  const prev  = index > 0 ? sortedBlogs[index - 1] : null
  const next  = index < sortedBlogs.length - 1 ? sortedBlogs[index + 1] : null

  useEffect(() => { window.scrollTo(0, 0) }, [id])
  useCopyButtons(contentRef, id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    const headings = contentRef.current?.querySelectorAll('h2')
    headings?.forEach((h) => observer.observe(h))

    return () => observer.disconnect()
  }, [blog])

  usePageMeta(
    blog
      ? {
          title: blog.title,
          description: blog.excerpt,
          path: `/blog/${blog.id}`,
          type: 'article',
          image: blog.cover || undefined,
          imageAlt: blog.cover ? blog.title : undefined,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blog.title,
            description: blog.excerpt,
            datePublished: blog.date,
            dateModified: blog.date,
            author: {
              '@type': 'Person',
              name: SITE.author,
              url: absoluteUrl('/'),
            },
            publisher: {
              '@type': 'Person',
              name: SITE.author,
              url: absoluteUrl('/'),
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': absoluteUrl(`/blog/${blog.id}`),
            },
            image: blog.cover || SITE.ogImage,
            articleSection: blog.category,
            keywords: [blog.category, 'web development', SITE.author].join(', '),
            inLanguage: 'en',
            url: absoluteUrl(`/blog/${blog.id}`),
          },
        }
      : {
          title: 'Post Not Found',
          description: 'The requested blog post could not be found.',
          path: `/blog/${id || ''}`,
          noindex: true,
          jsonLd: null,
        }
  )

  if (!blog) {
    return (
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'20px',fontFamily:"'Syne',sans-serif"}}>
        <div style={{fontSize:'80px',fontFamily:"'Bebas Neue',sans-serif",color:'var(--light)'}}>404</div>
        <div style={{fontSize:'16px',color:'var(--mid)'}}>Blog post not found.</div>
        <Link to="/blog" style={{fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--accent)',textDecoration:'none',border:'1px solid var(--accent)',padding:'12px 24px'}}>
          ← Back to Blog
        </Link>
      </div>
    )
  }

  const catColor = CATEGORY_COLORS[blog.category] || 'var(--accent)'

  return (
    <>
      <Cursor />
      <ScrollProgress />

      {/* Nav */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        padding: isMobile ? '16px 20px' : '24px 48px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        background:'var(--cream)',borderBottom:'1px solid var(--light)',
      }}>
        <Link to="/blog" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'22px',letterSpacing:'.1em',color:'var(--ink)',textDecoration:'none'}}>
          ← Blog
        </Link>
        {!isMobile && (
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:300,color:'var(--mid)',maxWidth:'400px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
            {blog.title}
          </span>
        )}
        <Link to="/#contact" style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',background:'var(--accent)',color:'#fff',padding:'6px 14px',borderRadius:'100px',textDecoration:'none'}}>
          Hire Me
        </Link>
      </nav>

      <main style={{paddingTop: isMobile ? '68px' : '88px'}}>

        {/* Hero Banner */}
        <div style={{
          padding: isMobile ? '48px 20px 40px' : '72px 48px 56px',
          background:'var(--ink)',color:'var(--cream)',
          position:'relative',overflow:'hidden',
        }}>
          <div style={{position:'absolute',top:'-40px',right:'-10px',fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(80px,16vw,220px)',color:'transparent',WebkitTextStroke:`1px ${catColor}22`,lineHeight:1,pointerEvents:'none',userSelect:'none'}}>
            {blog.category.toUpperCase()}
          </div>
          <div style={{position:'relative',zIndex:1,maxWidth:'800px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px',flexWrap:'wrap'}}>
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',background:catColor,color:'#fff',padding:'4px 12px',borderRadius:'2px'}}>{blog.category}</span>
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:'12px',color:'#666'}}>{blog.date}</span>
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:'12px',color:'#555'}}>· {blog.readTime}</span>
            </div>
            <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(32px,5.5vw,72px)',lineHeight:.95,letterSpacing:'-.01em',color:'var(--cream)',marginBottom:'20px'}}>
              {blog.title}
            </h1>
            <p style={{fontSize:'16px',fontWeight:300,color:'#888',lineHeight:1.8,maxWidth:'600px'}}>
              {blog.excerpt}
            </p>
          </div>
        </div>

        {/* Article body */}
        <div style={{
          maxWidth:'1200px',
          margin:'0 auto',
          display:'flex',
          gap: isMobile ? '0' : '40px',
          padding: isMobile ? '48px 20px 60px' : '72px 48px 80px',
          position:'relative',
        }}>
          {/* Desktop TOC Sidebar */}
          {!isMobile && (
            <aside style={{
              width:'240px',
              position:'sticky',
              top: isMobile ? '0' : '110px',
              height: 'fit-content',
              alignSelf:'start',
            }}>
              <div style={{
                fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'16px',display:'flex',alignItems:'center',gap:'8px'
              }}>
                <span style={{width:'12px',height:'12px',background:'var(--accent)',borderRadius:'2px'}}/>
                Table of Contents
              </div>
              <nav style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {blog.content.match(/<h2>(.*?)<\/h2>/g)?.map((h, i) => {
                  const text = h.replace(/<\/?h2>/g, '');
                  const id = text.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <a
                      key={i}
                      href={`#${id}`}
                      style={{
                        fontFamily:"'DM Sans',sans-serif",fontSize:'13px',color: activeId === id ? 'var(--ink)' : 'var(--mid)',
                        textDecoration:'none',transition:'color .2s',display:'block',
                        padding: '4px 0',borderLeft: activeId === id ? '2px solid var(--accent)' : '2px solid transparent',
                        paddingLeft: activeId === id ? '12px' : '12px',
                        fontWeight: activeId === id ? 600 : 400
                      }}
                    >
                      {text}
                    </a>
                  );
                })}
              </nav>
            </aside>
          )}

          <div style={{flex: 1, maxWidth:'760px'}}>
            <div
              ref={contentRef}
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: blog.content.replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
                  const id = p1.toLowerCase().replace(/\s+/g, '-');
                  return `<h2 id="${id}">${p1}</h2>`;
                })
              }}
            />
          </div>

          {/* Mobile TOC FAB & Overlay */}
          {isMobile && (
            <>
              <button
                onClick={() => setTocOpen(true)}
                style={{
                  position:'fixed',bottom:'30px',right:'20px',zIndex:200,
                  width:'48px',height:'48px',borderRadius:'50%',background:'var(--accent)',
                  color:'#fff',border:'none',cursor:'pointer',boxShadow:'0 4px 12px rgba(0,0,0,0.2)',
                  display:'flex',alignItems:'center',justifyContent:'center'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
              {tocOpen && (
                <div style={{
                  position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:300,
                  background:'var(--cream)',padding:'60px 24px',
                  display:'flex',flexDirection:'column',gap:'24px'
                }}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:'16px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--ink)'}}>Contents</div>
                    <button onClick={() => setTocOpen(false)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'var(--ink)'}}>&times;</button>
                  </div>
                  <nav style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                    {blog.content.match(/<h2>(.*?)<\/h2>/g)?.map((h, i) => {
                      const text = h.replace(/<\/?h2>/g, '');
                      const id = text.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <a
                          key={i}
                          href={`#${id}`}
                          onClick={() => setTocOpen(false)}
                          style={{
                            fontFamily:"'Syne',sans-serif",fontSize:'18px',fontWeight:600,color: activeId === id ? 'var(--accent)' : 'var(--ink)',
                            textDecoration:'none',borderBottom:'1px solid var(--light)',paddingBottom:'12px'
                          }}
                        >
                          {text}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              )}
            </>
          )}
        </div>

        {/* Divider */}
        <div style={{borderTop:'1px solid var(--light)',margin:`0 ${px}`}}/>

        {/* Prev / Next */}
        <div style={{
          padding: isMobile ? '40px 20px' : '48px 48px',
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:'1px',
          background:'var(--light)',
          border:'1px solid var(--light)',
        }}>
          {prev ? (
            <Link to={`/blog/${prev.id}`} style={{
              background:'var(--cream)',padding: isMobile?'24px 20px':'36px 32px',
              textDecoration:'none',display:'block',
              borderRight: isMobile ? 'none' : '1px solid var(--light)',
            }}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--mid)',marginBottom:'10px'}}>← Previous</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize: isMobile?'14px':'16px',fontWeight:800,color:'var(--ink)',lineHeight:1.3}}>{prev.title}</div>
            </Link>
          ) : <div style={{background:'var(--cream)'}}/>}

          {next ? (
            <Link to={`/blog/${next.id}`} style={{
              background:'var(--cream)',padding: isMobile?'24px 20px':'36px 32px',
              textDecoration:'none',display:'block',
              textAlign: isMobile ? 'left' : 'right',
            }}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--mid)',marginBottom:'10px'}}>Next →</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize: isMobile?'14px':'16px',fontWeight:800,color:'var(--ink)',lineHeight:1.3}}>{next.title}</div>
            </Link>
          ) : <div style={{background:'var(--cream)'}}/>}
        </div>

        {/* More articles */}
        <div style={{padding: isMobile?'48px 20px':'60px 48px',borderTop:'1px solid var(--light)'}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
            <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>
            More Articles
          </div>
          <div style={{display:'grid',gridTemplateColumns: isMobile?'1fr':isTablet?'repeat(2,1fr)':'repeat(3,1fr)',gap:'1px',background:'var(--light)',border:'1px solid var(--light)'}}>
            {blogs.filter(b => b.id !== id).slice(0,3).map(b => (
              <Link key={b.id} to={`/blog/${b.id}`} style={{background:'var(--cream)',padding:'24px 20px',textDecoration:'none',display:'block'}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:CATEGORY_COLORS[b.category]||'var(--accent)',marginBottom:'8px'}}>{b.category}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:'14px',fontWeight:800,color:'var(--ink)',lineHeight:1.3,marginBottom:'6px'}}>{b.title}</div>
                <div style={{fontSize:'12px',color:'var(--mid)',fontWeight:300}}>{b.readTime}</div>
              </Link>
            ))}
          </div>
          <div style={{marginTop:'32px',textAlign:'center'}}>
            <Link to="/blog" style={{display:'inline-flex',alignItems:'center',gap:'12px',border:'1.5px solid var(--ink)',color:'var(--ink)',fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',textDecoration:'none',padding:'14px 28px'}}>
              View All Articles →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}