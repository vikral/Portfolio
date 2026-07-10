// ─────────────────────────────────────────────────────────────────────────────
//  BLOG DATA FILE
//  To add a new blog post, copy one object below and add it to the array.
//  Fields:
//    id        – unique slug used in the URL  e.g. "my-new-post"
//    title     – post title
//    date      – display date  e.g. "March 10, 2025"
//    category  – tag shown on cards  e.g. "WordPress" / "Angular" / "Tips"
//    readTime  – e.g. "5 min read"
//    excerpt   – short description shown on the blog listing card (1–2 sentences)
//    cover     – optional cover image URL; leave "" to use the gradient placeholder
//    content   – full HTML string rendered inside the post
//                Use <h2>, <p>, <ul>, <li>, <pre><code>, <blockquote> tags freely.
// ─────────────────────────────────────────────────────────────────────────────

export const blogs = [
  {
    id: "wordpress-custom-theme-from-scratch",
    title: "Building a WordPress Custom Theme from Scratch",
    date: "January 8, 2025",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "A step-by-step walkthrough of creating a production-ready WordPress theme without relying on page builders or starter themes.",
    cover: "",
    content: `
<h2>Why Build a Custom Theme?</h2>
<p>Page builders are convenient, but they come with bloat, performance overhead, and limited flexibility. Building a custom theme gives you full control over markup, performance, and maintainability.</p>

<h2>Step 1 — File Structure</h2>
<p>A minimal WordPress theme needs just two files to be recognised:</p>
<pre><code>my-theme/
  style.css      ← Theme metadata lives here
  index.php      ← Fallback template
  functions.php  ← Enqueue scripts, register menus, etc.
  header.php
  footer.php
  page.php
  single.php
  archive.php</code></pre>

<h2>Step 2 — style.css Header</h2>
<p>WordPress reads the comment block at the top of style.css to register your theme:</p>
<pre><code>/*
 Theme Name:   My Custom Theme
 Author:       Shubham Vikral
 Version:      1.0.0
 Text Domain:  my-custom-theme
*/</code></pre>

<h2>Step 3 — functions.php Essentials</h2>
<p>This is where you wire up all WordPress hooks:</p>
<pre><code>function mytheme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(['primary' => 'Primary Menu']);
}
add_action('after_setup_theme', 'mytheme_setup');

function mytheme_scripts() {
    wp_enqueue_style('main', get_stylesheet_uri());
    wp_enqueue_script('main', get_template_directory_uri() . '/js/main.js', [], '1.0', true);
}
add_action('wp_enqueue_scripts', 'mytheme_scripts');</code></pre>

<h2>Step 4 — The Loop</h2>
<p>WordPress's core concept is The Loop — iterating over queried posts:</p>
<pre><code>&lt;?php if (have_posts()) : while (have_posts()) : the_post(); ?&gt;
  &lt;article&gt;
    &lt;h2&gt;&lt;a href="&lt;?php the_permalink(); ?&gt;"&gt;&lt;?php the_title(); ?&gt;&lt;/a&gt;&lt;/h2&gt;
    &lt;?php the_excerpt(); ?&gt;
  &lt;/article&gt;
&lt;?php endwhile; endif; ?&gt;</code></pre>
<h2>Performance Tips</h2>
<ul>
  <li>Use <code>wp_enqueue_*</code> — never hardcode script/style tags in templates</li>
  <li>Lazy-load images with the native <code>loading="lazy"</code> attribute</li>
  <li>Limit post queries with <code>posts_per_page</code> and always request only needed fields</li>
  <li>Cache heavy WP_Query calls using transients</li>
</ul>

<blockquote>A well-built custom theme is lean, fast, and easier to maintain than any page-builder output.</blockquote>
    `
  },
  {
    id: "angular-performance-best-practices",
    title: "Angular Performance Best Practices in 2025",
    date: "January 22, 2025",
    category: "Angular",
    readTime: "7 min read",
    excerpt: "How to keep your Angular apps fast using OnPush change detection, lazy loading, and the new signals API.",
    cover: "",
    content: `
<h2>Why Performance Matters in Angular</h2>
<p>Angular apps can grow complex fast. Without intentional optimisation, change detection cycles and bundle sizes spiral out of control. Here are the most impactful levers.</p>

<h2>1. OnPush Change Detection</h2>
<p>The default <code>ChangeDetectionStrategy.Default</code> checks every component on every event. Switch to <code>OnPush</code> to only re-render when inputs change:</p>
<pre><code>@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`...\`
})
export class CardComponent {
  @Input() data!: CardData;
}</code></pre>

<h2>2. Lazy Loading Modules</h2>
<p>Never load features the user hasn't visited yet:</p>
<pre><code>const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];</code></pre>

<h2>3. Angular Signals (v17+)</h2>
<p>Signals replace RxJS for local state, providing fine-grained reactivity with zero zone.js overhead:</p>
<pre><code>import { signal, computed } from '@angular/core';

count = signal(0);
doubled = computed(() => this.count() * 2);

increment() { this.count.update(v => v + 1); }</code></pre>

<h2>4. TrackBy in ngFor</h2>
<p>Always provide a trackBy function to prevent the entire list re-rendering on data changes:</p>
<pre><code>trackById(index: number, item: Item) {
  return item.id;
}
// Template:
// *ngFor="let item of items; trackBy: trackById"</code></pre>

<h2>5. Bundle Analysis</h2>
<p>Run <code>ng build --stats-json</code> then analyse with <a href="https://webpack.github.io/analyse/">webpack-bundle-analyzer</a> to spot large dependencies.</p>

<ul>
  <li>Prefer tree-shakeable imports over barrel files</li>
  <li>Use the Angular CDK instead of heavy UI libraries</li>
  <li>Enable <code>optimization: true</code> in angular.json for production</li>
</ul>
    `
  },
  {
    id: "woocommerce-custom-checkout",
    title: "Customising WooCommerce Checkout with Hooks",
    date: "February 3, 2025",
    category: "WooCommerce",
    readTime: "6 min read",
    excerpt: "Use WooCommerce action and filter hooks to add custom fields, reorder sections, and style your checkout without touching core files.",
    cover: "",
    content: `
<h2>The Hook-Based Approach</h2>
<p>WooCommerce exposes over 200 hooks on the checkout page alone. Modifying core files breaks on updates — hooks are the correct way to customise.</p>

<h2>Adding a Custom Field</h2>
<p>Add a "Delivery Notes" field after the billing form:</p>
<pre><code>add_action('woocommerce_after_order_notes', 'add_delivery_notes_field');

function add_delivery_notes_field($checkout) {
    woocommerce_form_field('delivery_notes', [
        'type'        => 'textarea',
        'class'       => ['form-row-wide'],
        'label'       => 'Delivery Notes',
        'placeholder' => 'Leave any special instructions…',
    ], $checkout->get_value('delivery_notes'));
}</code></pre>

<h2>Saving the Custom Field</h2>
<pre><code>add_action('woocommerce_checkout_update_order_meta', 'save_delivery_notes');

function save_delivery_notes($order_id) {
    if (!empty($_POST['delivery_notes'])) {
        update_post_meta($order_id, '_delivery_notes',
            sanitize_textarea_field($_POST['delivery_notes']));
    }
}</code></pre>

<h2>Displaying in the Admin Order Screen</h2>
<pre><code>add_action('woocommerce_admin_order_data_after_billing_address', 'display_delivery_notes');

function display_delivery_notes($order) {
    $notes = get_post_meta($order->get_id(), '_delivery_notes', true);
    if ($notes) echo '<p><strong>Delivery Notes:</strong> ' . esc_html($notes) . '</p>';
}</code></pre>

<h2>Useful Checkout Hooks Reference</h2>
<ul>
  <li><code>woocommerce_before_checkout_form</code> — above the whole form</li>
  <li><code>woocommerce_checkout_before_customer_details</code> — before billing/shipping</li>
  <li><code>woocommerce_review_order_before_payment</code> — above payment methods</li>
  <li><code>woocommerce_thankyou</code> — on the order confirmation page</li>
</ul>

<blockquote>Always use <code>sanitize_*</code> functions when saving custom field data to the database.</blockquote>
    `
  },
  {
    id: "php-clean-code-principles",
    title: "Writing Clean PHP: Principles Every Developer Should Know",
    date: "February 14, 2025",
    category: "PHP",
    readTime: "9 min read",
    excerpt: "From naming conventions to SOLID principles, here's how to write PHP that your future self — and your team — will actually enjoy reading.",
    cover: "",
    content: `
<h2>Why Clean Code Matters</h2>
<p>Code is read far more often than it is written. Clean, expressive PHP saves debugging time, reduces onboarding friction, and makes refactoring safer.</p>

<h2>Meaningful Names</h2>
<p>Names should reveal intent. Avoid abbreviations and single-letter variables outside loops:</p>
<pre><code>// Bad
$d = getUserData($id);

// Good
$userProfile = getUserProfile($userId);</code></pre>

<h2>Single Responsibility</h2>
<p>Each function should do one thing. If you can't name it without using "and", split it:</p>
<pre><code>// Bad — does too much
function processOrder($orderId) {
    $order = fetchOrder($orderId);
    $email = buildConfirmationEmail($order);
    sendEmail($email);
    updateInventory($order);
}

// Good — composed of focused functions
function processOrder($orderId) {
    $order = fetchOrder($orderId);
    sendOrderConfirmation($order);
    updateInventory($order);
}</code></pre>

<h2>Type Declarations</h2>
<p>PHP 8 has excellent type support — use it to catch bugs at the boundary:</p>
<pre><code>function calculateDiscount(float $price, int $percentage): float {
    return $price * ($percentage / 100);
}</code></pre>

<h2>Early Returns Over Nested Ifs</h2>
<pre><code>// Bad — pyramid of doom
function getDiscount($user) {
    if ($user) {
        if ($user->isActive()) {
            if ($user->hasMembership()) {
                return 20;
            }
        }
    }
    return 0;
}

// Good — guard clauses
function getDiscount($user): int {
    if (!$user || !$user->isActive()) return 0;
    if (!$user->hasMembership())       return 0;
    return 20;
}</code></pre>

<h2>Avoid Magic Numbers</h2>
<pre><code>// Bad
if ($age > 18) { ... }

// Good
const LEGAL_AGE = 18;
if ($age > LEGAL_AGE) { ... }</code></pre>

<ul>
  <li>Use <code>declare(strict_types=1)</code> at the top of every file</li>
  <li>Prefer exceptions over boolean return values for error states</li>
  <li>Run <a href="https://phpstan.org">PHPStan</a> or <a href="https://psalm.dev">Psalm</a> on your codebase</li>
</ul>
    `
  },
  {
    id: "wordpress-gutenberg-block-development",
    title: "Getting Started with Gutenberg Block Development",
    date: "February 25, 2025",
    category: "WordPress",
    readTime: "10 min read",
    excerpt: "Build your first custom Gutenberg block using @wordpress/scripts, JavaScript, and PHP — no third-party plugins required.",
    cover: "",
    content: `
<h2>What is Gutenberg Block Development?</h2>
<p>Gutenberg is WordPress's block-based editor introduced in v5.0. Custom blocks let you create reusable content components that editors can use without touching code.</p>

<h2>Setting Up the Environment</h2>
<pre><code>npx @wordpress/create-block my-custom-block
cd my-custom-block
npm start</code></pre>

<h2>Block Registration — PHP Side</h2>
<pre><code>function register_my_block() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'register_my_block');</code></pre>

<h2>Block Registration — JS Side (block.json)</h2>
<pre><code>{
  "apiVersion": 3,
  "name": "my-plugin/hero-block",
  "title": "Hero Block",
  "category": "layout",
  "attributes": {
    "heading": { "type": "string", "default": "Hello World" },
    "subtext": { "type": "string", "default": "" }
  }
}</code></pre>

<h2>The Edit Component</h2>
<pre><code>import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
  return (
    &lt;div {...useBlockProps()}&gt;
      &lt;RichText
        tagName="h2"
        value={attributes.heading}
        onChange={val => setAttributes({ heading: val })}
        placeholder="Enter heading…"
      /&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>The Save Component</h2>
<pre><code>export default function Save({ attributes }) {
  return (
    &lt;div {...useBlockProps.save()}&gt;
      &lt;h2&gt;{attributes.heading}&lt;/h2&gt;
    &lt;/div&gt;
  );
}</code></pre>

<ul>
  <li>Run <code>npm run build</code> before activating the plugin in WordPress</li>
  <li>Use <code>InspectorControls</code> from <code>@wordpress/block-editor</code> to add sidebar settings</li>
  <li>Store block styles in <code>style.scss</code> and editor-only styles in <code>editor.scss</code></li>
</ul>
    `
  },
  {
    id: "laravel-api-authentication-sanctum",
    title: "API Authentication in Laravel with Sanctum",
    date: "March 5, 2025",
    category: "Laravel",
    readTime: "8 min read",
    excerpt: "Set up token-based API authentication in a Laravel app using Sanctum — the lightweight alternative to Passport for SPA and mobile auth.",
    cover: "",
    content: `
<h2>Why Sanctum?</h2>
<p>Laravel Passport is OAuth2-based and powerful but heavyweight for most apps. Sanctum provides simple token authentication and SPA cookie auth with far less configuration.</p>

<h2>Installation</h2>
<pre><code>composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
php artisan migrate</code></pre>

<h2>Add the Trait to User Model</h2>
<pre><code>use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable;
}</code></pre>

<h2>Issuing Tokens</h2>
<pre><code>// In your AuthController
public function login(Request $request) {
    $request->validate([
        'email'    => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $request->user()->createToken('api-token')->plainTextToken;
    return response()->json(['token' => $token]);
}</code></pre>

<h2>Protecting Routes</h2>
<pre><code>// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $r) => $r->user());
    Route::apiResource('posts', PostController::class);
});</code></pre>

<h2>Making Authenticated Requests</h2>
<pre><code>// From your frontend (Angular, React, etc.)
const response = await fetch('/api/user', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/json',
  }
});</code></pre>

<h2>Revoking Tokens</h2>
<pre><code>// Logout — revoke current token
$request->user()->currentAccessToken()->delete();

// Revoke all tokens
$request->user()->tokens()->delete();</code></pre>
    `
  },
  {
    id: "css-grid-modern-layouts",
    title: "Mastering CSS Grid for Modern Web Layouts",
    date: "March 12, 2025",
    category: "CSS",
    readTime: "7 min read",
    excerpt: "Go beyond the basics with CSS Grid — subgrid, auto-fill, minmax, and named template areas that make complex layouts trivial.",
    cover: "",
    content: `
<h2>Beyond the Basics</h2>
<p>Most developers know <code>display: grid</code> and <code>grid-template-columns</code>. But CSS Grid has features that make complex editorial and app layouts genuinely elegant.</p>

<h2>auto-fill vs auto-fit</h2>
<pre><code>/* auto-fill: creates as many columns as fit, even empty ones */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* auto-fit: collapses empty tracks, letting items stretch */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));</code></pre>

<h2>Named Template Areas</h2>
<pre><code>.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main    main"
    "footer footer footer";
  grid-template-columns: 240px 1fr 1fr;
}

.header  { grid-area: header;  }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main;    }
.footer  { grid-area: footer;  }</code></pre>

<h2>Subgrid — The Game Changer</h2>
<p>Subgrid (now in all major browsers) lets a child participate in the parent's grid tracks:</p>
<pre><code>.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid; /* aligns title, body, cta across cards */
}</code></pre>

<h2>Dense Auto-Placement</h2>
<pre><code>.masonry-like {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: dense; /* fills gaps left by spanning items */
}

.featured { grid-column: span 2; }</code></pre>

<ul>
  <li>Use <code>gap</code> instead of margins for grid spacing</li>
  <li><code>place-items: center</code> shorthand for <code>align-items + justify-items</code></li>
  <li>Combine Grid (macro layout) with Flexbox (component internals) for best results</li>
</ul>
    `
  },
  {
    id: "wordpress-performance-optimization",
    title: "WordPress Performance Optimization: A Practical Checklist",
    date: "March 20, 2025",
    category: "WordPress",
    readTime: "6 min read",
    excerpt: "Actionable techniques to get your WordPress site under 2 seconds load time — covering caching, images, database, and hosting.",
    cover: "",
    content: `
<h2>Why Speed Matters</h2>
<p>Google uses Core Web Vitals as a ranking signal. A 1-second delay in page load time reduces conversions by ~7%. Performance isn't optional — it's business-critical.</p>

<h2>Caching</h2>
<ul>
  <li><strong>Page cache</strong> — WP Rocket, W3 Total Cache, or LiteSpeed Cache serve pre-built HTML</li>
  <li><strong>Object cache</strong> — Redis or Memcached cache database query results</li>
  <li><strong>Browser cache</strong> — set long <code>Cache-Control</code> headers for static assets</li>
</ul>

<h2>Image Optimisation</h2>
<pre><code>// In functions.php — serve WebP with fallback
add_filter('the_content', function($content) {
    return str_replace('.jpg"', '.webp" onerror="this.src=this.src.replace(\'.webp\',\'.jpg\')"', $content);
});</code></pre>
<ul>
  <li>Use <code>loading="lazy"</code> on all below-fold images</li>
  <li>Define explicit <code>width</code> and <code>height</code> to prevent layout shifts (CLS)</li>
  <li>Use <code>srcset</code> to serve appropriately sized images per viewport</li>
</ul>

<h2>Database</h2>
<pre><code>// Delete expired transients
DELETE FROM wp_options
WHERE option_name LIKE '%_transient_%'
AND option_value < UNIX_TIMESTAMP();</code></pre>
<ul>
  <li>Limit post revisions: <code>define('WP_POST_REVISIONS', 3);</code> in wp-config.php</li>
  <li>Disable autoloaded options for non-essential data</li>
  <li>Run <code>OPTIMIZE TABLE</code> on large tables quarterly</li>
</ul>

<h2>Hosting & Server</h2>
<ul>
  <li>Use PHP 8.2+ — significantly faster than PHP 7.x</li>
  <li>Enable HTTP/2 or HTTP/3 on your server</li>
  <li>Use a CDN (Cloudflare, BunnyCDN) to serve static assets from edge nodes</li>
  <li>Enable Gzip/Brotli compression</li>
</ul>

<blockquote>Measure first with Lighthouse and GTmetrix. Fix the biggest bottleneck before moving to the next — don't optimise blindly.</blockquote>
    `
  },
  {
    id: "javascript-async-await-patterns",
    title: "JavaScript Async/Await Patterns You Should Know",
    date: "April 2, 2025",
    category: "JavaScript",
    readTime: "7 min read",
    excerpt: "Beyond the basics — parallel execution, error handling strategies, cancellation, and avoiding the most common async pitfalls.",
    cover: "",
    content: `
<h2>The Basics Are Not Enough</h2>
<p>Most developers can write a basic <code>async/await</code> function. But production code requires understanding parallelism, error propagation, and race conditions.</p>

<h2>Sequential vs Parallel</h2>
<pre><code>// Sequential — slow, each awaits the previous
const user   = await fetchUser(id);
const posts  = await fetchPosts(id);
const follows = await fetchFollows(id);

// Parallel — all fire at once, 3x faster
const [user, posts, follows] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchFollows(id),
]);</code></pre>

<h2>Error Handling — Don't Swallow Errors</h2>
<pre><code>// Bad — silent failure
try {
  const data = await fetchData();
} catch (e) {}

// Good — handle specifically
async function loadData() {
  try {
    return await fetchData();
  } catch (error) {
    if (error.status === 404) return null;
    throw error; // re-throw unexpected errors
  }
}</code></pre>

<h2>Promise.allSettled for Non-Critical Parallel Calls</h2>
<pre><code>const results = await Promise.allSettled([
  fetchPrimary(),
  fetchOptional(),
]);

const [primary, optional] = results;
if (primary.status === 'fulfilled') use(primary.value);
if (optional.status === 'rejected') console.warn('Optional failed', optional.reason);</code></pre>

<h2>Abort Controller — Cancellable Fetches</h2>
<pre><code>const controller = new AbortController();

const response = await fetch('/api/data', {
  signal: controller.signal
});

// Cancel if user navigates away
controller.abort();</code></pre>

<h2>Avoiding the Async forEach Trap</h2>
<pre><code>// BUG — forEach ignores returned promises
items.forEach(async (item) => {
  await processItem(item); // ← not awaited!
});

// Fix 1 — for...of loop
for (const item of items) {
  await processItem(item);
}

// Fix 2 — parallel with map
await Promise.all(items.map(item => processItem(item)));</code></pre>
    `
  },
  {
    id: "wordpress-rest-api-guide",
    title: "Using the WordPress REST API to Build Headless Sites",
    date: "April 10, 2025",
    category: "WordPress",
    readTime: "9 min read",
    excerpt: "How to use WordPress as a headless CMS — registering custom endpoints, handling authentication, and consuming data in a React frontend.",
    cover: "",
    content: `
<h2>What is Headless WordPress?</h2>
<p>Headless decouples the CMS (WordPress) from the presentation layer. WordPress manages content; a JavaScript frontend (React, Next.js, Angular) handles rendering. The bridge is the REST API.</p>

<h2>Core REST API Endpoints</h2>
<pre><code>GET /wp-json/wp/v2/posts          → all posts
GET /wp-json/wp/v2/posts/42       → single post
GET /wp-json/wp/v2/posts?search=angular → search
GET /wp-json/wp/v2/categories     → categories
GET /wp-json/wp/v2/media/15       → media item</code></pre>

<h2>Registering a Custom Endpoint</h2>
<pre><code>add_action('rest_api_init', function() {
    register_rest_route('myplugin/v1', '/portfolio', [
        'methods'  => 'GET',
        'callback' => 'get_portfolio_items',
        'permission_callback' => '__return_true',
    ]);
});

function get_portfolio_items(WP_REST_Request $request) {
    $posts = get_posts([
        'post_type'      => 'portfolio',
        'posts_per_page' => 10,
    ]);
    return rest_ensure_response(array_map(fn($p) => [
        'id'    => $p->ID,
        'title' => $p->post_title,
        'slug'  => $p->post_name,
    ], $posts));
}</code></pre>

<h2>Consuming in React</h2>
<pre><code>const [posts, setPosts] = useState([]);

useEffect(() => {
  fetch('https://your-wp-site.com/wp-json/wp/v2/posts?_embed')
    .then(r => r.json())
    .then(data => setPosts(data));
}, []);</code></pre>

<h2>Adding Custom Fields to Responses</h2>
<pre><code>add_action('rest_api_init', function() {
    register_rest_field('post', 'project_url', [
        'get_callback' => fn($post) => get_post_meta($post['id'], '_project_url', true),
        'schema'       => ['type' => 'string'],
    ]);
});</code></pre>

<blockquote>Always set <code>permission_callback</code> — use <code>'__return_true'</code> only for public endpoints. For protected routes, verify nonce or JWT.</blockquote>
    `
  },
  {
    id: "mysql-query-optimization",
    title: "MySQL Query Optimisation for WordPress Developers",
    date: "April 18, 2025",
    category: "MySQL",
    readTime: "8 min read",
    excerpt: "Diagnose slow queries, use EXPLAIN, add the right indexes, and rewrite N+1 problems in WordPress WP_Query calls.",
    cover: "",
    content: `
<h2>Finding Slow Queries</h2>
<p>Enable the slow query log in MySQL to catch queries taking over 1 second:</p>
<pre><code>SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';</code></pre>

<h2>Using EXPLAIN</h2>
<pre><code>EXPLAIN SELECT * FROM wp_posts
  WHERE post_status = 'publish'
  AND post_type = 'product'
  ORDER BY post_date DESC;</code></pre>
<p>Look at the <code>type</code> column. <code>ALL</code> means a full table scan — bad. <code>ref</code> or <code>range</code> means an index is being used — good.</p>

<h2>Adding Indexes</h2>
<pre><code>-- Composite index for common WP query pattern
ALTER TABLE wp_posts
  ADD INDEX idx_type_status_date (post_type, post_status, post_date);</code></pre>

<h2>The N+1 Problem in WP_Query</h2>
<pre><code>// Bad — fires one extra query per post for meta
$posts = get_posts(['post_type' => 'product']);
foreach ($posts as $post) {
    $price = get_post_meta($post->ID, '_price', true); // N extra queries!
}

// Good — pre-fetch with update_post_meta_cache
$posts = get_posts([
    'post_type'               => 'product',
    'update_post_meta_cache'  => true,  // fetches all meta in one query
    'update_post_term_cache'  => false, // skip if you don't need terms
]);</code></pre>

<h2>WP_Query Performance Tips</h2>
<ul>
  <li>Use <code>fields => 'ids'</code> when you only need post IDs</li>
  <li>Set <code>no_found_rows => true</code> when pagination isn't needed (skips COUNT query)</li>
  <li>Avoid <code>meta_query</code> with <code>LIKE</code> — it can't use indexes</li>
  <li>Cache expensive queries with <code>set_transient()</code></li>
</ul>

<blockquote>Database optimisation gives you the biggest performance gains for the least code change. Profile before you cache.</blockquote>
    `
  },
  {
    id: "angular-standalone-components",
    title: "Angular Standalone Components: The Module-Free Future",
    date: "April 28, 2025",
    category: "Angular",
    readTime: "6 min read",
    excerpt: "Angular 17 makes standalone components the default. Learn how to migrate, lazy-load, and structure apps without NgModule boilerplate.",
    cover: "",
    content: `
<h2>What Are Standalone Components?</h2>
<p>Before Angular 14, every component had to belong to an NgModule. Standalone components manage their own imports directly, eliminating the NgModule layer entirely.</p>

<h2>Creating a Standalone Component</h2>
<pre><code>@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: \`
    &lt;div class="card"&gt;
      &lt;h3&gt;{{ title }}&lt;/h3&gt;
      &lt;a [routerLink]="['/detail', id]"&gt;Read more&lt;/a&gt;
    &lt;/div&gt;
  \`
})
export class CardComponent {
  @Input() title!: string;
  @Input() id!: number;
}</code></pre>

<h2>Bootstrapping Without AppModule</h2>
<pre><code>// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});</code></pre>

<h2>Lazy Loading Standalone Components</h2>
<pre><code>// app.routes.ts
export const routes: Routes = [
  {
    path: 'blog',
    loadComponent: () =>
      import('./blog/blog.component').then(m => m.BlogComponent)
  }
];</code></pre>

<h2>Migrating Existing Modules</h2>
<pre><code># Angular CLI migration schematic
ng generate @angular/core:standalone</code></pre>

<ul>
  <li>Use <code>provideHttpClient()</code> instead of importing <code>HttpClientModule</code></li>
  <li>Replace <code>BrowserAnimationsModule</code> with <code>provideAnimations()</code></li>
  <li>Standalone components tree-shake more aggressively — smaller bundles</li>
</ul>
    `
  },
  {
    id: "git-workflow-for-teams",
    title: "Git Workflow for Small Development Teams",
    date: "May 6, 2025",
    category: "DevOps",
    readTime: "7 min read",
    excerpt: "A practical Git branching strategy — feature branches, protected main, PR reviews, and commit conventions that scale with your team.",
    cover: "",
    content: `
<h2>Why Workflow Matters</h2>
<p>Without a defined workflow, teams end up with merge conflicts, broken main branches, and untrackable history. A lightweight process eliminates most of this friction.</p>

<h2>Branch Naming Convention</h2>
<pre><code>main          ← always deployable
develop       ← integration branch
feature/user-auth
feature/checkout-redesign
fix/cart-total-bug
hotfix/payment-gateway-timeout
release/v2.1.0</code></pre>

<h2>Commit Message Convention</h2>
<p>Use Conventional Commits for machine-readable history and automatic changelogs:</p>
<pre><code>feat: add user profile avatar upload
fix: correct cart total on coupon removal
chore: update dependencies to latest
docs: add API authentication guide
refactor: extract payment logic into service</code></pre>

<h2>The Pull Request Process</h2>
<ul>
  <li>No direct pushes to <code>main</code> — enforced via branch protection rules</li>
  <li>PR requires at least 1 review approval before merge</li>
  <li>CI must pass (tests, linting) before merge is allowed</li>
  <li>Use squash merges to keep main history linear and clean</li>
</ul>

<h2>Resolving Conflicts Early</h2>
<pre><code># Rebase onto develop daily to stay current
git fetch origin
git rebase origin/develop

# If conflicts arise, fix them immediately in small chunks
# rather than facing a huge merge at PR time</code></pre>

<h2>Useful Git Aliases</h2>
<pre><code># Add to ~/.gitconfig
[alias]
  lg    = log --oneline --graph --decorate
  undo  = reset HEAD~1 --mixed
  stsh  = stash --include-untracked
  clean-branches = !git branch --merged | grep -v main | xargs git branch -d</code></pre>
    `
  },
  {
    id: "scss-architecture-bem",
    title: "SCSS Architecture with BEM for Scalable Stylesheets",
    date: "May 15, 2025",
    category: "CSS",
    readTime: "6 min read",
    excerpt: "Structure your SCSS using the 7-1 pattern combined with BEM naming to write styles that stay maintainable as projects grow.",
    cover: "",
    content: `
<h2>The Problem with Unstructured CSS</h2>
<p>Without architecture, CSS files grow into tangled sheets where changing one rule breaks three others. SCSS + BEM solves this with clear structure and naming conventions.</p>

<h2>BEM Naming</h2>
<pre><code>/* Block */
.card { }

/* Element — part of the block */
.card__title { }
.card__image { }
.card__footer { }

/* Modifier — variant of block or element */
.card--featured { }
.card__title--large { }</code></pre>

<h2>BEM in SCSS with Nesting</h2>
<pre><code>.card {
  padding: 24px;
  border: 1px solid #eee;

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  &__image {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }

  &--featured {
    background: var(--accent);
    color: white;

    .card__title { color: inherit; }
  }
}</code></pre>

<h2>The 7-1 Folder Pattern</h2>
<pre><code>styles/
  abstracts/    ← variables, mixins, functions (no output CSS)
  base/         ← reset, typography, body defaults
  components/   ← card, button, modal, nav
  layout/       ← header, footer, sidebar, grid
  pages/        ← home, about, blog (page-specific overrides)
  themes/       ← dark mode, brand themes
  vendors/      ← third-party CSS
  main.scss     ← imports everything in order</code></pre>

<h2>Design Token Variables</h2>
<pre><code>// abstracts/_variables.scss
$color-primary:    #E84B2B;
$color-surface:    #F5F0E8;
$space-sm:         8px;
$space-md:         16px;
$space-lg:         32px;
$font-display:    'Bebas Neue', sans-serif;
$font-body:       'DM Sans', sans-serif;</code></pre>

<ul>
  <li>Never style HTML elements in component files — use BEM classes</li>
  <li>Keep nesting to 3 levels max to avoid specificity wars</li>
  <li>Use <code>@use</code> and <code>@forward</code> instead of deprecated <code>@import</code></li>
</ul>
    `
  },
  {
    id: "wordpress-multisite-setup",
    title: "WordPress Multisite: When to Use It and How to Set It Up",
    date: "May 24, 2025",
    category: "WordPress",
    readTime: "7 min read",
    excerpt: "Multisite lets you run a network of WordPress sites from a single installation — learn when it makes sense and how to configure it correctly.",
    cover: "",
    content: `
<h2>What is WordPress Multisite?</h2>
<p>WordPress Multisite turns a single WP installation into a network of sites that share the same codebase, plugins, and users — but have separate databases and content.</p>

<h2>When to Use It</h2>
<ul>
  <li>Running multiple sites for the same client/organisation (e.g. regional branches)</li>
  <li>Building a SaaS platform where each customer gets their own WordPress site</li>
  <li>Managing a network of blogs with shared theme/plugin updates</li>
  <li><strong>Don't use it</strong> for unrelated sites — the shared codebase creates unnecessary coupling</li>
</ul>

<h2>Enabling Multisite</h2>
<pre><code>// Step 1 — add to wp-config.php BEFORE the "That's all" line
define('WP_ALLOW_MULTISITE', true);

// Step 2 — go to Tools → Network Setup in WP Admin
// Step 3 — WP generates code to add to wp-config.php and .htaccess</code></pre>

<h2>wp-config.php Network Constants</h2>
<pre><code>define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', false); // true for subdomains, false for subdirectories
define('DOMAIN_CURRENT_SITE', 'yourdomain.com');
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);</code></pre>

<h2>Network-Wide Plugin Activation</h2>
<pre><code>// Check if running on multisite
if (is_multisite()) {
    // Apply to all sites in the network
    switch_to_blog(1); // super admin functions
    restore_current_blog();
}</code></pre>

<h2>Gotchas</h2>
<ul>
  <li>Not all plugins are Multisite-compatible — test thoroughly</li>
  <li>Each site gets its own upload directory under <code>wp-content/uploads/sites/{id}/</code></li>
  <li>Database tables are prefixed per site: <code>wp_2_posts</code>, <code>wp_3_posts</code>, etc.</li>
  <li>Super Admin role has network-wide access — assign carefully</li>
</ul>
    `
  },
  {
    id: "react-state-management-2025",
    title: "React State Management in 2025: What to Actually Use",
    date: "June 3, 2025",
    category: "JavaScript",
    readTime: "8 min read",
    excerpt: "The ecosystem has matured. Here's when to use useState, Context, Zustand, React Query, and when to avoid Redux entirely.",
    cover: "",
    content: `
<h2>The Decision Framework</h2>
<p>The most common mistake is choosing a state management tool before understanding the shape of your state. Different problems need different solutions.</p>

<h2>useState — Still the Default</h2>
<pre><code>// 80% of UI state belongs here
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '' });</code></pre>
<p>If state only affects one component, use <code>useState</code>. Resist the urge to lift it prematurely.</p>

<h2>Context — For Low-Frequency Global State</h2>
<pre><code>const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    &lt;ThemeContext.Provider value={{ theme, setTheme }}&gt;
      &lt;Router /&gt;
    &lt;/ThemeContext.Provider&gt;
  );
}</code></pre>
<p><strong>Caveat:</strong> Context re-renders all consumers on every update. Use it for infrequent changes — theme, auth state, locale.</p>

<h2>Zustand — For Shared Client State</h2>
<pre><code>import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
}));</code></pre>
<p>Zustand is 1KB, has no boilerplate, and re-renders only subscribed components. Use it wherever Context would cause performance issues.</p>

<h2>React Query — For Server State</h2>
<pre><code>const { data, isLoading, error } = useQuery({
  queryKey: ['posts', page],
  queryFn: () => fetchPosts(page),
  staleTime: 5 * 60 * 1000, // 5 minutes
});</code></pre>
<p>Server state (data that lives on an API) is fundamentally different from client state. React Query handles caching, background refetching, and invalidation automatically.</p>

<h2>Decision Tree</h2>
<ul>
  <li>Local UI state → <code>useState</code></li>
  <li>Derived/computed state → <code>useMemo</code></li>
  <li>API data → React Query or SWR</li>
  <li>Shared client state (cart, auth) → Zustand</li>
  <li>Theme / locale → Context</li>
  <li>Redux → only for very large teams with complex undo/redo requirements</li>
</ul>
    `
  },
  {
    id: "website-accessibility-guide",
    title: "Web Accessibility: A Practical Guide for Developers",
    date: "June 12, 2025",
    category: "Best Practices",
    readTime: "9 min read",
    excerpt: "Accessibility is not a checkbox — it's good engineering. Learn WCAG principles, ARIA patterns, and testing techniques that matter.",
    cover: "",
    content: `
<h2>Why Accessibility Matters</h2>
<p>1 in 4 adults has a disability. Accessible websites reach more users, rank better in search engines, and reduce legal risk. Most accessibility work also improves usability for everyone.</p>

<h2>The Four WCAG Principles (POUR)</h2>
<ul>
  <li><strong>Perceivable</strong> — content can be perceived by at least one sense</li>
  <li><strong>Operable</strong> — all functionality works via keyboard</li>
  <li><strong>Understandable</strong> — content and UI are understandable</li>
  <li><strong>Robust</strong> — content can be interpreted by assistive technologies</li>
</ul>

<h2>Semantic HTML First</h2>
<pre><code>&lt;!-- Bad --&gt;
&lt;div class="btn" onclick="submit()"&gt;Submit&lt;/div&gt;

&lt;!-- Good --&gt;
&lt;button type="submit"&gt;Submit&lt;/button&gt;</code></pre>
<p>Semantic elements provide built-in keyboard support, focus management, and screen reader announcements for free.</p>

<h2>ARIA — Use Sparingly</h2>
<pre><code>&lt;!-- Only use ARIA when semantic HTML isn't sufficient --&gt;
&lt;div role="dialog" aria-labelledby="modal-title" aria-modal="true"&gt;
  &lt;h2 id="modal-title"&gt;Confirm Deletion&lt;/h2&gt;
  ...
&lt;/div&gt;</code></pre>

<h2>Focus Management</h2>
<pre><code>// Trap focus in modals
function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { last.focus(); e.preventDefault(); }
    } else {
      if (document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });
}</code></pre>

<h2>Colour Contrast</h2>
<p>WCAG AA requires a contrast ratio of at least 4.5:1 for normal text. Use the <a href="https://webaim.org/resources/contrastchecker/">WebAIM Contrast Checker</a> to verify your palette.</p>

<h2>Testing Tools</h2>
<ul>
  <li><strong>axe DevTools</strong> — browser extension, catches ~57% of issues automatically</li>
  <li><strong>NVDA / VoiceOver</strong> — test with actual screen readers</li>
  <li><strong>Keyboard-only navigation</strong> — tab through your entire page without touching the mouse</li>
  <li><strong>Lighthouse</strong> — accessibility score in Chrome DevTools</li>
</ul>
    `
  },
  {
    id: "wordpress-plugin-development-starter",
    title: "WordPress Plugin Development: From Idea to WordPress.org",
    date: "June 22, 2025",
    category: "WordPress",
    readTime: "11 min read",
    excerpt: "Build a production-quality WordPress plugin from scratch, handle activation/deactivation, add settings pages, and publish to the WordPress.org repository.",
    cover: "",
    content: `
<h2>Plugin Architecture</h2>
<pre><code>my-plugin/
  my-plugin.php          ← Main file with plugin header
  uninstall.php          ← Cleanup on deletion
  includes/
    class-core.php       ← Main plugin class
    class-admin.php      ← Admin-specific functionality
    class-public.php     ← Frontend functionality
  admin/
    css/, js/, partials/
  public/
    css/, js/, partials/
  languages/             ← i18n .pot files</code></pre>

<h2>Plugin Header</h2>
<pre><code>&lt;?php
/**
 * Plugin Name:       My Plugin
 * Plugin URI:        https://yoursite.com/my-plugin
 * Description:       A brief description.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            Shubham Vikral
 * License:           GPL v2 or later
 * Text Domain:       my-plugin
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;</code></pre>

<h2>Activation and Deactivation Hooks</h2>
<pre><code>register_activation_hook(__FILE__, 'my_plugin_activate');
register_deactivation_hook(__FILE__, 'my_plugin_deactivate');

function my_plugin_activate() {
    // Create DB tables, set default options
    add_option('my_plugin_version', '1.0.0');
    flush_rewrite_rules();
}

function my_plugin_deactivate() {
    flush_rewrite_rules();
    // Don't delete data here — use uninstall.php for that
}</code></pre>

<h2>Adding a Settings Page</h2>
<pre><code>add_action('admin_menu', 'my_plugin_add_menu');

function my_plugin_add_menu() {
    add_options_page(
        'My Plugin Settings',
        'My Plugin',
        'manage_options',
        'my-plugin',
        'my_plugin_settings_page'
    );
}

function my_plugin_settings_page() {
    if (!current_user_can('manage_options')) return;
    // Always use Settings API, never $_POST directly
    settings_errors('my_plugin_messages');
    require plugin_dir_path(__FILE__) . 'admin/partials/settings.php';
}</code></pre>

<h2>Security Checklist</h2>
<ul>
  <li>Verify nonces on all form submissions: <code>check_admin_referer('my_action')</code></li>
  <li>Sanitize all inputs: <code>sanitize_text_field()</code>, <code>absint()</code>, <code>wp_kses_post()</code></li>
  <li>Escape all outputs: <code>esc_html()</code>, <code>esc_attr()</code>, <code>esc_url()</code></li>
  <li>Use <code>$wpdb->prepare()</code> for all direct DB queries</li>
  <li>Check capabilities: <code>current_user_can('manage_options')</code></li>
</ul>

<h2>Submitting to WordPress.org</h2>
<p>Create a <code>readme.txt</code> following the WordPress.org standard, then submit at <a href="https://wordpress.org/plugins/developers/add/">wordpress.org/plugins/developers/add/</a>. The review team checks security and standards compliance — the process typically takes 1–2 weeks.</p>
    `
  },
  {
    id: "docker-for-wordpress-dev",
    title: "Docker for Local WordPress Development",
    date: "July 2, 2025",
    category: "DevOps",
    readTime: "8 min read",
    excerpt: "Replace XAMPP and Local by Flywheel with a Docker Compose setup that mirrors your production server and works identically on every machine.",
    cover: "",
    content: `
<h2>Why Docker for WordPress Dev?</h2>
<p>XAMPP and similar tools configure your local machine — Docker encapsulates everything in containers. Your entire stack is defined in a single file, runs identically on Mac, Windows, and Linux, and can be spun up in seconds.</p>

<h2>docker-compose.yml</h2>
<pre><code>version: '3.8'

services:
  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_DATABASE:      wordpress
      MYSQL_USER:          wp_user
      MYSQL_PASSWORD:      wp_password
      MYSQL_ROOT_PASSWORD: root_password
    volumes:
      - db_data:/var/lib/mysql

  wordpress:
    image: wordpress:php8.2-apache
    restart: always
    depends_on: [db]
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST:     db:3306
      WORDPRESS_DB_USER:     wp_user
      WORDPRESS_DB_PASSWORD: wp_password
      WORDPRESS_DB_NAME:     wordpress
    volumes:
      - ./wp-content:/var/www/html/wp-content

  phpmyadmin:
    image: phpmyadmin
    restart: always
    depends_on: [db]
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db

volumes:
  db_data:</code></pre>

<h2>Running It</h2>
<pre><code># Start all containers in background
docker compose up -d

# View logs
docker compose logs -f wordpress

# Access the site
open http://localhost:8080

# Stop everything
docker compose down</code></pre>

<h2>Your Theme/Plugin Development Workflow</h2>
<pre><code># The ./wp-content volume maps directly to the container
# Edit files locally — changes appear instantly in WordPress

my-project/
  docker-compose.yml
  wp-content/
    themes/
      my-custom-theme/   ← edit these files locally
    plugins/
      my-plugin/</code></pre>

<h2>WP-CLI in Docker</h2>
<pre><code># Run WP-CLI commands without installing it locally
docker compose exec wordpress wp plugin list
docker compose exec wordpress wp theme activate my-custom-theme
docker compose exec wordpress wp db export /var/www/html/wp-content/backup.sql</code></pre>

<ul>
  <li>Add <code>WORDPRESS_DEBUG: 1</code> to environment to enable WP_DEBUG</li>
  <li>Use named volumes for the DB so data persists between container restarts</li>
  <li>Add Mailhog as a service to catch outgoing emails during development</li>
</ul>
    `
  },
 {
  id: "web-developer-skills-ai-era",
  title: "Skills Every Web Developer Needs in the Age of AI",
  date: "July 12, 2025",
  category: "Career",
  readTime: "7 min read",
  excerpt: "AI is reshaping web development fast. Here's what skills actually matter now, what's becoming obsolete, and how to position yourself to stay relevant and in-demand.",
  cover: "",
  content: `
<h2>AI Won't Replace You — But Developers Who Use AI Will</h2>
<p>The developers panicking about AI are the ones treating it as a threat. The ones thriving are treating it as a 10x productivity multiplier. The skill gap isn't between humans and AI — it's between developers who adapt and those who don't.</p>

<h2>1. Prompt Engineering for Code</h2>
<p>Knowing how to talk to AI tools is now a core skill. Vague prompts produce vague code. Precise prompts with context, constraints, and examples produce production-ready output.</p>
<pre><code>// Weak prompt — produces generic output
"Write a WordPress plugin"

// Strong prompt — produces usable output
"Write a WordPress plugin that adds a shortcode [recent_posts category='news' count='5'].
It should use WP_Query with no_found_rows=true for performance,
output semantic HTML5 article tags, escape all output with esc_html(),
and be compatible with PHP 8.1+"</code></pre>
<p>The better you understand the underlying technology, the better your prompts — which is why deep knowledge still matters.</p>

<h2>2. Code Review and Debugging AI Output</h2>
<p>AI generates plausible-looking code that is sometimes subtly wrong. SQL injection vulnerabilities, missing nonces, unescaped output, deprecated functions — AI makes these mistakes confidently. Your job is shifting from writing every line to reviewing, understanding, and owning the code it produces.</p>
<ul>
  <li>Never ship AI-generated code you don't fully understand</li>
  <li>Run AI output through PHPCS, ESLint, and manual security review</li>
  <li>Test edge cases — AI rarely thinks about empty states, API failures, or mobile viewports</li>
</ul>

<h2>3. Systems Thinking Over Syntax</h2>
<p>Syntax is the easiest thing for AI to generate. Architecture is not. Understanding how systems fit together — caching layers, database design, API boundaries, authentication flows — is where human developers create irreplaceable value.</p>
<pre><code>// Anyone can write this with AI:
$user = get_user_by('email', $email);

// Fewer people can design this correctly:
// - Should this be cached? For how long?
// - What happens if the user doesn't exist?
// - Is this the right layer to fetch users from?
// - Who calls this function and what do they expect back?</code></pre>

<h2>4. AI Tool Integration in Products</h2>
<p>Clients are now asking for AI features in their products — chatbots, content generation, image processing, search. Knowing how to integrate OpenAI, Claude, or open-source models via API is becoming a standard expectation for senior developers.</p>
<pre><code>// Basic OpenAI integration in a WordPress plugin
function generate_post_excerpt($post_id) {
    $content = get_post_field('post_content', $post_id);

    $response = wp_remote_post('https://api.openai.com/v1/chat/completions', [
        'headers' => [
            'Authorization' => 'Bearer ' . get_option('openai_api_key'),
            'Content-Type'  => 'application/json',
        ],
        'body' => json_encode([
            'model'    => 'gpt-4o-mini',
            'messages' => [[
                'role'    => 'user',
                'content' => 'Write a 2-sentence excerpt for this post: ' . wp_strip_all_tags($content),
            ]],
        ]),
    ]);

    $body = json_decode(wp_remote_retrieve_body($response), true);
    return $body['choices'][0]['message']['content'] ?? '';
}</code></pre>

<h2>5. Performance and Core Web Vitals</h2>
<p>AI can write code — it cannot optimise the lived experience of a slow website. LCP, CLS, INP — Google's Core Web Vitals are ranking signals that require hands-on profiling, not just code generation. Developers who can diagnose and fix real-world performance problems command premium rates.</p>

<h2>6. Security Expertise</h2>
<p>As AI lowers the barrier to writing code, it also lowers the barrier to writing attack code. Security knowledge is becoming more valuable, not less. OWASP Top 10, WordPress-specific vulnerabilities, proper sanitisation and escaping — these are skills AI consistently gets wrong and clients are starting to care about.</p>

<h2>7. Communication and Client Management</h2>
<p>This one AI genuinely cannot replace. The ability to translate a client's vague idea into a technical specification, manage expectations during a project, and explain technical decisions in plain language — this is the skill that determines your rate ceiling more than any framework knowledge.</p>

<blockquote>The developers who will struggle are those who only know how to write code. The ones who will thrive are those who know why the code exists, what problem it solves, and how to build the right thing for the right person.</blockquote>

<h2>What to Actually Learn Next</h2>
<ul>
  <li><strong>TypeScript</strong> — AI-assisted codebases get messy fast without types</li>
  <li><strong>Docker</strong> — containerised dev environments are now the standard</li>
  <li><strong>REST API design</strong> — headless architecture is everywhere</li>
  <li><strong>Basic DevOps</strong> — CI/CD, GitHub Actions, server configuration</li>
  <li><strong>AI API integration</strong> — OpenAI, Anthropic, or open-source via Ollama</li>
</ul>
  `
},

  {
  id: "wordpress-child-themes",
  title: "WordPress Child Themes: Why You Should Always Use One",
  date: "August 1, 2025",
  category: "WordPress",
  readTime: "6 min read",
  excerpt: "Building on a parent theme directly means your changes get wiped on every update. Here's how to create and use child themes correctly.",
  cover: "",
  content: `
<h2>What is a Child Theme?</h2>
<p>A child theme inherits all the functionality and styling of a parent theme while letting you safely override files. Any customisation you make in a child theme survives parent theme updates completely untouched.</p>
 
<h2>Creating a Child Theme</h2>
<p>Create a new folder inside <code>wp-content/themes/</code> — by convention, name it <code>parenttheme-child</code>. Inside it, you only need two files to start:</p>
<pre><code>my-theme-child/
  style.css
  functions.php</code></pre>
 
<h2>style.css — The Theme Header</h2>
<p>The <code>Template</code> field is critical — it must match the parent theme's folder name exactly:</p>
<pre><code>/*
 Theme Name:   My Theme Child
 Template:     my-theme
 Version:      1.0.0
 Author:       Shubham Vikral
*/</code></pre>
 
<h2>functions.php — Enqueue Parent Styles</h2>
<p>Never use <code>@import</code> in style.css to load the parent. Use <code>wp_enqueue_scripts</code> instead — it's faster and more reliable:</p>
<pre><code>add_action('wp_enqueue_scripts', 'child_enqueue_styles');
 
function child_enqueue_styles() {
    $parent = 'my-theme-style';
 
    wp_enqueue_style($parent,
        get_template_directory_uri() . '/style.css'
    );
 
    wp_enqueue_style('child-style',
        get_stylesheet_directory_uri() . '/style.css',
        [$parent],
        wp_get_theme()->get('Version')
    );
}</code></pre>
 
<h2>Overriding Parent Template Files</h2>
<p>Copy any template file from the parent into your child theme folder and modify it — WordPress automatically uses the child version:</p>
<pre><code>// To override header.php:
// Copy: my-theme/header.php
// To:   my-theme-child/header.php
// Then edit the child copy freely</code></pre>
 
<h2>What to Put in functions.php</h2>
<ul>
  <li>Enqueue additional scripts and styles</li>
  <li>Override or extend parent theme functions</li>
  <li>Register new sidebars, menus, or image sizes</li>
  <li>Add custom shortcodes and hooks</li>
  <li>Anything you'd normally put in a plugin</li>
</ul>
 
<blockquote>Rule of thumb: if it relates to presentation, put it in the child theme. If it's functionality that should survive a theme change, put it in a plugin.</blockquote>
  `
},
{
  id: "wordpress-custom-post-types",
  title: "Custom Post Types and Taxonomies Without a Plugin",
  date: "August 5, 2025",
  category: "WordPress",
  readTime: "8 min read",
  excerpt: "Register custom post types and taxonomies with pure PHP — no plugins needed. Full argument reference, admin labels, and rewrite rules explained.",
  cover: "",
  content: `
<h2>Why Register CPTs in Code?</h2>
<p>Plugins like CPT UI are great for beginners, but registering post types in code gives you version control, portability, and no extra plugin dependency. It belongs in your theme's <code>functions.php</code> or a small custom plugin.</p>
 
<h2>Registering a Custom Post Type</h2>
<pre><code>add_action('init', 'register_portfolio_cpt');
 
function register_portfolio_cpt() {
    $labels = [
        'name'               => 'Portfolio',
        'singular_name'      => 'Portfolio Item',
        'add_new_item'       => 'Add New Portfolio Item',
        'edit_item'          => 'Edit Portfolio Item',
        'view_item'          => 'View Portfolio Item',
        'search_items'       => 'Search Portfolio',
        'not_found'          => 'No portfolio items found',
    ];
 
    register_post_type('portfolio', [
        'labels'       => $labels,
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,   // enables Gutenberg + REST API
        'menu_icon'    => 'dashicons-portfolio',
        'supports'     => ['title', 'editor', 'thumbnail', 'excerpt'],
        'rewrite'      => ['slug' => 'portfolio'],
    ]);
}</code></pre>
 
<h2>Registering a Custom Taxonomy</h2>
<pre><code>add_action('init', 'register_portfolio_taxonomy');
 
function register_portfolio_taxonomy() {
    $labels = [
        'name'          => 'Project Types',
        'singular_name' => 'Project Type',
        'search_items'  => 'Search Project Types',
        'all_items'     => 'All Project Types',
        'edit_item'     => 'Edit Project Type',
        'add_new_item'  => 'Add New Project Type',
    ];
 
    register_taxonomy('project_type', ['portfolio'], [
        'labels'            => $labels,
        'hierarchical'      => true,   // true = category-like, false = tag-like
        'show_in_rest'      => true,
        'show_admin_column' => true,
        'rewrite'           => ['slug' => 'project-type'],
    ]);
}</code></pre>
 
<h2>Flush Rewrite Rules</h2>
<p>After registering, visit <strong>Settings → Permalinks</strong> and click Save — or run this once on activation:</p>
<pre><code>register_activation_hook(__FILE__, function() {
    register_portfolio_cpt();
    flush_rewrite_rules();
});</code></pre>
 
<h2>Querying Your CPT</h2>
<pre><code>$portfolio = new WP_Query([
    'post_type'      => 'portfolio',
    'posts_per_page' => 6,
    'tax_query'      => [[
        'taxonomy' => 'project_type',
        'field'    => 'slug',
        'terms'    => 'wordpress',
    ]],
]);
 
while ($portfolio->have_posts()) {
    $portfolio->the_post();
    the_title('<h2>', '</h2>');
}
wp_reset_postdata();</code></pre>
 
<ul>
  <li>Always set <code>show_in_rest => true</code> to enable the block editor for your CPT</li>
  <li>Use <code>capability_type => 'post'</code> unless you need granular permissions</li>
  <li>Add CPTs to the main query with <code>pre_get_posts</code>, not a separate WP_Query on archive pages</li>
</ul>
  `
},
{
  id: "wordpress-hooks-deep-dive",
  title: "WordPress Hooks Deep Dive: Actions vs Filters",
  date: "August 9, 2025",
  category: "WordPress",
  readTime: "7 min read",
  excerpt: "Master the WordPress hook system — the difference between actions and filters, priority, accepted args, and removing third-party hooks.",
  cover: "",
  content: `
<h2>The Hook System is WordPress</h2>
<p>Everything in WordPress runs through hooks. Understanding them deeply means you can modify any behaviour — from core, themes, or plugins — without touching a single original file.</p>
 
<h2>Actions — Do Something</h2>
<p>Actions fire at specific moments and let you <em>add</em> behaviour. Your callback receives data but doesn't return anything:</p>
<pre><code>// Hook into the action
add_action('save_post', 'my_save_post_handler', 10, 2);
 
function my_save_post_handler($post_id, $post) {
    if ($post->post_type !== 'portfolio') return;
    // do something — update meta, send notification, etc.
}</code></pre>
 
<h2>Filters — Modify Something</h2>
<p>Filters intercept a value, let you modify it, and require you to <strong>return</strong> the (possibly changed) value:</p>
<pre><code>add_filter('the_title', 'prefix_portfolio_titles', 10, 2);
 
function prefix_portfolio_titles($title, $post_id) {
    if (get_post_type($post_id) !== 'portfolio') return $title;
    return '&#127912; ' . $title;
}</code></pre>
 
<h2>Priority and Accepted Args</h2>
<pre><code>add_action( $hook, $callback, $priority, $accepted_args );
//                              ↑            ↑
//                         default: 10    default: 1
//                         lower = earlier
 
// To run AFTER other callbacks on the same hook:
add_filter('the_content', 'my_late_filter', 99);
 
// To receive multiple arguments:
add_filter('wp_nav_menu_items', 'add_menu_item', 10, 2);
// $args[0] = $items (HTML string), $args[1] = $args object</code></pre>
 
<h2>Removing Hooks</h2>
<pre><code>// Remove a hook you added yourself
remove_action('wp_head', 'my_function');
 
// Remove a hook added inside a class (common pattern)
// You must remove AFTER the object is instantiated:
add_action('init', function() {
    global $some_plugin_instance;
    remove_filter('the_content', [$some_plugin_instance, 'modify_content'], 10);
});</code></pre>
 
<h2>Creating Your Own Hooks</h2>
<pre><code>// In your theme or plugin — define extension points
function render_card($post_id) {
    do_action('before_card_render', $post_id);         // action point
 
    $title = apply_filters('card_title', get_the_title($post_id), $post_id); // filter point
 
    echo '<div class="card"><h2>' . esc_html($title) . '</h2></div>';
 
    do_action('after_card_render', $post_id);
}</code></pre>
 
<ul>
  <li>Use <code>has_action()</code> and <code>has_filter()</code> to check if a hook is registered before removing it</li>
  <li>Use <code>did_action()</code> to check if an action has already fired</li>
  <li>Never use <code>remove_all_actions()</code> on core hooks — it breaks plugins</li>
</ul>
 
<blockquote>If you find yourself editing a plugin's source file to change its behaviour, you're doing it wrong. There's almost always a hook you can use instead.</blockquote>
  `
},
{
  id: "wordpress-security-hardening",
  title: "WordPress Security Hardening: A Developer's Checklist",
  date: "August 14, 2025",
  category: "WordPress",
  readTime: "9 min read",
  excerpt: "Practical security hardening steps every WordPress developer should apply — from wp-config.php tweaks to disabling XML-RPC and hiding the login URL.",
  cover: "",
  content: `
<h2>Why WordPress Gets Targeted</h2>
<p>WordPress powers over 40% of the web, making it the most targeted CMS by automated bots. Most attacks aren't sophisticated — they exploit known vulnerabilities in outdated plugins and weak configurations that are trivially preventable.</p>
 
<h2>wp-config.php Hardening</h2>
<pre><code>// Disable the file editor in the admin panel
define('DISALLOW_FILE_EDIT', true);
 
// Disable plugin/theme installation from the admin
define('DISALLOW_FILE_MODS', true);
 
// Limit post revisions to save DB space and reduce bloat
define('WP_POST_REVISIONS', 3);
 
// Force SSL for admin and logins
define('FORCE_SSL_ADMIN', true);
 
// Move wp-config.php one level above the web root
// WordPress finds it automatically — no code change needed</code></pre>
 
<h2>Disable XML-RPC</h2>
<p>XML-RPC is used for brute-force and DDoS amplification attacks. Disable it unless you specifically need it for Jetpack or mobile apps:</p>
<pre><code>// In functions.php
add_filter('xmlrpc_enabled', '__return_false');
 
// Block at server level (.htaccess) — more efficient
&lt;Files xmlrpc.php&gt;
  Order Allow,Deny
  Deny from all
&lt;/Files&gt;</code></pre>
 
<h2>Hide the WordPress Login URL</h2>
<p>Use the WPS Hide Login plugin or add this to <code>.htaccess</code> to move <code>/wp-login.php</code> to a custom URL — this alone eliminates the majority of automated brute-force attempts.</p>
 
<h2>Limit Login Attempts</h2>
<pre><code>// Use the Limit Login Attempts Reloaded plugin, or add natively:
add_action('wp_login_failed', 'log_failed_login');
 
function log_failed_login($username) {
    $ip = $_SERVER['REMOTE_ADDR'];
    // Log to custom table or trigger lockout logic
}</code></pre>
 
<h2>File Permissions</h2>
<pre><code>find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f -exec chmod 644 {} \;
chmod 600 wp-config.php
chmod 600 .htaccess</code></pre>
 
<h2>Security Headers in .htaccess</h2>
<pre><code>&lt;IfModule mod_headers.c&gt;
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=()"
&lt;/IfModule&gt;</code></pre>
 
<h2>Security Checklist Summary</h2>
<ul>
  <li>Keep WordPress core, themes, and plugins updated — enable auto-updates for minor releases</li>
  <li>Use unique, strong database table prefix (not <code>wp_</code>)</li>
  <li>Delete unused themes and plugins — inactive code is still exploitable</li>
  <li>Set up two-factor authentication for all admin accounts</li>
  <li>Install Wordfence or Sucuri for malware scanning and firewall</li>
  <li>Schedule daily offsite backups with UpdraftPlus or BackupBuddy</li>
  <li>Disable directory browsing: <code>Options -Indexes</code> in .htaccess</li>
</ul>
 
<blockquote>Security is not a one-time setup — it's an ongoing practice. Schedule a quarterly review of your plugins, user accounts, and access logs.</blockquote>
  `
},
{
  id: "wp-cli-developer-guide",
  title: "WP-CLI: The WordPress Developer's Best Friend",
  date: "August 19, 2025",
  category: "WordPress",
  readTime: "7 min read",
  excerpt: "Save hours every week with WP-CLI — install, update, search-replace, manage users, run cron, and write your own custom commands.",
  cover: "",
  content: `
<h2>What is WP-CLI?</h2>
<p>WP-CLI is the official command-line interface for WordPress. It lets you do everything the admin panel does — and much more — without opening a browser. Essential for developers, deployment pipelines, and server maintenance.</p>
 
<h2>Installation</h2>
<pre><code>curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp
wp --info</code></pre>
 
<h2>Essential Commands</h2>
<pre><code># Core
wp core update
wp core version
 
# Plugins
wp plugin list
wp plugin install woocommerce --activate
wp plugin update --all
 
# Themes
wp theme activate my-child-theme
 
# Users
wp user create john john@example.com --role=editor
wp user list
wp user update 1 --user_pass=newpassword</code></pre>
 
<h2>Database Search and Replace</h2>
<p>The most valuable WP-CLI command — safely updates serialized data that breaks with a manual SQL find/replace:</p>
<pre><code># Migrate domain after moving a site
wp search-replace 'http://old-domain.com' 'https://new-domain.com' \
  --skip-columns=guid \
  --report-changed-only
 
# Dry run first
wp search-replace 'oldtext' 'newtext' --dry-run</code></pre>
 
<h2>Exporting and Importing</h2>
<pre><code># Export database
wp db export backup-$(date +%Y%m%d).sql
 
# Import database
wp db import backup.sql
 
# Export content as WXR
wp export --post_type=post --post_status=publish</code></pre>
 
<h2>Managing Cron</h2>
<pre><code># List all scheduled events
wp cron event list
 
# Run due cron events manually
wp cron event run --due-now
 
# Delete a scheduled event
wp cron event delete my_custom_event</code></pre>
 
<h2>Writing a Custom WP-CLI Command</h2>
<pre><code>// In functions.php or a plugin
if (defined('WP_CLI') && WP_CLI) {
    WP_CLI::add_command('portfolio sync', function($args, $assoc_args) {
        $posts = get_posts(['post_type' => 'portfolio', 'numberposts' => -1]);
        foreach ($posts as $post) {
            // do your processing
            WP_CLI::success("Synced: {$post->post_title}");
        }
    });
}
 
// Usage:
// wp portfolio sync</code></pre>
 
<ul>
  <li>Use <code>--allow-root</code> when running as root in Docker containers</li>
  <li>Use <code>--path=/var/www/html</code> to target a specific WordPress install</li>
  <li>Combine with bash scripts and cron for automated maintenance pipelines</li>
</ul>
  `
},
{
  id: "wordpress-transients-api",
  title: "WordPress Transients API: Smart Caching for Developers",
  date: "August 24, 2025",
  category: "WordPress",
  readTime: "6 min read",
  excerpt: "Cache expensive database queries and external API responses using WordPress Transients — with automatic expiry and zero infrastructure required.",
  cover: "",
  content: `
<h2>What Are Transients?</h2>
<p>Transients are temporary key-value data stored in the WordPress options table with an expiry time. They're the simplest caching mechanism available in WordPress — no Redis, no Memcached, no server config required.</p>
 
<h2>The Three Core Functions</h2>
<pre><code>// Store a transient (expires in 12 hours)
set_transient('featured_posts', $posts_data, 12 * HOUR_IN_SECONDS);
 
// Retrieve it
$data = get_transient('featured_posts');
 
// Delete it (e.g. when a post is published)
delete_transient('featured_posts');</code></pre>
 
<h2>The Cache-or-Fetch Pattern</h2>
<pre><code>function get_featured_posts() {
    $cache_key = 'featured_posts_v1';
    $posts     = get_transient($cache_key);
 
    if ($posts === false) {
        // Cache miss — run the expensive query
        $posts = new WP_Query([
            'post_type'      => 'post',
            'posts_per_page' => 6,
            'meta_key'       => '_is_featured',
            'meta_value'     => '1',
        ]);
 
        set_transient($cache_key, $posts, HOUR_IN_SECONDS);
    }
 
    return $posts;
}</code></pre>
 
<h2>Caching External API Responses</h2>
<pre><code>function get_github_repos($username) {
    $cache_key = 'github_repos_' . sanitize_key($username);
    $repos     = get_transient($cache_key);
 
    if ($repos === false) {
        $response = wp_remote_get(
            "https://api.github.com/users/{$username}/repos"
        );
 
        if (is_wp_error($response)) return [];
 
        $repos = json_decode(wp_remote_retrieve_body($response), true);
        set_transient($cache_key, $repos, 6 * HOUR_IN_SECONDS);
    }
 
    return $repos;
}</code></pre>
 
<h2>Invalidating Transients on Content Change</h2>
<pre><code>// Clear relevant transients when a post is saved or deleted
add_action('save_post', 'clear_post_transients');
add_action('deleted_post', 'clear_post_transients');
 
function clear_post_transients($post_id) {
    delete_transient('featured_posts_v1');
    delete_transient('homepage_query');
}</code></pre>
 
<h2>Site Transients on Multisite</h2>
<pre><code>// Network-wide transients shared across all sites
set_site_transient('network_stats', $data, DAY_IN_SECONDS);
$data = get_site_transient('network_stats');
delete_site_transient('network_stats');</code></pre>
 
<h2>Time Constants</h2>
<pre><code>MINUTE_IN_SECONDS  //    60
HOUR_IN_SECONDS    //  3600
DAY_IN_SECONDS     // 86400
WEEK_IN_SECONDS    // 604800
MONTH_IN_SECONDS   // 2592000
YEAR_IN_SECONDS    // 31536000</code></pre>
 
<blockquote>Version your transient keys (e.g. <code>featured_posts_v2</code>) when you change the data structure — old cached data with the old key will expire naturally without causing errors.</blockquote>
  `
},
{
  id: "wordpress-customizer-theme-options",
  title: "Building Theme Options with the WordPress Customizer",
  date: "August 29, 2025",
  category: "WordPress",
  readTime: "8 min read",
  excerpt: "Add panels, sections, and controls to the WordPress Customizer for live-preview theme options — with postMessage transport for instant updates.",
  cover: "",
  content: `
<h2>Why Use the Customizer?</h2>
<p>The Customizer provides a native WordPress UI for theme options with live preview built in. It's the recommended approach over custom admin pages for presentation settings — users see changes in real time before publishing.</p>
 
<h2>Adding a Panel and Section</h2>
<pre><code>add_action('customize_register', 'mytheme_customizer_register');
 
function mytheme_customizer_register(WP_Customize_Manager $wp_customize) {
 
    // Panel (groups of sections)
    $wp_customize->add_panel('mytheme_options', [
        'title'       => 'Theme Options',
        'description' => 'Customise your theme appearance.',
        'priority'    => 30,
    ]);
 
    // Section inside the panel
    $wp_customize->add_section('mytheme_colors', [
        'title'    => 'Colours',
        'panel'    => 'mytheme_options',
        'priority' => 10,
    ]);
}</code></pre>
 
<h2>Adding Settings and Controls</h2>
<pre><code>// Setting — stores the value
$wp_customize->add_setting('primary_color', [
    'default'           => '#E84B2B',
    'sanitize_callback' => 'sanitize_hex_color',
    'transport'         => 'postMessage', // live preview without full refresh
]);
 
// Control — the UI element
$wp_customize->add_control(new WP_Customize_Color_Control(
    $wp_customize,
    'primary_color',
    [
        'label'   => 'Primary Colour',
        'section' => 'mytheme_colors',
    ]
));</code></pre>
 
<h2>Outputting Settings as CSS Variables</h2>
<pre><code>add_action('wp_head', 'mytheme_customizer_css');
 
function mytheme_customizer_css() {
    $primary = get_theme_mod('primary_color', '#E84B2B');
    echo '<style>
        :root {
            --color-primary: ' . sanitize_hex_color($primary) . ';
        }
    </style>';
}</code></pre>
 
<h2>Live Preview with postMessage</h2>
<pre><code>// customize-preview.js — enqueue only in the Customizer preview
add_action('customize_preview_init', function() {
    wp_enqueue_script('mytheme-preview',
        get_template_directory_uri() . '/js/customize-preview.js',
        ['customize-preview'], null, true
    );
});
 
// customize-preview.js
wp.customize('primary_color', function(value) {
    value.bind(function(newColor) {
        document.documentElement.style.setProperty('--color-primary', newColor);
    });
});</code></pre>
 
<h2>Available Control Types</h2>
<ul>
  <li><code>WP_Customize_Color_Control</code> — colour picker</li>
  <li><code>WP_Customize_Image_Control</code> — media upload</li>
  <li><code>WP_Customize_Cropped_Image_Control</code> — image with crop</li>
  <li><code>WP_Customize_Media_Control</code> — any media type</li>
  <li>Default: text, textarea, checkbox, radio, select, range</li>
</ul>
 
<blockquote>Use <code>get_theme_mod()</code> to retrieve Customizer values and always provide a default as the second argument — it returns the default if the user hasn't saved yet.</blockquote>
  `
},
{
  id: "wordpress-wp-query-optimization",
  title: "WordPress Query Optimization: WP_Query vs get_posts vs query_posts",
  date: "September 3, 2025",
  category: "WordPress",
  readTime: "7 min read",
  excerpt: "Understand the real differences between WordPress querying methods, when to use each, and how to write fast queries with pre_get_posts.",
  cover: "",
  content: `
<h2>The Three Ways to Query Posts</h2>
<p>WordPress gives you three ways to query posts — and choosing the wrong one causes significant performance problems or breaks your page layout entirely.</p>
 
<h2>query_posts() — Never Use This</h2>
<pre><code>// DON'T DO THIS — it replaces the main query, breaks pagination,
// and requires wp_reset_query() afterwards. It's a legacy function.
query_posts('post_type=portfolio&posts_per_page=6'); // ❌</code></pre>
 
<h2>get_posts() — For Simple Secondary Queries</h2>
<p>A wrapper around WP_Query with sensible defaults. Sets <code>no_found_rows</code> to true (skips the COUNT query) and <code>ignore_sticky_posts</code> to true automatically:</p>
<pre><code>$recent = get_posts([
    'post_type'   => 'post',
    'numberposts' => 5,
    'orderby'     => 'date',
    'order'       => 'DESC',
]);
 
foreach ($recent as $post) {
    setup_postdata($post);
    the_title();
}
wp_reset_postdata();</code></pre>
 
<h2>WP_Query — For Full Control</h2>
<pre><code>$query = new WP_Query([
    'post_type'              => 'portfolio',
    'posts_per_page'         => 9,
    'paged'                  => get_query_var('paged'),
    'no_found_rows'          => false, // needed for pagination
    'update_post_meta_cache' => true,
    'update_post_term_cache' => false, // skip if not using terms
    'fields'                 => 'all', // or 'ids' if you only need IDs
]);
 
if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();
        the_title('<h2>', '</h2>');
    }
}
wp_reset_postdata();</code></pre>
 
<h2>Modifying the Main Query with pre_get_posts</h2>
<p>This is the correct way to change what loads on archive pages — don't use a secondary WP_Query where the main query already fires:</p>
<pre><code>add_action('pre_get_posts', 'modify_archive_query');
 
function modify_archive_query(WP_Query $query) {
    // Only target the main query on the frontend
    if (is_admin() || !$query->is_main_query()) return;
 
    if ($query->is_post_type_archive('portfolio')) {
        $query->set('posts_per_page', 12);
        $query->set('orderby', 'menu_order');
        $query->set('order', 'ASC');
    }
}</code></pre>
 
<h2>Performance Flags Reference</h2>
<pre><code>$args = [
    'no_found_rows'          => true,  // skip SQL_CALC_FOUND_ROWS (saves ~30%)
    'update_post_meta_cache' => false, // skip meta prefetch if unused
    'update_post_term_cache' => false, // skip term prefetch if unused
    'fields'                 => 'ids', // return only IDs — fastest option
    'cache_results'          => false, // skip object cache (for one-off queries)
];</code></pre>
 
<ul>
  <li>Use <code>fields => 'ids'</code> when you only need to check existence or count</li>
  <li>Always call <code>wp_reset_postdata()</code> after a secondary loop</li>
  <li>Avoid <code>meta_query</code> with <code>LIKE</code> — it forces a full table scan</li>
</ul>
  `
},
{
  id: "wordpress-internationalization",
  title: "Internationalisation in WordPress Themes and Plugins",
  date: "September 8, 2025",
  category: "WordPress",
  readTime: "6 min read",
  excerpt: "Make your theme or plugin translation-ready with i18n functions, .pot file generation, and proper text domain loading.",
  cover: "",
  content: `
<h2>Why Internationalisation Matters</h2>
<p>A translation-ready theme or plugin can be used by anyone in the world. WordPress.org requires it for themes in the repository. Even if you never translate it yourself, doing it correctly costs very little time and enables others to contribute translations.</p>
 
<h2>The Core i18n Functions</h2>
<pre><code>// Basic translation
__('Hello World', 'my-textdomain');
 
// Echo a translation directly
_e('Submit', 'my-textdomain');
 
// With context (disambiguates identical strings with different meanings)
_x('Post', 'noun: content type', 'my-textdomain');
_x('Post', 'verb: publish action', 'my-textdomain');
 
// Singular / plural
$count = 5;
printf(
    _n('%d comment', '%d comments', $count, 'my-textdomain'),
    $count
);
 
// With context and plural
_nx('%d item', '%d items', $count, 'shopping cart', 'my-textdomain');</code></pre>
 
<h2>Loading the Text Domain</h2>
<pre><code>// In a theme — functions.php
add_action('after_setup_theme', function() {
    load_theme_textdomain('my-textdomain',
        get_template_directory() . '/languages'
    );
});
 
// In a plugin — main plugin file
add_action('plugins_loaded', function() {
    load_plugin_textdomain('my-textdomain', false,
        dirname(plugin_basename(__FILE__)) . '/languages/'
    );
});</code></pre>
 
<h2>Generating the .pot File with WP-CLI</h2>
<pre><code># Generate the master translation template
wp i18n make-pot . languages/my-textdomain.pot \
  --domain=my-textdomain \
  --exclude=node_modules,vendor
 
# Create a .po file for a language
wp i18n make-po languages/my-textdomain.pot languages/my-textdomain-fr_FR.po
 
# Compile .po to binary .mo file
wp i18n make-mo languages/my-textdomain-fr_FR.po</code></pre>
 
<h2>JavaScript Translations</h2>
<pre><code>// Register script with a text domain
wp_set_script_translations('my-script-handle', 'my-textdomain',
    get_template_directory() . '/languages'
);
 
// In your JS file
import { __ } from '@wordpress/i18n';
const label = __('Add New Item', 'my-textdomain');</code></pre>
 
<h2>Common Mistakes to Avoid</h2>
<ul>
  <li>Never concatenate strings: <code>__('Hello') . ' ' . __('World')</code> — use a single string with placeholders</li>
  <li>Don't pass variables to translation functions: <code>__($variable)</code> — translators can't see the string</li>
  <li>Always use your unique text domain — never <code>'default'</code> or <code>'wordpress'</code></li>
  <li>Match the text domain in <code>style.css</code> / plugin header with what you pass to <code>load_*_textdomain()</code></li>
</ul>
  `
},
{
  id: "wordpress-template-hierarchy",
  title: "Understanding the WordPress Template Hierarchy",
  date: "September 13, 2025",
  category: "WordPress",
  readTime: "7 min read",
  excerpt: "How WordPress decides which template file to load — the full hierarchy explained with practical examples for custom page templates and template parts.",
  cover: "",
  content: `
<h2>How Template Loading Works</h2>
<p>When WordPress receives a request, it determines what type of content is being shown and walks down a priority list of template files until it finds one that exists in your theme. Understanding this hierarchy means you can precisely target any URL or content type.</p>
 
<h2>The Hierarchy for Common Scenarios</h2>
<pre><code>Single Post:
  single-{post-type}-{slug}.php
  single-{post-type}.php
  single.php
  singular.php
  index.php
 
Custom Post Type Archive:
  archive-{post-type}.php
  archive.php
  index.php
 
Category Archive:
  category-{slug}.php
  category-{id}.php
  category.php
  archive.php
  index.php
 
Static Page:
  {custom-template}.php   ← set in Page Attributes
  page-{slug}.php
  page-{id}.php
  page.php
  singular.php
  index.php
 
Front Page:
  front-page.php
  home.php   ← if blog page is set
  index.php</code></pre>
 
<h2>Creating a Custom Page Template</h2>
<pre><code>&lt;?php
/**
 * Template Name: Full Width
 * Template Post Type: page, portfolio
 */
 
get_header(); ?&gt;
 
&lt;main class="full-width"&gt;
    &lt;?php while (have_posts()) : the_post(); ?&gt;
        &lt;?php the_content(); ?&gt;
    &lt;?php endwhile; ?&gt;
&lt;/main&gt;
 
&lt;?php get_footer();</code></pre>
 
<h2>Template Parts for Reusable Partials</h2>
<pre><code>// Load a template part — looks for content-portfolio.php first,
// then falls back to content.php
get_template_part('template-parts/content', 'portfolio');
 
// Pass data to template parts (WordPress 5.5+)
get_template_part('template-parts/card', 'post', [
    'show_excerpt' => true,
    'image_size'   => 'medium_large',
]);</code></pre>
 
<h2>Receiving Data in Template Parts</h2>
<pre><code>&lt;?php
// template-parts/card-post.php
$show_excerpt = $args['show_excerpt'] ?? false;
$image_size   = $args['image_size']   ?? 'thumbnail';
?&gt;
 
&lt;article&gt;
    &lt;?php the_post_thumbnail($image_size); ?&gt;
    &lt;h2&gt;&lt;?php the_title(); ?&gt;&lt;/h2&gt;
    &lt;?php if ($show_excerpt) the_excerpt(); ?&gt;
&lt;/article&gt;</code></pre>
 
<h2>Overriding Plugin Templates</h2>
<pre><code>// Many plugins look for overrides in your theme folder.
// WooCommerce example — copy from:
//   woocommerce/templates/single-product.php
// To:
//   your-theme/woocommerce/single-product.php
// Then edit freely — WooCommerce uses your version automatically.</code></pre>
 
<ul>
  <li>Use the <a href="https://developer.wordpress.org/themes/basics/template-hierarchy/">WordPress Template Hierarchy visualiser</a> at developer.wordpress.org</li>
  <li>Always have <code>index.php</code> as the final fallback — it's required</li>
  <li>Prefer <code>get_template_part()</code> over PHP <code>include</code> for portability with child themes</li>
</ul>
  `
},
{
  id: "wordpress-shortcode-library",
  title: "Building a WordPress Shortcode Library",
  date: "September 18, 2025",
  category: "WordPress",
  readTime: "6 min read",
  excerpt: "Create reusable shortcodes with attributes, nested content, and output buffering — plus when to use blocks instead in modern WordPress.",
  cover: "",
  content: `
<h2>What Are Shortcodes?</h2>
<p>Shortcodes are macros that editors can place in post content to output dynamic HTML. While Gutenberg blocks are the modern approach, shortcodes remain essential for legacy sites and Classic Editor users.</p>
 
<h2>Basic Shortcode</h2>
<pre><code>add_shortcode('hello', 'hello_shortcode');
 
function hello_shortcode($atts) {
    $atts = shortcode_atts([
        'name' => 'World',
        'color' => '#E84B2B',
    ], $atts, 'hello');
 
    return '<span style="color:' . esc_attr($atts['color']) . '">Hello, '
        . esc_html($atts['name']) . '!</span>';
}
 
// Usage: [hello name="Shubham" color="#333"]</code></pre>
 
<h2>Enclosing Shortcode (with Content)</h2>
<pre><code>add_shortcode('callout', 'callout_shortcode');
 
function callout_shortcode($atts, $content = null) {
    $atts = shortcode_atts([
        'type' => 'info',  // info, warning, success
    ], $atts, 'callout');
 
    $icons = ['info' => 'ℹ️', 'warning' => '⚠️', 'success' => '✅'];
    $icon  = $icons[$atts['type']] ?? 'ℹ️';
 
    return '<div class="callout callout--' . esc_attr($atts['type']) . '">'
        . $icon . ' ' . do_shortcode($content)
        . '</div>';
}
 
// Usage: [callout type="warning"]Back up before updating.[/callout]</code></pre>
 
<h2>Shortcode with Output Buffering</h2>
<p>For complex HTML, use output buffering to keep your code readable:</p>
<pre><code>add_shortcode('team_grid', 'team_grid_shortcode');
 
function team_grid_shortcode($atts) {
    $atts  = shortcode_atts(['count' => 6], $atts, 'team_grid');
    $posts = get_posts([
        'post_type'   => 'team_member',
        'numberposts' => absint($atts['count']),
    ]);
 
    ob_start(); ?>
    &lt;div class="team-grid"&gt;
        &lt;?php foreach ($posts as $post) : setup_postdata($post); ?&gt;
            &lt;div class="team-card"&gt;
                &lt;?php the_post_thumbnail('thumbnail'); ?&gt;
                &lt;h3&gt;&lt;?php the_title(); ?&gt;&lt;/h3&gt;
            &lt;/div&gt;
        &lt;?php endforeach; wp_reset_postdata(); ?&gt;
    &lt;/div&gt;
    &lt;?php
    return ob_get_clean();
}</code></pre>
 
<h2>Registering Shortcodes in a Class</h2>
<pre><code>class My_Shortcodes {
    public function __construct() {
        add_shortcode('button',    [$this, 'button']);
        add_shortcode('highlight', [$this, 'highlight']);
    }
 
    public function button($atts, $content = null) { /* ... */ }
    public function highlight($atts, $content = null) { /* ... */ }
}
new My_Shortcodes();</code></pre>
 
<h2>When to Use Blocks Instead</h2>
<ul>
  <li>New projects targeting WordPress 5.0+ → use Gutenberg blocks</li>
  <li>Blocks offer live visual editing; shortcodes are blind text snippets</li>
  <li>Shortcodes still make sense for email templates, legacy content, and Classic Editor sites</li>
  <li>You can register a block that renders a shortcode internally during migration</li>
</ul>
  `
},
{
  id: "wordpress-email-smtp",
  title: "WordPress Email: Fixing wp_mail with SMTP and Custom Templates",
  date: "September 24, 2025",
  category: "WordPress",
  readTime: "7 min read",
  excerpt: "Why WordPress emails land in spam, how to configure SMTP properly, and how to build branded HTML email templates using wp_mail hooks.",
  cover: "",
  content: `
<h2>Why wp_mail Fails</h2>
<p>By default, <code>wp_mail()</code> uses the PHP <code>mail()</code> function — which sends from the server with no authentication. Most email providers flag these as spam or reject them outright. The fix is SMTP authentication through a dedicated mail service.</p>
 
<h2>Configuring SMTP Without a Plugin</h2>
<pre><code>add_action('phpmailer_init', 'configure_smtp');
 
function configure_smtp(PHPMailer\PHPMailer\PHPMailer $mailer) {
    $mailer->isSMTP();
    $mailer->Host        = 'smtp.gmail.com'; // or smtp.sendgrid.net etc.
    $mailer->SMTPAuth    = true;
    $mailer->Port        = 587;
    $mailer->SMTPSecure  = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mailer->Username    = defined('SMTP_USER') ? SMTP_USER : '';
    $mailer->Password    = defined('SMTP_PASS') ? SMTP_PASS : '';
}
 
// Store credentials in wp-config.php — never hardcode in theme files
// define('SMTP_USER', 'your@email.com');
// define('SMTP_PASS', 'your-app-password');</code></pre>
 
<h2>Sending HTML Email</h2>
<pre><code>// Set content type to HTML for a single send
add_filter('wp_mail_content_type', fn() => 'text/html');
 
$result = wp_mail(
    'client@example.com',
    'Your Order is Confirmed',
    get_order_email_html($order_id),
    ['From: Shubham Vikral &lt;hello@shubhamvikral.com&gt;']
);
 
// IMPORTANT: reset content type after sending
remove_filter('wp_mail_content_type', fn() => 'text/html');</code></pre>
 
<h2>Building a Reusable Email Template</h2>
<pre><code>function get_email_template($heading, $body_html) {
    $brand_color = '#E84B2B';
 
    ob_start(); ?>
    &lt;!DOCTYPE html&gt;
    &lt;html&gt;&lt;body style="font-family:sans-serif;background:#f5f5f5;margin:0;padding:40px 0;"&gt;
    &lt;table width="600" align="center" style="background:#fff;border-radius:4px;overflow:hidden;"&gt;
        &lt;tr&gt;
            &lt;td style="background:&lt;?= $brand_color ?&gt;;padding:28px 40px;"&gt;
                &lt;span style="color:#fff;font-size:22px;font-weight:700;"&gt;Shubham Vikral&lt;/span&gt;
            &lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td style="padding:40px;"&gt;
                &lt;h2 style="margin:0 0 20px;color:#0D0D0D;"&gt;&lt;?= esc_html($heading) ?&gt;&lt;/h2&gt;
                &lt;?= $body_html ?&gt;
            &lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td style="background:#f0f0f0;padding:20px 40px;font-size:12px;color:#999;"&gt;
                © &lt;?= date('Y') ?&gt; Shubham Vikral. All rights reserved.
            &lt;/td&gt;
        &lt;/tr&gt;
    &lt;/table&gt;
    &lt;/body&gt;&lt;/html&gt;
    &lt;?php
    return ob_get_clean();
}</code></pre>
 
<h2>Logging Sent Emails</h2>
<pre><code>add_action('wp_mail_succeeded', function($mail_data) {
    error_log(sprintf(
        '[EMAIL SENT] To: %s | Subject: %s | %s',
        implode(', ', (array)$mail_data['to']),
        $mail_data['subject'],
        current_time('mysql')
    ));
});
 
add_action('wp_mail_failed', function(WP_Error $error) {
    error_log('[EMAIL FAILED] ' . $error->get_error_message());
});</code></pre>
 
<ul>
  <li>Use a transactional email service: SendGrid, Mailgun, Postmark, or Amazon SES</li>
  <li>Always set <code>From</code> header to a domain you own and have SPF/DKIM set up for</li>
  <li>Test deliverability with <a href="https://mail-tester.com">mail-tester.com</a></li>
</ul>
  `
},
{
  id: "wordpress-coding-standards",
  title: "WordPress Coding Standards and Automated Code Review",
  date: "September 30, 2025",
  category: "WordPress",
  readTime: "8 min read",
  excerpt: "Set up PHP_CodeSniffer with the WordPress ruleset, integrate it in VS Code, and run automated checks in GitHub Actions CI/CD.",
  cover: "",
  content: `
<h2>Why Coding Standards Matter</h2>
<p>WordPress has its own coding standards — indentation, naming, spacing, DocBlocks. Following them makes your code readable to any WordPress developer, ensures compatibility with the ecosystem, and is required for WordPress.org submissions.</p>
 
<h2>Installing PHP_CodeSniffer</h2>
<pre><code># Install PHPCS and WordPress Coding Standards via Composer
composer require --dev squizlabs/php_codesniffer dealerdirect/phpcodesniffer-composer-installer wp-coding-standards/wpcs
 
# Verify installation
./vendor/bin/phpcs -i
# Should list: WordPress, WordPress-Core, WordPress-Docs, WordPress-Extra</code></pre>
 
<h2>phpcs.xml Configuration File</h2>
<pre><code>&lt;?xml version="1.0"?&gt;
&lt;ruleset name="My Theme"&gt;
    &lt;description&gt;WordPress coding standards for My Theme.&lt;/description&gt;
 
    &lt;file&gt;.&lt;/file&gt;
    &lt;exclude-pattern&gt;/vendor/*&lt;/exclude-pattern&gt;
    &lt;exclude-pattern&gt;/node_modules/*&lt;/exclude-pattern&gt;
 
    &lt;rule ref="WordPress"&gt;
        &lt;exclude name="WordPress.Files.FileName"/&gt;
    &lt;/rule&gt;
 
    &lt;rule ref="WordPress.WP.I18n"&gt;
        &lt;properties&gt;
            &lt;property name="text_domain" type="array" value="my-theme"/&gt;
        &lt;/properties&gt;
    &lt;/rule&gt;
 
    &lt;config name="minimum_wp_version" value="6.0"/&gt;
    &lt;config name="testVersion" value="8.0-"/&gt;
&lt;/ruleset&gt;</code></pre>
 
<h2>Running Checks</h2>
<pre><code># Check a file or directory
./vendor/bin/phpcs includes/class-admin.php
./vendor/bin/phpcs --standard=WordPress functions.php
 
# Auto-fix many issues
./vendor/bin/phpcbf functions.php
 
# Add to composer.json scripts for convenience
"scripts": {
    "lint": "phpcs",
    "fix":  "phpcbf"
}</code></pre>
 
<h2>VS Code Integration</h2>
<pre><code>// .vscode/settings.json
{
    "phpcs.enable": true,
    "phpcs.standard": "WordPress",
    "phpcs.executablePath": "./vendor/bin/phpcs",
    "[php]": {
        "editor.formatOnSave": true
    }
}</code></pre>
 
<h2>GitHub Actions CI</h2>
<pre><code># .github/workflows/phpcs.yml
name: PHP Coding Standards
 
on: [push, pull_request]
 
jobs:
  phpcs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
 
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          tools: composer
 
      - name: Install dependencies
        run: composer install --no-interaction
 
      - name: Run PHPCS
        run: ./vendor/bin/phpcs</code></pre>
 
<h2>Key WordPress Standards to Know</h2>
<ul>
  <li>Tabs for indentation (not spaces) — unusual but WordPress-specific</li>
  <li>Spaces inside parentheses: <code>if ( $condition )</code></li>
  <li>Yoda conditions: <code>if ( 'value' === $variable )</code></li>
  <li>All functions and variables use <code>snake_case</code></li>
  <li>Class names use <code>PascalCase</code></li>
  <li>Constants use <code>UPPER_CASE</code></li>
  <li>Always use <code>strict_types=1</code> in modern code</li>
</ul>
  `
},
{
  id: "wordpress-options-settings-api",
  title: "WordPress Options API vs Settings API: When to Use Each",
  date: "October 6, 2025",
  category: "WordPress",
  readTime: "7 min read",
  excerpt: "Understand the difference between get_option() and the Settings API, how to build a proper settings page, and how to handle sanitisation and validation.",
  cover: "",
  content: `
<h2>The Two Ways to Store Settings</h2>
<p>WordPress stores plugin and theme settings in the <code>wp_options</code> table. You can interact with it directly via the Options API, or use the higher-level Settings API which handles nonces, sanitisation hooks, and admin page integration automatically.</p>
 
<h2>Options API — Direct Access</h2>
<pre><code>// Store a value
update_option('my_plugin_api_key', sanitize_text_field($key));
 
// Retrieve a value (with default)
$key = get_option('my_plugin_api_key', '');
 
// Delete a value
delete_option('my_plugin_api_key');
 
// Autoloading — set to 'no' for large data or rarely-accessed options
update_option('my_plugin_big_data', $data, 'no');</code></pre>
 
<h2>Storing Arrays as a Single Option</h2>
<pre><code>// Good practice — one option for related settings
$defaults = [
    'enable_feature' => false,
    'items_per_page' => 10,
    'api_key'        => '',
];
 
// Get all settings with defaults
$settings = wp_parse_args(
    get_option('my_plugin_settings', []),
    $defaults
);
 
// Update all settings at once
update_option('my_plugin_settings', $sanitized_settings);</code></pre>
 
<h2>Settings API — For Admin Pages</h2>
<pre><code>add_action('admin_init', 'my_plugin_register_settings');
 
function my_plugin_register_settings() {
    register_setting(
        'my_plugin_group',       // option group (used in settings_fields())
        'my_plugin_settings',    // option name
        'my_plugin_sanitize'     // sanitize callback
    );
 
    add_settings_section(
        'my_plugin_general',
        'General Settings',
        '__return_false',
        'my-plugin-page'
    );
 
    add_settings_field(
        'api_key',
        'API Key',
        'my_plugin_api_key_field',
        'my-plugin-page',
        'my_plugin_general'
    );
}
 
function my_plugin_api_key_field() {
    $opts = get_option('my_plugin_settings', []);
    echo '&lt;input type="text" name="my_plugin_settings[api_key]"
               value="' . esc_attr($opts['api_key'] ?? '') . '" class="regular-text"&gt;';
}
 
function my_plugin_sanitize($input) {
    return [
        'api_key' => sanitize_text_field($input['api_key'] ?? ''),
    ];
}</code></pre>
 
<h2>The Admin Page Form</h2>
<pre><code>&lt;?php
add_action('admin_menu', function() {
    add_options_page('My Plugin', 'My Plugin', 'manage_options', 'my-plugin-page', 'my_plugin_page');
});
 
function my_plugin_page() {
    if (!current_user_can('manage_options')) return;
    settings_errors('my_plugin_settings');
    ?&gt;
    &lt;div class="wrap"&gt;
        &lt;h1&gt;&lt;?= esc_html(get_admin_page_title()) ?&gt;&lt;/h1&gt;
        &lt;form method="post" action="options.php"&gt;
            &lt;?php
            settings_fields('my_plugin_group');   // nonce + action fields
            do_settings_sections('my-plugin-page'); // renders sections + fields
            submit_button();
            ?&gt;
        &lt;/form&gt;
    &lt;/div&gt;
    &lt;?php
}</code></pre>
 
<ul>
  <li>Use the Options API directly for simple programmatic reads/writes</li>
  <li>Use the Settings API when you need an admin UI — it handles nonces automatically</li>
  <li>Mark large options as non-autoloaded (<code>'no'</code>) to keep the autoloaded options cache lean</li>
  <li>Never store passwords or secrets in plain text — use <code>wp_hash_password()</code> or encrypted storage</li>
</ul>
  `
},
{
  id: "wordpress-dashboard-widget",
  title: "Building a Custom WordPress Dashboard Widget",
  date: "October 12, 2025",
  category: "WordPress",
  readTime: "5 min read",
  excerpt: "Add a custom widget to the WordPress admin dashboard — with live data, role-based visibility, and AJAX refresh functionality.",
  cover: "",
  content: `
<h2>Registering a Dashboard Widget</h2>
<pre><code>add_action('wp_dashboard_setup', 'register_my_dashboard_widget');
 
function register_my_dashboard_widget() {
    wp_add_dashboard_widget(
        'my_site_stats',            // Widget ID
        'Site Statistics',          // Widget title
        'render_site_stats_widget', // Callback function
        null,                       // Control callback (for configurable widgets)
        null,                       // Callback arguments
        'normal',                   // Context: normal, side, column3, column4
        'high'                      // Priority: high, core, default, low
    );
}</code></pre>
 
<h2>Rendering the Widget</h2>
<pre><code>function render_site_stats_widget() {
    $post_count    = wp_count_posts('post')->publish;
    $page_count    = wp_count_posts('page')->publish;
    $comment_count = wp_count_comments()->approved;
    $user_count    = count_users()['total_users'];
    ?>
    &lt;div id="my-site-stats"&gt;
        &lt;ul style="margin:0;padding:0;list-style:none;"&gt;
            &lt;li style="padding:8px 0;border-bottom:1px solid #f0f0f0;"&gt;
                📝 &lt;strong&gt;&lt;?= $post_count ?&gt;&lt;/strong&gt; Published Posts
            &lt;/li&gt;
            &lt;li style="padding:8px 0;border-bottom:1px solid #f0f0f0;"&gt;
                📄 &lt;strong&gt;&lt;?= $page_count ?&gt;&lt;/strong&gt; Pages
            &lt;/li&gt;
            &lt;li style="padding:8px 0;border-bottom:1px solid #f0f0f0;"&gt;
                💬 &lt;strong&gt;&lt;?= $comment_count ?&gt;&lt;/strong&gt; Comments
            &lt;/li&gt;
            &lt;li style="padding:8px 0;"&gt;
                👥 &lt;strong&gt;&lt;?= $user_count ?&gt;&lt;/strong&gt; Users
            &lt;/li&gt;
        &lt;/ul&gt;
        &lt;p&gt;
            &lt;button class="button" id="refresh-stats"&gt;Refresh&lt;/button&gt;
            &lt;span id="stats-updated" style="margin-left:10px;color:#999;font-size:12px;"&gt;&lt;/span&gt;
        &lt;/p&gt;
    &lt;/div&gt;
    &lt;?php
}</code></pre>
 
<h2>Role-Based Visibility</h2>
<pre><code>function register_my_dashboard_widget() {
    // Only show to administrators
    if (!current_user_can('manage_options')) return;
 
    wp_add_dashboard_widget('my_site_stats', 'Site Statistics', 'render_site_stats_widget');
}</code></pre>
 
<h2>AJAX Refresh</h2>
<pre><code>// Register AJAX handler
add_action('wp_ajax_refresh_site_stats', 'ajax_refresh_stats');
 
function ajax_refresh_stats() {
    check_ajax_referer('stats_nonce', 'nonce');
    if (!current_user_can('manage_options')) wp_die();
 
    ob_start();
    render_site_stats_widget();
    wp_send_json_success(['html' => ob_get_clean()]);
}
 
// Enqueue the script
add_action('admin_enqueue_scripts', function($hook) {
    if ($hook !== 'index.php') return;
    wp_enqueue_script('my-dashboard', get_template_directory_uri() . '/js/dashboard.js', ['jquery'], null, true);
    wp_localize_script('my-dashboard', 'dashboardData', [
        'nonce'  => wp_create_nonce('stats_nonce'),
        'ajaxUrl' => admin_url('admin-ajax.php'),
    ]);
});</code></pre>
 
<ul>
  <li>Use <code>remove_meta_box()</code> to hide default dashboard widgets you don't need</li>
  <li>Wrap widget content in a <code>div</code> with a unique ID for easy AJAX targeting</li>
  <li>Store widget preferences (e.g. which stats to show) using the user meta API</li>
</ul>
  `
},
{
  id: "wordpress-advanced-custom-fields",
  title: "Advanced Custom Fields: Beyond the Basics",
  date: "October 18, 2025",
  category: "WordPress",
  readTime: "9 min read",
  excerpt: "Go beyond simple text fields — repeater fields, flexible content layouts, ACF Blocks, meta queries, and syncing field groups via JSON.",
  cover: "",
  content: `
<h2>Why ACF is a Developer's Best Tool</h2>
<p>Advanced Custom Fields turns WordPress's generic content model into a structured data system. With ACF Pro, you can build complex, repeatable data structures with a drag-and-drop interface — no custom meta box code required.</p>
 
<h2>Repeater Fields</h2>
<pre><code>&lt;?php
// Field group: "Team Members" attached to page "About Us"
// Repeater field: "team_members"
//   Sub-fields: name (text), role (text), photo (image), bio (textarea)
 
if (have_rows('team_members')) :
    while (have_rows('team_members')) : the_row(); ?>
        &lt;div class="team-card"&gt;
            &lt;?php
            $photo = get_sub_field('photo');
            if ($photo) {
                echo wp_get_attachment_image($photo['ID'], 'medium');
            }
            ?&gt;
            &lt;h3&gt;&lt;?= esc_html(get_sub_field('name')) ?&gt;&lt;/h3&gt;
            &lt;p class="role"&gt;&lt;?= esc_html(get_sub_field('role')) ?&gt;&lt;/p&gt;
            &lt;p&gt;&lt;?= esc_html(get_sub_field('bio')) ?&gt;&lt;/p&gt;
        &lt;/div&gt;
    &lt;?php endwhile;
endif;</code></pre>
 
<h2>Flexible Content Layouts</h2>
<pre><code>&lt;?php
// Flexible content field: "page_sections"
// Layouts: hero, text_block, image_gallery, cta_banner
 
if (have_rows('page_sections')) :
    while (have_rows('page_sections')) : the_row();
        if (is_layout('hero')) {
            get_template_part('template-parts/section', 'hero');
        } elseif (is_layout('text_block')) {
            get_template_part('template-parts/section', 'text-block');
        } elseif (is_layout('cta_banner')) {
            get_template_part('template-parts/section', 'cta');
        }
    endwhile;
endif;</code></pre>
 
<h2>ACF Blocks (Gutenberg)</h2>
<pre><code>// Register a custom Gutenberg block powered by ACF
add_action('acf/init', 'register_acf_blocks');
 
function register_acf_blocks() {
    acf_register_block_type([
        'name'            => 'testimonial',
        'title'           => 'Testimonial',
        'description'     => 'A testimonial block.',
        'render_template' => 'template-parts/blocks/testimonial.php',
        'category'        => 'formatting',
        'icon'            => 'format-quote',
        'keywords'        => ['testimonial', 'quote'],
        'supports'        => ['align' => false],
    ]);
}</code></pre>
 
<h2>Querying by ACF Field Value</h2>
<pre><code>// Find all properties priced under £500,000
$properties = new WP_Query([
    'post_type'  => 'property',
    'meta_query' => [
        [
            'key'     => 'price',       // ACF field name = meta key
            'value'   => 500000,
            'compare' => '&lt;=',
            'type'    => 'NUMERIC',
        ],
        [
            'key'     => 'status',
            'value'   => 'available',
            'compare' => '=',
        ],
        'relation' => 'AND',
    ],
]);</code></pre>
 
<h2>Syncing Field Groups via JSON</h2>
<p>Enable Local JSON so field group definitions are saved as .json files — version-controllable and deployable without a database sync:</p>
<pre><code>// Save JSON to your theme's acf-json folder
add_filter('acf/settings/save_json', function($path) {
    return get_stylesheet_directory() . '/acf-json';
});
 
// Load from the same folder
add_filter('acf/settings/load_json', function($paths) {
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return $paths;
});</code></pre>
 
<ul>
  <li>Always use the field's <strong>name</strong> (not label) as the <code>get_field()</code> argument</li>
  <li>Use <code>get_field()</code> outside the loop — pass the post ID as the second argument</li>
  <li>ACF stores data as post meta — fields are queryable with standard <code>meta_query</code></li>
</ul>
  `
},
{
  id: "wordpress-multisite-plugin-dev",
  title: "Developing Plugins for WordPress Multisite Networks",
  date: "October 25, 2025",
  category: "WordPress",
  readTime: "8 min read",
  excerpt: "Build plugins that work correctly across a Multisite network — network activation, per-site settings, switching between sites, and shared network data.",
  cover: "",
  content: `
<h2>Multisite-Aware Plugin Architecture</h2>
<p>A plugin that works perfectly on a single site can break on Multisite if it doesn't account for multiple databases, separate upload directories, and network vs site-level operations. Here's how to build correctly from the start.</p>
 
<h2>Network Activation Hook</h2>
<pre><code>// Fires when a Super Admin activates for the whole network
register_activation_hook(__FILE__, 'my_plugin_activate');
 
function my_plugin_activate($network_wide) {
    if (is_multisite() && $network_wide) {
        // Activate for every existing site in the network
        $sites = get_sites(['number' => 0, 'fields' => 'ids']);
        foreach ($sites as $site_id) {
            switch_to_blog($site_id);
            my_plugin_create_tables();
            restore_current_blog();
        }
    } else {
        my_plugin_create_tables();
    }
}
 
// Also activate for new sites added after plugin installation
add_action('wp_initialize_site', function(WP_Site $site) {
    if (is_plugin_active_for_network(plugin_basename(__FILE__))) {
        switch_to_blog($site->blog_id);
        my_plugin_create_tables();
        restore_current_blog();
    }
});</code></pre>
 
<h2>Per-Site vs Network-Wide Options</h2>
<pre><code>// Per-site option — stored in each site's wp_X_options table
update_option('my_plugin_setting', $value);
$value = get_option('my_plugin_setting');
 
// Network-wide option — stored in wp_sitemeta, shared across all sites
update_site_option('my_plugin_network_setting', $value);
$value = get_site_option('my_plugin_network_setting');</code></pre>
 
<h2>Switching Between Sites</h2>
<pre><code>// Query data from a specific site
switch_to_blog(3); // switch to site ID 3
 
$posts = get_posts(['post_type' => 'portfolio', 'numberposts' => 5]);
$option = get_option('theme_color');
 
restore_current_blog(); // always restore — never leave it switched
 
// Get current site info
$current_blog_id = get_current_blog_id();
$site = get_site($current_blog_id);
echo $site->blogname . ' — ' . $site->siteurl;</code></pre>
 
<h2>Network Admin Menu Page</h2>
<pre><code>// Adds a page to Network Admin → Settings
add_action('network_admin_menu', function() {
    add_menu_page(
        'My Plugin Network Settings',
        'My Plugin',
        'manage_network_options',
        'my-plugin-network',
        'render_network_settings_page',
        'dashicons-admin-network'
    );
});
 
// Save network options (requires custom form handling — no Settings API here)
add_action('network_admin_edit_my_plugin_save', function() {
    check_admin_referer('my_plugin_network_nonce');
    update_site_option('my_plugin_setting', sanitize_text_field($_POST['setting']));
    wp_redirect(network_admin_url('admin.php?page=my-plugin-network&updated=true'));
    exit;
});</code></pre>
 
<h2>Multisite-Specific Checks</h2>
<pre><code>is_multisite()                     // true if Multisite is enabled
is_main_site()                     // true if current site is the main site
is_plugin_active_for_network($file) // true if network-activated
is_super_admin()                   // true if current user is Super Admin
get_main_site_id()                 // returns the main site's blog_id</code></pre>
 
<ul>
  <li>Always call <code>restore_current_blog()</code> after <code>switch_to_blog()</code> — not doing so corrupts the global state</li>
  <li>Use <code>get_sites()</code> instead of direct SQL to list sites — it handles active/deleted/archived filters</li>
  <li>Test with at least 3 sites in your network — bugs often only appear on sub-sites, not the main site</li>
</ul>
  `
},
{
  id: "wordpress-gutenberg-block-patterns",
  title: "WordPress Block Patterns and Block Themes: The Full Picture",
  date: "November 1, 2025",
  category: "WordPress",
  readTime: "9 min read",
  excerpt: "Register custom block patterns, build a Full Site Editing block theme with template parts, and use theme.json to control your design system.",
  cover: "",
  content: `
<h2>What Are Block Patterns?</h2>
<p>Block patterns are pre-designed, reusable arrangements of blocks that editors can insert from the block inserter. They're like shortcodes but visual — the editor sees the actual layout before inserting it.</p>
 
<h2>Registering a Block Pattern</h2>
<pre><code>add_action('init', 'register_my_block_patterns');
 
function register_my_block_patterns() {
    register_block_pattern(
        'my-theme/hero-with-cta',
        [
            'title'       => 'Hero with CTA',
            'description' => 'A full-width hero section with heading, subtext, and a call-to-action button.',
            'categories'  => ['featured'],
            'content'     => '&lt;!-- wp:cover {"overlayColor":"ink","minHeight":600} --&gt;
                &lt;div class="wp-block-cover"&gt;
                &lt;!-- wp:heading {"textColor":"white","fontSize":"huge"} --&gt;
                &lt;h2&gt;Your Headline Here&lt;/h2&gt;
                &lt;!-- /wp:heading --&gt;
                &lt;!-- wp:buttons --&gt;
                &lt;div class="wp-block-buttons"&gt;
                &lt;!-- wp:button --&gt;
                &lt;div class="wp-block-button"&gt;&lt;a class="wp-block-button__link"&gt;Get Started&lt;/a&gt;&lt;/div&gt;
                &lt;!-- /wp:button --&gt;&lt;/div&gt;
                &lt;!-- /wp:buttons --&gt;
                &lt;/div&gt;
                &lt;!-- /wp:cover --&gt;',
        ]
    );
}</code></pre>
 
<h2>Block Theme Structure</h2>
<pre><code>my-block-theme/
  style.css          ← theme header only (styles go in theme.json)
  functions.php
  theme.json         ← design tokens, typography, layout
  templates/
    index.html       ← default template
    single.html
    archive.html
    404.html
  parts/
    header.html      ← template parts
    footer.html
    sidebar.html</code></pre>
 
<h2>theme.json — Your Design System</h2>
<pre><code>{
  "version": 3,
  "settings": {
    "color": {
      "palette": [
        { "slug": "accent",  "color": "#E84B2B", "name": "Accent"  },
        { "slug": "ink",     "color": "#0D0D0D", "name": "Ink"     },
        { "slug": "cream",   "color": "#F5F0E8", "name": "Cream"   }
      ]
    },
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "'Bebas Neue', sans-serif",
          "slug": "display",
          "name": "Display"
        }
      ],
      "fontSizes": [
        { "slug": "small",  "size": "13px", "name": "Small"  },
        { "slug": "medium", "size": "16px", "name": "Medium" },
        { "slug": "large",  "size": "32px", "name": "Large"  }
      ]
    },
    "layout": {
      "contentSize": "760px",
      "wideSize": "1200px"
    }
  }
}</code></pre>
 
<h2>Template Parts in HTML Templates</h2>
<pre><code>&lt;!-- templates/index.html --&gt;
&lt;!-- wp:template-part {"slug":"header","tagName":"header"} /--&gt;
 
&lt;main&gt;
  &lt;!-- wp:query {"queryId":1,"query":{"perPage":10,"offset":0}} --&gt;
  &lt;!-- wp:post-template --&gt;
    &lt;!-- wp:post-title {"isLink":true} /--&gt;
    &lt;!-- wp:post-excerpt /--&gt;
  &lt;!-- /wp:post-template --&gt;
  &lt;!-- wp:query-pagination /--&gt;
  &lt;!-- /wp:query --&gt;
&lt;/main&gt;
 
&lt;!-- wp:template-part {"slug":"footer","tagName":"footer"} /--&gt;</code></pre>
 
<ul>
  <li>Theme patterns can also be loaded from <code>.php</code> files in a <code>patterns/</code> folder — WordPress auto-registers them</li>
  <li>Use <code>register_block_pattern_category()</code> to group your patterns in the inserter</li>
  <li><code>theme.json</code> values become CSS custom properties automatically — access them as <code>var(--wp--preset--color--accent)</code></li>
</ul>
  `
},
 
];

// ─────────────────────────────────────────────────────────────────────────────
//  HOW TO ADD A NEW BLOG POST
//
//  1. Copy the template below
//  2. Fill in all fields
//  3. Add it to the blogs array above
//  4. Save the file — the blog listing and detail pages update automatically
//
// Template:
// {
//   id: "your-post-slug",              ← used in URL: /blog/your-post-slug
//   title: "Your Post Title",
//   date: "July 20, 2025",
//   category: "WordPress",             ← shown as tag on card
//   readTime: "5 min read",
//   excerpt: "Short description shown on the blog listing page.",
//   cover: "",                         ← URL to cover image, or "" for gradient
//   content: `
//     <h2>Section Heading</h2>
//     <p>Your paragraph text here.</p>
//     <pre><code>your code here</code></pre>
//     <ul>
//       <li>List item</li>
//     </ul>
//     <blockquote>A quote or callout.</blockquote>
//   `
// },
// ─────────────────────────────────────────────────────────────────────────────
