import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive.js'
import Cursor from '../components/Cursor.jsx'
import Footer from '../components/Footer.jsx'

/* ── Scroll progress ── */
function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      const h  = el.scrollHeight - el.clientHeight
      setP(h > 0 ? ((el.scrollTop || document.body.scrollTop) / h) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,height:'4px',zIndex:9999,background:'var(--light)'}}>
      <div style={{height:'100%',width:`${p}%`,background:'var(--accent)',transition:'width .05s linear'}}/>
    </div>
  )
}

/* ── Counter ── */
function Counter({ target, suffix='' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let n = 0
      const step = target / 50
      const t = setInterval(() => {
        n += step
        if (n >= target) { setVal(target); clearInterval(t) }
        else setVal(Math.floor(n))
      }, 20)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ── Fade in on scroll ── */
function FadeIn({ children, delay=0, style={} }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(40px)',
      transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  )
}

/* ── Glitch text ── */
function Glitch({ text, size='clamp(56px,10vw,140px)', color='var(--ink)' }) {
  const [active, setActive] = useState(false)
  return (
    <span
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{
        fontFamily:"'Bebas Neue',sans-serif",
        fontSize: size,
        letterSpacing:'-.02em',
        lineHeight:.88,
        color,
        display:'inline-block',
        position:'relative',
        cursor:'default',
        userSelect:'none',
      }}
    >
      {text}
      {active && (
        <>
          <span style={{position:'absolute',top:0,left:0,color:'var(--accent)',clipPath:'inset(0 0 60% 0)',transform:'translate(-3px,0)',pointerEvents:'none',fontFamily:"'Bebas Neue',sans-serif",fontSize:size,letterSpacing:'-.02em',lineHeight:.88,animation:'glitch1 .15s steps(1) infinite'}}>{text}</span>
          <span style={{position:'absolute',top:0,left:0,color:'var(--warm)',clipPath:'inset(60% 0 0 0)',transform:'translate(3px,0)',pointerEvents:'none',fontFamily:"'Bebas Neue',sans-serif",fontSize:size,letterSpacing:'-.02em',lineHeight:.88,animation:'glitch2 .2s steps(1) infinite'}}>{text}</span>
        </>
      )}
    </span>
  )
}

