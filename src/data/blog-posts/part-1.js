// Blog entries in original order. Add new entries to the final part.
export const blogEntries = [
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
  }
]
