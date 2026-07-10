import React, { useState } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { useResponsive } from '../hooks/useResponsive'

export default function Contact() {
  const ref1 = useFadeIn(0), ref2 = useFadeIn(100), ref3 = useFadeIn(150), ref4 = useFadeIn(200)
  const { isMobile, isTablet } = useResponsive()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const py = isMobile ? '72px' : '120px'

  const [form, setForm]       = useState({ name:'', email:'', phone:'', message:'' })
  const [errors, setErrors]   = useState({})
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    // Clear field error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim())
      newErrors.name = 'Name is required.'
    if (!form.email.trim())
      newErrors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address.'
    if (!form.phone.trim())
      newErrors.phone = 'Phone number is required.'
    else if (!/^\+?[\d\s\-().]{7,20}$/.test(form.phone))
      newErrors.phone = 'Enter a valid phone number.'
    if (!form.message.trim())
      newErrors.message = 'Message is required.'
    else if (form.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters.'
    return newErrors
  }

  const handleSubmit = async () => {
    setSubmitError('')
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    try {
      const res = await fetch('https://formsubmit.co/ajax/vikralshubham1@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:      form.name,
          email:     form.email,
          phone:     form.phone,
          message:   form.message,
          _subject:  `New message from ${form.name} — Portfolio`,
          _template: 'table',
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setSent(true)
        setForm({ name:'', email:'', phone:'', message:'' })
        setErrors({})
        setTimeout(() => setSent(false), 4000)
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  /* ── Styles ── */
  const fld = { display:'flex', flexDirection:'column' }

  const lbl = (hasError) => ({
    fontFamily: "'Syne',sans-serif",
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '.2em',
    textTransform: 'uppercase',
    color: hasError ? '#FF5555' : '#555',
    padding: '16px 20px 0',
    background: '#111',
    transition: 'color .2s',
  })

  const inp = (hasError) => ({
    background: '#111',
    border: 'none',
    borderBottom: `1px solid ${hasError ? '#FF5555' : 'transparent'}`,
    outline: 'none',
    color: 'var(--cream)',
    fontFamily: "'DM Sans',sans-serif",
    fontSize: '15px',
    fontWeight: 300,
    padding: '8px 20px 16px',
    width: '100%',
    transition: 'border-color .2s',
  })

  const errMsg = {
    fontFamily: "'Syne',sans-serif",
    fontSize: '10px',
    color: '#FF5555',
    padding: '4px 20px 8px',
    background: '#111',
    letterSpacing: '.05em',
  }

  return (
    <section id="contact" style={{ padding:`${py} ${px}`, background:'var(--ink)', color:'var(--cream)' }}>

      {/* Label */}
      <div ref={ref1} style={{ fontFamily:"'Syne',sans-serif", fontSize:'11px', fontWeight:700, letterSpacing:'.25em', textTransform:'uppercase', color:'var(--warm)', display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--warm)', display:'block' }}/>
        Get In Touch
      </div>

      {/* Heading */}
      <div ref={ref2} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(40px,7vw,76px)', lineHeight:.9, letterSpacing:'-.01em', color:'var(--cream)' }}>
        What's<br/>
        <em style={{ fontFamily:"'DM Serif Display',serif", fontStyle:'italic', color:'var(--accent)' }}>Next?</em>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '80px', alignItems:'start', marginTop: isMobile ? '40px' : '64px' }}>

        {/* Left — info */}
        <div ref={ref3}>
          <p style={{ fontFamily:"'DM Serif Display',serif", fontStyle:'italic', fontSize: isMobile ? '17px' : '20px', color:'var(--warm)', lineHeight:1.7, marginBottom:'32px' }}>
            I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <a href="mailto:vikralshubham1@gmail.com" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: isMobile ? '20px' : '26px', letterSpacing:'.05em', color:'var(--cream)', textDecoration:'none', display:'block', marginBottom:'40px', wordBreak:'break-all' }}>
            vikralshubham1@gmail.com
          </a>
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            {[
              ['Location', 'India — Open to Remote'],
              ['Stack',    'WordPress, Angular, PHP, Laravel'],
              ['Status',   '● Available for Work', 'var(--accent)'],
            ].map(([label, val, color], i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'16px' }}>
                <span style={{ fontFamily:"'Syne',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#555', width:'80px', flexShrink:0, paddingTop:'2px' }}>{label}</span>
                <span style={{ fontSize:'14px', color: color || '#888' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div ref={ref4} style={{ display:'flex', flexDirection:'column', gap:'2px' }}>

          {/* Name + Email row */}
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'2px' }}>
            <div style={fld}>
              <label style={lbl(!!errors.name)}>Your Name *</label>
              <input
                name="name" value={form.name} onChange={handleChange}
                placeholder="John Doe" style={inp(!!errors.name)}
              />
              {errors.name && <span style={errMsg}>{errors.name}</span>}
            </div>
            <div style={fld}>
              <label style={lbl(!!errors.email)}>Your Email *</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="john@email.com" style={inp(!!errors.email)}
              />
              {errors.email && <span style={errMsg}>{errors.email}</span>}
            </div>
          </div>

          {/* Phone */}
          <div style={fld}>
            <label style={lbl(!!errors.phone)}>Phone Number *</label>
            <input
              name="phone" type="tel" value={form.phone} onChange={handleChange}
              placeholder="+1 234 567 890" style={inp(!!errors.phone)}
            />
            {errors.phone && <span style={errMsg}>{errors.phone}</span>}
          </div>

          {/* Message */}
          <div style={fld}>
            <label style={lbl(!!errors.message)}>Your Message *</label>
            <textarea
              name="message" value={form.message} onChange={handleChange}
              placeholder="Tell me about your project…"
              style={{ ...inp(!!errors.message), minHeight:'140px', resize:'none' }}
            />
            {errors.message && <span style={errMsg}>{errors.message}</span>}
          </div>

          {/* Network / server error */}
          {submitError && (
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:'11px', color:'#FF5555', padding:'8px 0', textAlign:'center', letterSpacing:'.05em' }}>
              {submitError}
            </p>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading || sent}
            style={{
              display: 'flex', alignItems:'center', justifyContent:'center', gap:'14px',
              background: sent ? '#2A7A2A' : loading ? '#444' : 'var(--accent)',
              color: '#fff',
              fontFamily: "'Syne',sans-serif", fontSize:'12px', fontWeight:700,
              letterSpacing: '.15em', textTransform:'uppercase',
              border: 'none', padding:'20px 40px',
              cursor: loading || sent ? 'default' : 'pointer',
              transition: 'background .3s',
              width: '100%', marginTop:'2px',
              opacity: loading ? .7 : 1,
            }}
          >
            {sent ? '✓ Message Sent!' : loading ? 'Sending…' : 'Send Message →'}
          </button>

        </div>
      </div>
    </section>
  )
}