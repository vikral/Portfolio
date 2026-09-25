import { useEffect } from 'react'
import { SITE, absoluteUrl } from '../seo/siteConfig'

const JSON_LD_ID = 'page-jsonld'

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(data) {
  let el = document.getElementById(JSON_LD_ID)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = JSON_LD_ID
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Update document title, description, canonical, Open Graph, Twitter, robots,
 * and optional JSON-LD for the current route (SPA-friendly).
 *
 * @param {object} opts
 * @param {string}  [opts.title]       Page title (auto-suffixed unless it already looks full)
 * @param {string}  [opts.description] Meta description
 * @param {string}  [opts.path]        Pathname starting with / (default "/")
 * @param {string}  [opts.image]       Absolute OG/Twitter image URL
 * @param {string}  [opts.imageAlt]    OG image alt text
 * @param {string}  [opts.type]        og:type (website | article | profile)
 * @param {boolean} [opts.noindex]     Disallow indexing (404s, drafts)
 * @param {object|object[]|null} [opts.jsonLd] Structured data object(s)
 */
export function usePageMeta({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  type = 'website',
  noindex = false,
  jsonLd = null,
} = {}) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = !title
      ? SITE.title
      : title === SITE.title || title.includes('—') || title.includes('|')
        ? title
        : SITE.titleTemplate(title)

    const desc = description || SITE.description
    const url = absoluteUrl(path)
    const img = image || SITE.ogImage
    const alt = imageAlt || SITE.ogImageAlt
    const robots = noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

    document.title = fullTitle

    upsertMeta('name', 'description', desc)
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'author', SITE.author)
    upsertLink('canonical', url)

    // Open Graph
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:image:alt', alt)
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:locale', SITE.locale)

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', img)
    upsertMeta('name', 'twitter:image:alt', alt)

    setJsonLd(jsonLd)

    return () => {
      // Leave tags in place; the next route overwrites them.
    }
  }, [title, description, path, image, imageAlt, type, noindex, jsonLdKey])
}
