import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import SocialFloat from './components/SocialFloat.jsx'
import MobileNav from './components/MobileNav.jsx'
import { usePageMeta } from './hooks/usePageMeta.js'

const App = lazy(() => import('./App.jsx'))
const BlogList = lazy(() => import('./pages/BlogList.jsx'))
const BlogDetail = lazy(() => import('./pages/BlogDetail.jsx'))
const KnowMe = lazy(() => import('./pages/KnowMe.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<main aria-label="Loading page" style={{ minHeight: '100vh', background: 'var(--cream)' }} />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/know-me" element={<KnowMe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <SocialFloat />
      <MobileNav />
    </BrowserRouter>
  </React.StrictMode>
)

function NotFound() {
  const location = useLocation()
  usePageMeta({ title: 'Page Not Found', description: 'The requested page could not be found.', path: location.pathname, noindex: true })
  return <main style={{ minHeight: '100vh', display: 'grid', placeContent: 'center', textAlign: 'center', gap: '12px', background: 'var(--cream)', color: 'var(--ink)' }}>
    <h1>Page not found</h1>
    <a href="/" style={{ color: 'var(--accent)' }}>Return to the homepage</a>
  </main>
}
