import React from 'react'
import Cursor       from './components/Cursor.jsx'
import Nav          from './components/Nav.jsx'
import Hero         from './components/Hero.jsx'
import Marquee      from './components/Marquee.jsx'
import About        from './components/About.jsx'
import Skills       from './components/Skills.jsx'
import Experience   from './components/Experience.jsx'
import Work         from './components/Work.jsx'
import MoreProjects from './components/MoreProjects.jsx'
import Services     from './components/Services.jsx'
import Why          from './components/Why.jsx'
import Process      from './components/Process.jsx'
import Testimonials from './components/Testimonials.jsx'
import BlogPreview  from './components/BlogPreview.jsx'
import Contact      from './components/Contact.jsx'
import CTA          from './components/CTA.jsx'
import Footer       from './components/Footer.jsx'
import { usePageMeta } from './hooks/usePageMeta.js'
import { SITE, homeJsonLd } from './seo/siteConfig.js'

export default function App() {
  usePageMeta({
    title: SITE.title,
    description: SITE.description,
    path: '/',
    type: 'website',
    jsonLd: homeJsonLd(),
  })

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Experience />
      <Work />
      <MoreProjects />
      <Services />
      <Why />
      <Process />
      <Testimonials />
      <BlogPreview />
      <Contact />
      <CTA />
      <Footer />
    </>
  )
}