/* ── Flip card ── */
function FlipCard({ front, back, frontBg='var(--cream)', backBg='var(--ink)' }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div onClick={() => setFlipped(f => !f)} style={{perspective:'1000px',cursor:'pointer',height:'100%'}}>
      <div style={{position:'relative',transformStyle:'preserve-3d',transition:'transform .7s cubic-bezier(.4,0,.2,1)',transform:flipped?'rotateY(180deg)':'none',minHeight:'240px',height:'100%'}}>
        <div style={{position:'absolute',inset:0,backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden',background:frontBg,border:'1px solid var(--light)',padding:'32px 28px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          {front}
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.2em',color:'var(--mid)',textTransform:'uppercase'}}>tap to flip →</span>
        </div>
        <div style={{position:'absolute',inset:0,backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden',transform:'rotateY(180deg)',background:backBg,padding:'32px 28px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
          {back}
        </div>
      </div>
    </div>
  )
}

/* ── Marquee ── */
function Marquee({ items, reverse=false, dark=false }) {
  const doubled = [...items,...items]
  return (
    <div style={{overflow:'hidden',whiteSpace:'nowrap',background:dark?'var(--ink)':'var(--cream)',padding:'14px 0',borderTop:`1px solid ${dark?'#1a1a1a':'var(--light)'}`,borderBottom:`1px solid ${dark?'#1a1a1a':'var(--light)'}`}}>
      <div style={{display:'inline-flex',animation:`${reverse?'marqueeR':'marquee'} 30s linear infinite`}}>
        {doubled.map((item,i) => (
          <span key={i} style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(14px,2vw,19px)',letterSpacing:'.15em',color:dark?'#2a2a2a':'var(--mid)',padding:'0 24px',display:'inline-flex',alignItems:'center',gap:'24px'}}>
            {item}
            <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--accent)',display:'inline-block',flexShrink:0}}/>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Rashmirathi quote slider ── */
const rashmirathiQuotes = [
  {
    lines: ["सच है, विपत्ति जब आती है, कायर को ही दहलाती है,", "शूरमा नहीं विचलित होते, क्षण एक नहीं धीरज खोते,", "विघ्नों को गले लगाते हैं, काँटों में राह बनाते हैं।"],
    meaning: "The brave do not waver in adversity — they embrace obstacles and carve paths through thorns."
  },
  {
    lines: ["प्रासादों के कनकाभ शिखर,", "होते कबूतरों के ही घर,", "महलों में गरुड़ ना होता है, कंचन पर कभी न सोता है।"],
    meaning: "Golden palaces are homes to pigeons — the eagle never rests on gold."
  },
  {
    lines: ["तेजस्वी सम्मान खोजते नहीं गोत्र बतलाके,", "पाते हैं जग से प्रशस्ति अपना करतब दिखलाके।", "वीर खींचकर ही रहते हैं इतिहासों में लीक।"],
    meaning: "The brilliant earn respect through their deeds, not their lineage. Heroes etch their own mark in history."
  },
  {
    lines: ["सौभाग्य न सब दिन सोता है,", "देखें, आगे क्या होता है?"],
    meaning: "Fortune does not sleep forever — wait and watch what unfolds ahead."
  },
  {
    lines: ["लेकिन, नौका तट छोड़ चली,", "कुछ पता नहीं, किस ओर चली।", "यह बीच नदी की धारा है, सूझता न कूल-किनारा है।"],
    meaning: "The boat has left the shore, destination unknown — adrift in the current, no bank in sight."
  },
  {
    lines: ["मुझसे मनुष्य जो होते हैं,", "कंचन का भार न ढोते हैं,", "पाते हैं धन बिखराने को, लाते हैं रतन लुटाने को।"],
    meaning: "True men do not hoard gold — they gather wealth only to scatter it, collect gems only to give them away."
  },
]

function QuoteSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('up') // 'up' | 'down'
  const timerRef = useRef(null)

  const goTo = (idx, dir = 'up') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 420)
  }

  const next = () => goTo((current + 1) % rashmirathiQuotes.length, 'up')
  const prev = () => goTo((current - 1 + rashmirathiQuotes.length) % rashmirathiQuotes.length, 'down')

  // Auto-advance every 5 seconds
  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [current])

  const q = rashmirathiQuotes[current]

  return (
    <div style={{
      borderLeft: '3px solid var(--accent)',
      paddingLeft: '24px',
      position: 'relative',
      minHeight: '160px',
    }}>
      {/* Quote text */}
      <div style={{
        overflow: 'hidden',
        marginBottom: '12px',
      }}>
        <div style={{
          transform: animating
            ? `translateY(${direction === 'up' ? '-100%' : '100%'})`
            : 'translateY(0)',
          opacity: animating ? 0 : 1,
          transition: 'transform .42s cubic-bezier(.4,0,.2,1), opacity .42s ease',
        }}>
          {q.lines.map((line, i) => (
            <p key={i} style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(14px,1.5vw,18px)',
              color: 'var(--ink)',
              lineHeight: 1.85,
              margin: 0,
            }}>{line}</p>
          ))}
        </div>
      </div>

      {/* Meaning */}
      <div style={{
        transform: animating
          ? `translateY(${direction === 'up' ? '-20px' : '20px'})`
          : 'translateY(0)',
        opacity: animating ? 0 : 1,
        transition: 'transform .42s cubic-bezier(.4,0,.2,1) .05s, opacity .42s ease .05s',
        marginBottom: '20px',
      }}>
        <p style={{
          fontSize: '12px',
          color: 'var(--mid)',
          fontWeight: 300,
          lineHeight: 1.7,
          fontStyle: 'normal',
          fontFamily: "'DM Sans', sans-serif",
        }}>{q.meaning}</p>
      </div>

      {/* Footer row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: 'var(--mid)',
        }}>— Dinkar, Rashmirathi</span>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Prev */}
          <button onClick={prev} style={{
            width: '28px', height: '28px',
            border: '1px solid var(--light)',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--mid)',
            transition: 'border-color .2s, color .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--light)'; e.currentTarget.style.color='var(--mid)' }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {rashmirathiQuotes.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > current ? 'up' : 'down')} style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                borderRadius: '100px',
                background: i === current ? 'var(--accent)' : 'var(--light)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width .3s, background .3s',
              }}/>
            ))}
          </div>

          {/* Next */}
          <button onClick={next} style={{
            width: '28px', height: '28px',
            border: '1px solid var(--light)',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--mid)',
            transition: 'border-color .2s, color .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--light)'; e.currentTarget.style.color='var(--mid)' }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Horizontal scroll section ── */
