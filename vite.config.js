import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { blogs } from './src/data/blogs.js'

const SITE_URL = 'https://vikral.netlify.app'
const virtualBlogIndexId = 'virtual:blog-index'
const resolvedBlogIndexId = `\0${virtualBlogIndexId}`

function blogIndexPlugin() {
  return {
    name: 'blog-index',
    resolveId(id) {
      if (id === virtualBlogIndexId) return resolvedBlogIndexId
    },
    load(id) {
      if (id !== resolvedBlogIndexId) return
      const entries = blogs.map(({ id, title, date, category, readTime, excerpt, cover }) => ({
        id, title, date, category, readTime, excerpt, cover,
      }))
      return `export const blogIndex = ${JSON.stringify(entries)}`
    },
  }
}

function buildSitemapXml() {
  const staticRoutes = ['/', '/blog', '/know-me']
  const blogRoutes = blogs.map((blog) => `/blog/${blog.id}`)

  const urls = [...staticRoutes, ...blogRoutes]
    .map(
      (path) => `  <url><loc>${SITE_URL}${path}</loc></url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

/** Writes a sitemap without inventing page update dates. */
function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    closeBundle() {
      const out = resolve(process.cwd(), 'dist', 'sitemap.xml')
      writeFileSync(out, buildSitemapXml(), 'utf8')
    },
  }
}

export default defineConfig({
  plugins: [react(), blogIndexPlugin(), sitemapPlugin()],
})
