# How to Add New Blog Posts

All blog content lives in a single file:
**`src/data/blogs.js`**

No backend, no CMS, no server required. Just edit the file and redeploy.

**SEO note:** Each post’s `title`, `excerpt`, and `id` power the page title, meta description, Open Graph tags, and JSON-LD. Run `npm run build` after adding posts so `public/sitemap.xml` is regenerated automatically.

---

## Step-by-Step

### 1. Open `src/data/blogs.js`

### 2. Add a new object to the `blogs` array

Copy this template and fill in your content:

```js
{
  id: "your-unique-post-slug",       // used in the URL: /blog/your-unique-post-slug
  title: "Your Post Title Here",
  date: "August 1, 2025",
  category: "WordPress",             // shown as a coloured tag
  readTime: "5 min read",
  excerpt: "One or two sentences shown on the blog listing card.",
  cover: "",                         // optional: URL to a cover image
                                     // leave "" for the auto gradient placeholder
  content: `
    <h2>First Section Heading</h2>
    <p>Your paragraph text here.</p>

    <h2>Code Example</h2>
    <pre><code>your code here</code></pre>

    <h2>A List</h2>
    <ul>
      <li>Item one</li>
      <li>Item two</li>
    </ul>

    <blockquote>A pull quote or callout tip.</blockquote>
  `
},
```

### 3. Save the file

The blog listing page and detail page update automatically — no other files need to change.

---

## Available Categories (with colour coding)

| Category       | Colour  |
|----------------|---------|
| WordPress      | Red     |
| Angular        | Angular Red |
| WooCommerce    | Purple  |
| PHP            | Indigo  |
| Laravel        | Bright Red |
| CSS            | Blue    |
| MySQL          | Teal    |
| JavaScript     | Yellow  |
| DevOps         | Docker Blue |
| Best Practices | Green   |
| Career         | Warm    |

To add a new category, add it to the `CATEGORY_COLORS` object in both:
- `src/pages/BlogList.jsx`
- `src/pages/BlogDetail.jsx`
- `src/components/BlogPreview.jsx`

---

## Content HTML Tags Supported

| Tag             | Renders as                        |
|-----------------|-----------------------------------|
| `<h2>`          | Section heading (Bebas Neue font) |
| `<h3>`          | Sub-heading (Syne font)           |
| `<p>`           | Paragraph                         |
| `<ul><li>`      | Bullet list with `—` accent       |
| `<ol><li>`      | Numbered list                     |
| `<pre><code>`   | Code block (dark bg, syntax look) |
| `<code>`        | Inline code                       |
| `<blockquote>`  | Pull quote / callout box          |
| `<strong>`      | Bold text                         |
| `<a href="">`   | Link (accent colour)              |
| `<img>`         | Full-width image                  |

---

## Adding a Cover Image

```js
cover: "https://images.unsplash.com/photo-xxxxxxxxxx?w=800",
```

Or host your image in `public/blog/` and reference it as:
```js
cover: "/blog/my-post-cover.jpg",
```

---

## Post Order

Posts are shown in the order they appear in the `blogs` array.
To feature a post, move it to the top of the array.

---

## Deploying After Adding a Post

```bash
npm run build
# Then upload the dist/ folder to your host
# Or just push to GitHub — Netlify/Vercel auto-deploy
```

That's it! No database, no API, no CMS login needed.
