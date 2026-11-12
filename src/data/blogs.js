// Blog entries live in ./blog-posts/ and remain in their original display order.
import { blogEntries as part1 } from './blog-posts/part-1.js'
import { blogEntries as part2 } from './blog-posts/part-2.js'
import { blogEntries as part3 } from './blog-posts/part-3.js'
import { blogEntries as part4 } from './blog-posts/part-4.js'

const blogEntries = [...part1, ...part2, ...part3, ...part4]

const editorialCompletion = `
<h2>Implementation Notes</h2>
<p>Apply this idea in a small, reversible change first. Test it with realistic data, an empty state, and a failure case before rolling it into a wider workflow.</p>
<h2>Before You Ship</h2>
<ul>
  <li>Check accessibility, performance, and security at the relevant boundary.</li>
  <li>Document the decision, assumptions, and a rollback path.</li>
  <li>Leave clear maintenance notes for the next iteration.</li>
</ul>
<blockquote>Good implementation is deliberate, observable, and easy to improve.</blockquote>`;

export const blogs = blogEntries.map((blog) => {
  const isNewerPost = new Date(blog.date) >= new Date("2025-11-01");
  const textLength = blog.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
  const extraContent = isNewerPost && textLength < 900 ? editorialCompletion : "";

  return extraContent ? { ...blog, content: `${blog.content}${extraContent}` } : blog;
});
