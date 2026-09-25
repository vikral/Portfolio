import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { blogs } from './src/data/blogs.js'

const SITE_URL = 'https://vikral.netlify.app'

function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  const staticRoutes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/blog', changefreq: 'weekly', priority: '0.9' },
    { path: '/know-me', changefreq: 'monthly', priority: '0.8' },
  ]

  const blogRoutes = blogs.map((b) => ({
    path: `/blog/${b.id}`,
    changefreq: 'monthly',
    priority: '0.7',
  }))

  const urls = [...staticRoutes, ...blogRoutes]
    .map(
      ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

/** Writes sitemap.xml into dist/ on every production build. */
function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    closeBundle() {
      const out = resolve(process.cwd(), 'dist', 'sitemap.xml')
      writeFileSync(out, buildSitemapXml(), 'utf8')
      // Also keep a copy in public so dev/preview and git can serve it
      writeFileSync(resolve(process.cwd(), 'public', 'sitemap.xml'), buildSitemapXml(), 'utf8')
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
