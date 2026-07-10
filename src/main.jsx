import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App        from './App.jsx'
import BlogList   from './pages/BlogList.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import KnowMe from './pages/KnowMe.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<App />} />
        <Route path="/blog"       element={<BlogList />} />
        <Route path="/blog/:id"   element={<BlogDetail />} />
        <Route path="/know-me" element={<KnowMe />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
