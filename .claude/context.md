# Project Context: Vikral Portfolio & Blog

## Overview
This is a professional portfolio and technical blog for Shubham Kumar (nickname: Vikral), a Software Engineer specializing in scalable CMS and web application solutions.

## Tech Stack
- **Frontend**: React, Vite
- **Styling**: CSS-in-JS (inline styles), Custom Hooks for responsiveness
- **SEO**: JSON-LD (Schema.org), Open Graph, Twitter Cards, Dynamic Page Meta
- **Content**: Static data stored in `src/data/blogs.js`

## Key Architecture Decisions
- **Design Language**: Premium, minimalist aesthetic using a "Cream/Ink/Accent" color palette.
- **Responsiveness**: Uses a custom `useResponsive` hook to toggle between `isMobile`, `isTablet`, and desktop views.
- **SEO Strategy**: Heavy focus on identity linking to ensure "Vikral" searchability via `alternateName` in Person schema.
- **Blog System**: Flat-file based system where `blogs.js` acts as the database.

## Critical Files
- `src/seo/siteConfig.js`: Central source of truth for site identity, SEO metadata, and absolute URLs.
- `src/data/blogs.js`: Contains all blog post content, categories, and metadata.
- `src/pages/BlogDetail.jsx`: Handles single post rendering and "Prev/Next" navigation.
- `src/pages/BlogList.jsx`: Handles filtered and sorted listing of all articles.
- `src/hooks/useResponsive.js`: Core logic for viewport-based styling.

## Development Guidelines for AI Agents
1. **Styling**: Maintain the existing style pattern (inline styles with CSS variables). Avoid introducing external CSS files unless explicitly requested.
2. **SEO**: Any new page must implement `usePageMeta` to ensure proper indexing and social sharing.
3. **Blog Content**: Content should be technical, professional, and include clear code examples in `<pre><code>` blocks.
4. **Responsiveness**: Always check how components behave across `isMobile`, `isTablet`, and desktop.
5. **Naming**: Refer to the author as "Shubham Kumar" or "Vikral" as per the context of the page.

## Current Goals
- Implement Table of Contents (TOC) for blog posts.
- Expand existing blog content to be more comprehensive.
- Maintain high visual polish (shadows, border-radius, transitions).