const hCards = [
  { num:'01', label:'First Language',   value:'PHP',                    sub:'Learnt in a hostel room at 1AM.' },
  { num:'02', label:'Favourite Editor', value:'VS Code',                sub:'Dracula theme. Always.' },
  { num:'03', label:'Lines of Code',    value:'∞',                      sub:'And counting. Every night.' },
  { num:'04', label:'Cups of Chai',     value:'3/day',                  sub:'Minimum. Non-negotiable.' },
  { num:'05', label:'Based In',         value:'Noida, UP',           sub:'Born Bihari. Noida raised. Forever both.' },
  { num:'06', label:'Rides Taken',      value:'Countless',              sub:'Best thinking happens on the road.' },
  { num:'07', label:'Favourite Film',   value:'Kung Fu Panda',          sub:'Po is the most relatable character ever written.' },
  { num:'08', label:'Core Belief',      value:'Ship it.',               sub:'Perfect is the enemy of live.' },
  { num:'09', label:'Work Hours',       value:'Post Midnight',          sub:'Noida sleeps. I build.' },
  { num:'10', label:'Stack of Choice',  value:'WordPress + Angular',    sub:'Four years deep. Still learning.' },
]

function HorizontalScroll() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const { isMobile } = useResponsive()

  useEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const handleScroll = () => {
      const rect   = section.getBoundingClientRect()
      const sticky = section.offsetTop
      const scrolled = window.scrollY - sticky

      // Total horizontal travel = track width minus viewport width
      const maxScroll = track.scrollWidth - window.innerWidth
      const sectionH  = section.offsetHeight - window.innerHeight

      if (scrolled < 0 || scrolled > sectionH) return

      const progress = scrolled / sectionH
      track.style.transform = `translateX(-${progress * maxScroll}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // Mobile: just a normal horizontal snap scroll
  if (isMobile) {
    return (
      <section style={{background:'var(--cream)',borderTop:'1px solid var(--light)',padding:'64px 0'}}>
        <div style={{padding:'0 20px',marginBottom:'32px'}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
            <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>
            Fast Facts
          </div>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(44px,10vw,72px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--ink)'}}>
            The Quick<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Reel</em>
          </h2>
        </div>
        {/* Snap scroll container */}
        <div style={{
          display:'flex',overflowX:'auto',gap:'2px',
          scrollSnapType:'x mandatory',
          WebkitOverflowScrolling:'touch',
          paddingBottom:'16px',
          scrollbarWidth:'none',
        }}>
          {hCards.map((c,i) => (
            <div key={i} style={{
              flexShrink:0,
              width:'80vw',
              scrollSnapAlign:'start',
              background: i % 2 === 0 ? 'var(--cream)' : 'var(--ink)',
              border:'1px solid var(--light)',
              padding:'36px 28px',
            }}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'48px',color: i%2===0?'var(--light)':'#222',lineHeight:1,marginBottom:'16px'}}>{c.num}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'8px'}}>{c.label}</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(28px,6vw,40px)',color: i%2===0?'var(--ink)':'var(--cream)',lineHeight:1,marginBottom:'12px'}}>{c.value}</div>
              <p style={{fontSize:'13px',color: i%2===0?'var(--mid)':'#666',fontWeight:300,lineHeight:1.7}}>{c.sub}</p>
            </div>
          ))}
        </div>
        <p style={{textAlign:'center',fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--mid)',marginTop:'12px'}}>← swipe →</p>
      </section>
    )
  }

  // Desktop: sticky section with scroll-driven horizontal translate
  // Height = cards scrollWidth equivalent so user scrolls enough
  const cardW    = 340
  const totalW   = hCards.length * (cardW + 2)
  const stickyH  = totalW   // px of vertical scroll = horizontal travel

  return (
    <section
      ref={sectionRef}
      style={{
        height: `${stickyH}px`,
        background:'var(--cream)',
        position:'relative',
        borderTop:'1px solid var(--light)',
      }}
    >
      {/* Sticky container */}
      <div style={{
        position:'sticky',
        top:0,
        height:'100vh',
        overflow:'hidden',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
      }}>
        {/* Label row */}
        <div style={{padding:'0 64px',marginBottom:'40px',flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
                <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>
                Fast Facts
              </div>
              <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(44px,6vw,80px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--ink)'}}>
                The Quick <em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Reel</em>
              </h2>
            </div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--mid)',display:'flex',alignItems:'center',gap:'10px'}}>
              <span>Scroll down to move forward</span>
              <span style={{display:'inline-block',animation:'bounceRight 1.2s ease infinite'}}>→</span>
            </div>
          </div>
        </div>

        {/* Scrolling track */}
        <div
          ref={trackRef}
          style={{
            display:'flex',
            gap:'2px',
            paddingLeft:'64px',
            willChange:'transform',
            transition:'transform .05s linear',
            flexShrink:0,
          }}
        >
          {hCards.map((c, i) => {
            const dark = i % 2 !== 0
            return (
              <div key={i} style={{
                width:`${cardW}px`,
                flexShrink:0,
                background: dark ? 'var(--ink)' : 'var(--cream)',
                border:`1px solid ${dark ? '#1a1a1a' : 'var(--light)'}`,
                padding:'44px 36px',
                position:'relative',
                overflow:'hidden',
                transition:'transform .3s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform='none'}
              >
                {/* Accent dot top right */}
                <div style={{position:'absolute',top:'20px',right:'20px',width:'8px',height:'8px',borderRadius:'50%',background:'var(--accent)'}}/>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'56px',color: dark?'#1f1f1f':'var(--light)',lineHeight:1,marginBottom:'20px'}}>{c.num}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'10px'}}>{c.label}</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(24px,3vw,36px)',color: dark?'var(--cream)':'var(--ink)',lineHeight:1,marginBottom:'16px'}}>{c.value}</div>
                <p style={{fontSize:'13px',color: dark?'#555':'var(--mid)',fontWeight:300,lineHeight:1.7}}>{c.sub}</p>
              </div>
            )
          })}
          {/* End card */}
          <div style={{
            width:`${cardW}px`,flexShrink:0,
            background:'var(--accent)',
            padding:'44px 36px',
            display:'flex',flexDirection:'column',
            justifyContent:'center',alignItems:'flex-start',
          }}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(32px,4vw,52px)',color:'#fff',lineHeight:1,marginBottom:'20px'}}>That's the<br/>Full Picture.</div>
            <Link to="/#contact" style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'#fff',border:'1px solid rgba(255,255,255,.4)',padding:'12px 20px',textDecoration:'none',display:'inline-block'}}>
              Let's Talk →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════
   MAIN PAGE
════════════════════════════════════ */
export default function KnowMe() {
  const { isMobile, isTablet } = useResponsive()
  const px   = isMobile ? '20px' : isTablet ? '32px' : '64px'
  const pyLg = isMobile ? '64px' : '100px'

  useEffect(() => { window.scrollTo(0,0) }, [])

  const hobbies = ['Riding Bikes','Long Drives','Exploring Noida','Hindi Literature','Cinema','Code at Night','Chai Runs','Hill Riding']

  const books = [
    { title:'Gunaho Ka Devta',          author:'Dharamvir Bharati',    note:"A story of love so pure it destroys you. Read it once, haunted forever." },
    { title:'Rashmirathi',              author:'Ramdhari Singh Dinkar', note:"Karna's saga. Epic poetry that makes you question every definition of loyalty." },
    { title:'Atomic Habits',            author:'James Clear',           note:"Changed how I think about every small decision in my daily work." },
    { title:'The Pragmatic Programmer', author:'Hunt & Thomas',         note:"Every developer's Bible. Dog-eared, annotated, re-read yearly." },
  ]

  const movies = [
    { title:'Kung Fu Panda',   tag:'Life Philosophy', emoji:'🥋', note:"Po taught me more about self-belief than any self-help book. Skadoosh." },
    { title:'Devdas',          tag:'Tragedy',         emoji:'🥀', note:"The most beautiful disaster ever put on screen. Pure emotion." },
    { title:'My Name is Khan', tag:'Courage',         emoji:'🕊️', note:'"My name is Khan and I am not a terrorist." Enough said.' },
    { title:'The Batman',      tag:'Dark Grit',       emoji:'🦇', note:"Not a superhero film. A detective story about obsession. Reeves got it right." },
    { title:'Man of Steel',    tag:'Origin',          emoji:'⚡', note:"The weight of being different. Clark Kent is every outsider who ever felt too much." },
  ]

  const philosophy = [
    { num:'I',   title:'Karna over Arjun',   body:"Dinkar's Rashmirathi shaped how I see loyalty and sacrifice. Fight your battle fully — win or lose — not half-heartedly." },
    { num:'II',  title:'Depth Over Width',    body:"I'd rather understand WordPress so deeply I could rebuild it than know 12 frameworks at surface level. Mastery takes time." },
    { num:'III', title:'Build for Humans',    body:"Code is a medium. The goal is always the person on the other end of the screen. Does this make someone's life easier?" },
    { num:'IV',  title:'Ride to Think',       body:"My best solutions come on a bike on an empty Noida road at dawn. Stillness and speed simultaneously. That's where ideas live." },
    { num:'V',   title:'Ships Beat Drafts',   body:"A launched site with rough edges beats a perfect design that never goes live. Done and learning beats perfect and theoretical." },
    { num:'VI',  title:'Chai Over Coffee',    body:"Every great decision in my life has been made over chai. Every terrible one too, probably. But at least the chai was good." },
  ]

  return (
    <>
      <Cursor />
      <ScrollProgress />

      {/* NAV */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        padding: isMobile ? '16px 20px' : '22px 64px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        background:'var(--cream)',borderBottom:'1px solid var(--light)',
      }}>
        <Link to="/" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'20px',letterSpacing:'.1em',color:'var(--ink)',textDecoration:'none'}}>← Shubham</Link>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--mid)'}}>Know Me</span>
        <Link to="/#contact" style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',background:'var(--accent)',color:'#fff',padding:'7px 16px',borderRadius:'100px',textDecoration:'none'}}>Hire Me</Link>
      </nav>

      <main>

        {/* ══ HERO — cream ══ */}
        <section style={{
          background:'var(--cream)',
          paddingTop: isMobile ? '76px' : '96px',
          minHeight:'100svh',
          display:'flex',flexDirection:'column',
          position:'relative',overflow:'hidden',
        }}>
          {!isMobile && (
            <div style={{position:'absolute',right:'-20px',top:'50%',transform:'translateY(-50%) rotate(90deg)',fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(60px,8vw,110px)',letterSpacing:'.2em',color:'transparent',WebkitTextStroke:'1px var(--light)',whiteSpace:'nowrap',pointerEvents:'none',userSelect:'none',transformOrigin:'center center'}}>
              NOIDA · UP · DEVELOPER
            </div>
          )}

          <div style={{padding:`${isMobile?'40px 20px 0':'60px 64px 0'}`,flex:1,display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',zIndex:1}}>
            <FadeIn>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'28px'}}>
                <span style={{width:'32px',height:'1px',background:'var(--accent)',display:'block'}}/>
                Late 20s · Noida · Developer
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div style={{marginBottom:'8px'}}>
                <Glitch text="SHUBHAM" size={isMobile?'clamp(64px,18vw,110px)':'clamp(80px,13vw,180px)'} />
              </div>
              <div style={{marginBottom:'32px'}}>
                <em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',fontSize: isMobile ? 'clamp(52px,14vw,90px)' : 'clamp(64px,10vw,140px)',lineHeight:.88,color:'var(--accent)',letterSpacing:'-.01em'}}>Vikral.</em>
              </div>
            </FadeIn>
            <FadeIn delay={200} style={{display:'grid',gridTemplateColumns: isMobile?'1fr':'1fr 1fr',gap: isMobile?'32px':'80px',alignItems:'end',paddingBottom: isMobile?'48px':'80px'}}>
              <p style={{fontSize:'clamp(15px,1.6vw,18px)',fontWeight:300,color:'var(--mid)',lineHeight:1.9,maxWidth:'440px'}}>
                Not just a developer. A reader, a rider, a builder. Born Bihari, raised in Noida. This is the version of me that doesn't fit on a resume.
              </p>
              <QuoteSlider />
            </FadeIn>
          </div>
        </section>

        {/* ══ MARQUEE ══ */}
        <Marquee items={hobbies} dark />

        {/* ══ STATS — ink ══ */}
        <section style={{background:'var(--ink)',padding:`${pyLg} ${px}`}}>
          <div style={{display:'grid',gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',gap:'1px',background:'#1a1a1a',border:'1px solid #1a1a1a'}}>
            {[
              { num:4,  suf:'+', label:'Years\nCoding' },
              { num:15, suf:'+', label:'Projects\nShipped' },
              { num:3,  suf:'',  label:'Companies\nWorked' },
              { num:27, suf:'',  label:'Years\nOld' },
            ].map((s,i) => (
              <div key={i} style={{background:'#0d0d0d',padding: isMobile?'40px 20px':'56px 40px',textAlign:'center'}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(64px,8vw,100px)',lineHeight:1,color:'var(--cream)'}}>
                  <Counter target={s.num} suffix={s.suf}/>
                </div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'#444',marginTop:'8px',whiteSpace:'pre-line'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ ORIGIN — ink ══ */}
        <section style={{background:'var(--ink)',color:'var(--cream)',padding:`${pyLg} ${px}`,borderTop:'1px solid #1a1a1a',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-30px',left:'-20px',fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(100px,18vw,260px)',color:'transparent',WebkitTextStroke:'1px #161616',lineHeight:1,pointerEvents:'none',userSelect:'none'}}>ORIGIN</div>
          <div style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?'48px':'80px',alignItems:'start'}}>
            <FadeIn>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
                <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>
                The Origin Story
              </div>
              <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(44px,6vw,80px)',lineHeight:.9,letterSpacing:'-.01em',marginBottom:'32px'}}>
                How It All<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Started</em>
              </h2>
              {/* Image placeholder */}
              <div style={{
                width:'100%',maxWidth:'360px',
                aspectRatio:'4/3',
                background:'linear-gradient(135deg,#1a1a1a,#111)',
                border:'1px solid #222',
                display:'flex',flexDirection:'column',
                alignItems:'center',justifyContent:'center',
                gap:'12px',
                position:'relative',overflow:'hidden',
              }}>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(232,75,43,.08),transparent)'}}/>
                {/* Replace src with your actual image */}
                {/* <img src="/images/story.jpg" alt="My story" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/> */}
                <span style={{fontSize:'32px',position:'relative',zIndex:1}}>📸</span>
                <span style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'#333',position:'relative',zIndex:1}}>Add your photo here</span>
                <span style={{fontFamily:"'Syne',sans-serif",fontSize:'8px',color:'#222',position:'relative',zIndex:1}}>/images/story.jpg</span>
              </div>
            </FadeIn>
            <div style={{display:'flex',flexDirection:'column',gap:'28px'}}>
              {[
                { marker:'01', text:"As a kid in Noida, I'd stare at websites on our family's slow internet — not at the content. At the pages themselves. How did buttons glow? Who made this? That childlike \"how?\" never left me." },
                { marker:'02', text:"College hostel changed everything. My senior — final year CS — showed me my first <div> tag at 1AM on his laptop. Something clicked. Not the code. The power. You could build a world from nothing but text." },
                { marker:'03', text:"I stayed up every night after that. Copy-pasting HTML, breaking CSS, Googling why my background wouldn't change. The frustration was addictive. First time a layout looked like what I imagined — I was gone." },
                { marker:'04', text:"4 years. 3 companies. 15+ projects. That Bihari kid staring at websites didn't know he was looking at his future." },
              ].map((item,i) => (
                <FadeIn key={i} delay={i*80}>
                  <div style={{display:'flex',gap:'20px',alignItems:'flex-start'}}>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'36px',color:'#1f1f1f',lineHeight:1,flexShrink:0,marginTop:'-4px'}}>{item.marker}</span>
                    <p style={{fontSize:'15px',color:'#666',fontWeight:300,lineHeight:1.9}}>{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PHILOSOPHY — cream ══ */}
        <section style={{background:'var(--cream)',padding:`${pyLg} ${px}`,borderTop:'1px solid var(--light)'}}>
          <FadeIn>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
              <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>
              How I Think
            </div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(44px,7vw,90px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--ink)',marginBottom:'56px'}}>
              Life<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Philosophy</em>
            </h2>
          </FadeIn>
          <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':isTablet?'repeat(2,1fr)':'repeat(3,1fr)',gap:'1px',background:'var(--light)',border:'1px solid var(--light)'}}>
            {philosophy.map((item,i) => {
              const [hover,setHover] = useState(false)
              return (
                <FadeIn key={i} delay={i*60}>
                  <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
                    style={{background:hover?'var(--ink)':'var(--cream)',padding:isMobile?'32px 24px':'44px 36px',position:'relative',overflow:'hidden',transition:'background .4s',cursor:'default',height:'100%'}}>
                    <div style={{position:'absolute',bottom:0,left:0,right:0,height:'3px',background:'var(--accent)',transform:hover?'scaleX(1)':'scaleX(0)',transformOrigin:'left',transition:'transform .4s'}}/>
                    <div style={{position:'absolute',top:'-20px',right:'-10px',fontFamily:"'Bebas Neue',sans-serif",fontSize:'110px',color:hover?'#1a1a1a':'var(--light)',lineHeight:1,pointerEvents:'none',transition:'color .4s'}}>{item.num}</div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(20px,2.5vw,26px)',color:hover?'var(--cream)':'var(--ink)',marginBottom:'14px',position:'relative',zIndex:1,transition:'color .4s'}}>{item.title}</div>
                    <p style={{fontSize:'14px',color:hover?'#999':'var(--mid)',lineHeight:1.8,fontWeight:300,position:'relative',zIndex:1,transition:'color .4s'}}>{item.body}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </section>

        {/* ══ HORIZONTAL SCROLL ══ */}
        <HorizontalScroll />

        {/* ══ HOBBIES — ink ══ */}
        <section style={{background:'var(--ink)',color:'var(--cream)',padding:`${pyLg} ${px}`,borderTop:'1px solid #1a1a1a'}}>
          <FadeIn>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
              <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>
              Outside the Code
            </div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(44px,7vw,90px)',lineHeight:.9,letterSpacing:'-.01em',marginBottom:'48px'}}>
              Hobbies &<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Interests</em>
            </h2>
          </FadeIn>
          <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(2,1fr)',gap:'2px',background:'#1a1a1a',border:'1px solid #1a1a1a'}}>
            {/* Bikes — tall */}
            <FadeIn style={{gridRow:isMobile?'auto':'span 2'}}>
              <div style={{background:'#0d0d0d',padding:isMobile?'40px 24px':'56px 48px',height:'100%',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',gap:'20px'}}>
                <div style={{position:'absolute',bottom:'-20px',right:'-10px',fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(80px,12vw,160px)',color:'#111',lineHeight:1,pointerEvents:'none',userSelect:'none'}}>RIDE</div>
                {/* Bike image placeholder */}
                <div style={{width:'100%',aspectRatio:'16/9',background:'linear-gradient(135deg,#161616,#0a0a0a)',border:'1px solid #1f1f1f',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'8px',position:'relative',overflow:'hidden',flexShrink:0}}>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(232,75,43,.06),transparent)'}}/>
                  {/* Replace with: <img src="/images/bike.jpg" alt="My ride" style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
                  <span style={{fontSize:'40px',position:'relative',zIndex:1}}>🏍️</span>
                  <span style={{fontFamily:"'Syne',sans-serif",fontSize:'8px',color:'#222',position:'relative',zIndex:1,letterSpacing:'.15em',textTransform:'uppercase'}}>Add bike photo → /images/bike.jpg</span>
                </div>
                <div style={{position:'relative',zIndex:1}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(28px,4vw,44px)',color:'var(--cream)',marginBottom:'12px',lineHeight:1}}>Bikes & Long Drives</div>
                  <p style={{fontSize:'14px',color:'#666',fontWeight:300,lineHeight:1.9,maxWidth:'400px'}}>
                    There's a specific freedom on a Noida highway before the city wakes up. No notifications. No deadlines. Just road, engine, and thoughts. I ride to reset — my meditation and most productive thinking time.
                  </p>
                  <div style={{marginTop:'20px',display:'flex',gap:'8px',flexWrap:'wrap'}}>
                    {['Highway Rides','Hill Drives','Night Routes','Dawn Escapes'].map(t=>(
                      <span key={t} style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',border:'1px solid #222',color:'#444',padding:'5px 12px'}}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
            {/* Books */}
            <FadeIn delay={100}>
              <div style={{background:'#111',padding:isMobile?'36px 24px':'44px 40px',borderBottom:'2px solid #1a1a1a',display:'flex',flexDirection:'column',gap:'16px'}}>
                {/* Book image placeholder */}
                <div style={{width:'100%',aspectRatio:'16/7',background:'#0d0d0d',border:'1px solid #1f1f1f',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',overflow:'hidden',flexShrink:0}}>
                  {/* <img src="/images/books.jpg" alt="My books" style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
                  <span style={{fontSize:'24px'}}>📖</span>
                  <span style={{fontFamily:"'Syne',sans-serif",fontSize:'8px',color:'#222',letterSpacing:'.15em',textTransform:'uppercase'}}>/images/books.jpg</span>
                </div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(22px,3vw,32px)',color:'var(--cream)',lineHeight:1}}>Hindi Literature & Beyond</div>
                <p style={{fontSize:'14px',color:'#555',fontWeight:300,lineHeight:1.8}}>Gunaho Ka Devta broke me open at 19. Rashmirathi gave me Karna. Literature does what no tutorial can — it changes how you see everything.</p>
              </div>
            </FadeIn>
            {/* Cinema */}
            <FadeIn delay={200}>
              <div style={{background:'#0a0a0a',padding:isMobile?'36px 24px':'44px 40px',display:'flex',flexDirection:'column',gap:'16px'}}>
                {/* Cinema image placeholder */}
                <div style={{width:'100%',aspectRatio:'16/7',background:'#0d0d0d',border:'1px solid #1f1f1f',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',overflow:'hidden',flexShrink:0}}>
                  {/* <img src="/images/cinema.jpg" alt="Cinema" style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
                  <span style={{fontSize:'24px'}}>🎬</span>
                  <span style={{fontFamily:"'Syne',sans-serif",fontSize:'8px',color:'#222',letterSpacing:'.15em',textTransform:'uppercase'}}>/images/cinema.jpg</span>
                </div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(22px,3vw,32px)',color:'var(--cream)',lineHeight:1}}>Cinema That Hits Different</div>
                <p style={{fontSize:'14px',color:'#555',fontWeight:300,lineHeight:1.8}}>From Po learning to believe in himself to Devdas self-destructing beautifully — I watch for the feeling, not the plot.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ BOOKS — cream ══ */}
        <section style={{background:'var(--cream)',padding:`${pyLg} ${px}`,borderTop:'1px solid var(--light)'}}>
          <FadeIn>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
              <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>
              Currently On My Shelf
            </div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(44px,7vw,90px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--ink)',marginBottom:'48px'}}>
              Books I<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Live By</em>
            </h2>
          </FadeIn>
          <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':isTablet?'repeat(2,1fr)':'repeat(4,1fr)',gap:'1px',background:'var(--light)',border:'1px solid var(--light)'}}>
            {books.map((book,i) => (
              <FadeIn key={i} delay={i*80}>
                <FlipCard
                  frontBg='var(--cream)' backBg='var(--ink)'
                  front={
                    <div>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(18px,2.5vw,24px)',color:'var(--ink)',marginBottom:'8px',lineHeight:1.1}}>{book.title}</div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--accent)'}}>{book.author}</div>
                    </div>
                  }
                  back={<p style={{fontSize:'14px',color:'#ccc',fontWeight:300,lineHeight:1.8,fontFamily:"'DM Sans',sans-serif"}}>{book.note}</p>}
                />
              </FadeIn>
            ))}
          </div>
          <p style={{fontFamily:"'Syne',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--mid)',textAlign:'center',marginTop:'16px'}}>Tap any card for my take on it</p>
        </section>

        {/* ══ MOVIES — ink ══ */}
        <section style={{background:'var(--ink)',color:'var(--cream)',padding:`${pyLg} ${px}`,borderTop:'1px solid #1a1a1a'}}>
          <FadeIn>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:'11px',fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--accent)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
              <span style={{width:'24px',height:'1px',background:'var(--accent)',display:'block'}}/>
              Films That Stayed With Me
            </div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(44px,7vw,90px)',lineHeight:.9,letterSpacing:'-.01em',marginBottom:'48px'}}>
              Movies I<br/><em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Rewatch</em>
            </h2>
          </FadeIn>
          <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'#1a1a1a',border:'1px solid #1a1a1a'}}>
            {movies.map((film,i) => {
              const [hover,setHover] = useState(false)
              return (
                <FadeIn key={i} delay={i*60}>
                  <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
                    style={{background:hover?'#111':'#0d0d0d',padding:isMobile?'24px 20px':'28px 48px',display:'grid',gridTemplateColumns:isMobile?'auto 1fr':'80px 1fr 1fr',gap:isMobile?'16px':'40px',alignItems:'center',transition:'background .35s',position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',left:0,top:0,bottom:0,width:'3px',background:'var(--accent)',transform:hover?'scaleY(1)':'scaleY(0)',transformOrigin:'top',transition:'transform .4s'}}/>
                    <div style={{fontSize:isMobile?'32px':'40px',lineHeight:1}}>{film.emoji}</div>
                    <div>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(20px,2.5vw,28px)',color:'var(--cream)',lineHeight:1,marginBottom:'8px'}}>{film.title}</div>
                      <span style={{fontFamily:"'Syne',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',background:'var(--accent)',color:'#fff',padding:'3px 10px'}}>{film.tag}</span>
                    </div>
                    <p style={{fontSize:'14px',color:hover?'#888':'#444',fontWeight:300,lineHeight:1.7,transition:'color .3s'}}>{film.note}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </section>

        {/* ══ CTA — cream ══ */}
        <section style={{background:'var(--cream)',padding:isMobile?'80px 20px':'120px 64px',borderTop:'1px solid var(--light)',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(60px,16vw,240px)',color:'transparent',WebkitTextStroke:'1px var(--light)',whiteSpace:'nowrap',pointerEvents:'none',userSelect:'none',lineHeight:1}}>
            LET'S BUILD
          </div>
          <FadeIn style={{position:'relative',zIndex:1}}>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(48px,8vw,110px)',lineHeight:.9,letterSpacing:'-.01em',color:'var(--ink)',marginBottom:'36px'}}>
              Let's Make<br/>
              <em style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',color:'var(--accent)'}}>Something Real.</em>
            </h2>
            <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
              <Link to="/#contact" style={{display:'inline-flex',alignItems:'center',gap:'12px',background:'var(--ink)',color:'var(--cream)',fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',textDecoration:'none',padding:'16px 32px'}}>
                Get In Touch →
              </Link>
              <Link to="/blog" style={{display:'inline-flex',alignItems:'center',gap:'12px',border:'1.5px solid var(--ink)',color:'var(--ink)',fontFamily:"'Syne',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',textDecoration:'none',padding:'16px 32px'}}>
                Read My Blog
              </Link>
            </div>
          </FadeIn>
        </section>

      </main>
      <Footer />
    </>
  )
}