/**
 * Generates 50 blog posts and appends them to src/data/blogs.js
 * Run: node scripts/generate-50-blogs.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const blogsPath = resolve(root, 'src/data/blogs.js')

const posts = [
  meta('wordpress-cron-jobs-wp-cron', 'Mastering WP-Cron: Scheduled Tasks Without Crontab Headaches', 'November 5, 2025', 'WordPress', '8 min read',
    'How WP-Cron really works, when to disable it, and how to run reliable scheduled jobs with real system cron.'),
  meta('wordpress-user-roles-capabilities', 'WordPress Roles and Capabilities: Building Fine-Grained Access Control', 'November 8, 2025', 'WordPress', '9 min read',
    'Create custom roles, add capabilities, and lock down admin features without brittle role-name checks.'),
  meta('wordpress-media-library-optimization', 'Optimising the WordPress Media Library for Speed and Storage', 'November 12, 2025', 'WordPress', '7 min read',
    'WebP conversion, offloading to S3/CDN, cleaning orphaned attachments, and smarter image delivery.'),
  meta('wordpress-rewrite-rules-permalinks', 'Pretty Permalinks and Custom Rewrite Rules in WordPress', 'November 15, 2025', 'WordPress', '8 min read',
    'Register custom endpoints, flush rules safely, and debug 404s when your rewrite map goes wrong.'),
  meta('wordpress-object-cache-redis', 'WordPress Object Cache with Redis: Cut Database Load Dramatically', 'November 18, 2025', 'WordPress', '9 min read',
    'Persistent object caching explained — drop-in setup, what to cache, and common Redis pitfalls on shared hosting.'),
  meta('wordpress-responsive-images-srcset', 'Responsive Images in WordPress: srcset, sizes, and Custom Image Sizes', 'November 22, 2025', 'WordPress', '7 min read',
    'Stop shipping 2000px images to phones. Register sizes, fix sizes attributes, and serve modern formats.'),
  meta('wordpress-nav-walker-custom-menus', 'Custom Navigation Menus and Walkers in WordPress', 'November 25, 2025', 'WordPress', '8 min read',
    'Build accessible mega-menus and custom markup with Walker_Nav_Menu without fighting the default output.'),
  meta('wordpress-widgets-sidebars-api', 'WordPress Widgets and Sidebars API: Still Useful in a Block World', 'November 28, 2025', 'WordPress', '6 min read',
    'Register sidebars, build classic widgets, and migrate legacy widget areas without breaking client sites.'),
  meta('wordpress-ajax-admin-ajax-fetch', 'WordPress AJAX Done Right: admin-ajax, REST, and Modern Fetch', 'December 2, 2025', 'WordPress', '8 min read',
    'Secure AJAX handlers with nonces, compare admin-ajax vs REST API, and ship snappy front-end interactions.'),
  meta('wordpress-nonce-csrf-protection', 'WordPress Nonces Explained: CSRF Protection for Forms and AJAX', 'December 5, 2025', 'WordPress', '6 min read',
    'What nonces actually protect, how long they last, and the correct verify patterns for forms and endpoints.'),
  meta('wordpress-page-templates-explained', 'WordPress Page Templates: When and How to Use Them', 'December 8, 2025', 'WordPress', '6 min read',
    'Full-width layouts, landing pages, and template hierarchy tricks using classic and block theme templates.'),
  meta('wordpress-conditional-tags-guide', 'WordPress Conditional Tags: Control Layout Without Duplicating Templates', 'December 11, 2025', 'WordPress', '7 min read',
    'is_singular, is_front_page, in_category, and the conditionals that keep templates DRY and readable.'),
  meta('wordpress-enqueue-scripts-best-practices', 'wp_enqueue Best Practices: Scripts, Styles, and Dependency Hell', 'December 14, 2025', 'WordPress', '7 min read',
    'Load assets only where needed, manage versions for cache busting, and stop hardcoding script tags forever.'),
  meta('wordpress-debugging-wp-debug', 'Debugging WordPress Like a Pro: WP_DEBUG, Query Monitor, and Logs', 'December 17, 2025', 'WordPress', '8 min read',
    'Turn on safe debugging, hunt white screens, and use Query Monitor to find slow queries and hook spam.'),
  meta('wordpress-staging-to-production', 'WordPress Staging to Production: A Safe Deployment Checklist', 'December 20, 2025', 'WordPress', '8 min read',
    'Search-replace URLs, migrate databases cleanly, and avoid the classic “works on staging only” disasters.'),
  meta('wordpress-backup-disaster-recovery', 'WordPress Backup and Disaster Recovery That Actually Works', 'December 23, 2025', 'WordPress', '7 min read',
    'What to back up, how often, offsite storage, and how to test restores before you need them at 2 a.m.'),
  meta('wordpress-seo-technical-checklist', 'Technical SEO for WordPress Developers: Beyond Plugin Defaults', 'December 27, 2025', 'WordPress', '9 min read',
    'Schema, sitemaps, crawl budget, canonical tags, and performance signals that plugins alone will not fix.'),
  meta('wordpress-custom-forms-without-plugins', 'Building Contact Forms in WordPress Without Heavy Plugins', 'December 30, 2025', 'WordPress', '8 min read',
    'Secure custom forms with nonces, sanitization, spam protection, and reliable email delivery.'),
  meta('wordpress-taxonomy-archives-custom', 'Custom Taxonomy Archives and Term Meta in WordPress', 'January 3, 2026', 'WordPress', '8 min read',
    'Design useful taxonomy landing pages, store term meta, and query posts by related terms efficiently.'),
  meta('wordpress-login-customization', 'Customising the WordPress Login Screen and Authentication Flow', 'January 6, 2026', 'WordPress', '6 min read',
    'Brand wp-login.php, redirect after login, and harden authentication without locking yourself out.'),
  meta('wordpress-admin-ui-customization', 'Customising the WordPress Admin for Client-Friendly CMS Experiences', 'January 9, 2026', 'WordPress', '8 min read',
    'Clean dashboards, custom columns, help tabs, and role-aware menus that make editors love the CMS.'),
  meta('wordpress-rest-api-authentication', 'WordPress REST API Authentication: Cookies, Application Passwords, and JWT', 'January 12, 2026', 'WordPress', '9 min read',
    'Choose the right auth method for headless apps, mobile clients, and internal tooling securely.'),
  meta('wordpress-block-styles-variations', 'Block Styles and Variations: Extend Gutenberg Without Building New Blocks', 'January 15, 2026', 'WordPress', '7 min read',
    'Register style variations, block variations, and editor UI polish that keep content teams productive.'),
  meta('wordpress-filesystem-api', 'The WordPress Filesystem API: Safe File Operations on Any Host', 'January 18, 2026', 'WordPress', '7 min read',
    'Write and read files the WordPress way — direct, FTP, or SSH — without permission nightmares.'),
  meta('wordpress-gdpr-privacy-compliance', 'WordPress Privacy and GDPR Essentials for Developers', 'January 21, 2026', 'WordPress', '8 min read',
    'Export/erase personal data, cookie consent patterns, and privacy-by-design hooks in core WordPress.'),
  meta('wordpress-comments-moderation-api', 'Working with the WordPress Comment System Programmatically', 'January 24, 2026', 'WordPress', '6 min read',
    'Moderate comments via code, add meta, disable spam vectors, and rebuild comment UIs when needed.'),
  meta('wordpress-database-custom-tables', 'When to Use Custom Database Tables in WordPress Plugins', 'January 27, 2026', 'WordPress', '9 min read',
    'Post meta vs custom tables, dbDelta migrations, and schema design for high-volume plugin data.'),
  meta('wordpress-headless-architecture', 'Headless WordPress Architecture: When It Helps and When It Hurts', 'January 30, 2026', 'WordPress', '8 min read',
    'REST vs GraphQL, preview workflows, caching layers, and realistic trade-offs for headless CMS builds.'),
  meta('wordpress-cli-automation-scripts', 'Automating WordPress with WP-CLI Scripts and Bash', 'February 2, 2026', 'WordPress', '7 min read',
    'Bulk user imports, search-replace, plugin scaffolding, and nightly maintenance scripts with WP-CLI.'),
  meta('wordpress-multisite-domain-mapping', 'WordPress Multisite Domain Mapping Without the Pain', 'February 5, 2026', 'WordPress', '8 min read',
    'Map custom domains, SSL considerations, and cookie/domain gotchas on modern Multisite networks.'),
  meta('woocommerce-custom-product-types', 'Creating Custom WooCommerce Product Types', 'February 8, 2026', 'WooCommerce', '9 min read',
    'Register a new product type, add admin fields, and control cart and checkout behaviour cleanly.'),
  meta('woocommerce-order-status-hooks', 'WooCommerce Order Statuses and Lifecycle Hooks', 'February 11, 2026', 'WooCommerce', '8 min read',
    'Hook into order status changes, send custom emails, and build fulfilment workflows that scale.'),
  meta('woocommerce-payment-gateway-basics', 'Building a Simple WooCommerce Payment Gateway', 'February 14, 2026', 'WooCommerce', '10 min read',
    'Extend WC_Payment_Gateway, handle callbacks, and process payments without reinventing checkout.'),
  meta('woocommerce-shipping-methods-custom', 'Custom WooCommerce Shipping Methods Explained', 'February 17, 2026', 'WooCommerce', '8 min read',
    'Calculate rates dynamically by weight, zone, and cart contents with a maintainable shipping class.'),
  meta('woocommerce-cart-checkout-performance', 'Speeding Up WooCommerce Cart and Checkout', 'February 20, 2026', 'WooCommerce', '7 min read',
    'Reduce AJAX chatter, defer non-critical scripts, and keep conversion-critical pages fast under load.'),
  meta('php-8-features-for-wordpress', 'PHP 8 Features Every WordPress Developer Should Use', 'February 23, 2026', 'PHP', '8 min read',
    'Named arguments, match expressions, nullsafe operator, and typed properties in real WP code.'),
  meta('php-composer-in-wordpress-projects', 'Using Composer in WordPress Themes and Plugins', 'February 26, 2026', 'PHP', '7 min read',
    'Autoload classes, manage third-party packages, and ship production builds without vendor bloat chaos.'),
  meta('php-error-handling-exceptions', 'PHP Error Handling and Exceptions in Application Code', 'March 1, 2026', 'PHP', '7 min read',
    'When to throw, when to return WP_Error, and how to log failures without leaking details to users.'),
  meta('laravel-queues-background-jobs', 'Laravel Queues and Background Jobs for Real-World Workloads', 'March 4, 2026', 'Laravel', '8 min read',
    'Dispatch jobs, choose queue drivers, handle failures, and keep HTTP requests fast under heavy work.'),
  meta('laravel-eloquent-performance-tips', 'Eloquent Performance Tips: N+1 Queries and Beyond', 'March 7, 2026', 'Laravel', '8 min read',
    'Eager loading, select columns wisely, chunk large datasets, and profile queries before they hurt production.'),
  meta('javascript-modules-wordpress-blocks', 'ES Modules and Modern JavaScript in WordPress Block Development', 'March 10, 2026', 'JavaScript', '7 min read',
    'Use @wordpress/scripts, modular block code, and maintainable JS as your block library grows.'),
  meta('javascript-dom-performance', 'DOM Performance in JavaScript: Practical Wins for Real Sites', 'March 13, 2026', 'JavaScript', '7 min read',
    'Batch reads/writes, use event delegation, and avoid layout thrashing on interactive marketing pages.'),
  meta('css-container-queries-layouts', 'CSS Container Queries for Truly Component-Driven Layouts', 'March 16, 2026', 'CSS', '6 min read',
    'Stop relying only on viewport media queries — style components based on their own container width.'),
  meta('css-custom-properties-design-tokens', 'Design Tokens with CSS Custom Properties in Production Themes', 'March 19, 2026', 'CSS', '7 min read',
    'Build a token system for colour, type, and spacing that works with WordPress theme.json and SCSS.'),
  meta('mysql-indexing-for-wordpress', 'MySQL Indexing Strategies Every WordPress Developer Needs', 'March 22, 2026', 'MySQL', '8 min read',
    'Understand EXPLAIN, composite indexes, and why meta_query can destroy performance without planning.'),
  meta('angular-rxjs-operators-essentials', 'RxJS Operators Every Angular Developer Should Know', 'March 25, 2026', 'Angular', '8 min read',
    'switchMap, combineLatest, debounceTime, and patterns that keep streams readable and leak-free.'),
  meta('devops-github-actions-wordpress', 'CI/CD for WordPress with GitHub Actions', 'March 28, 2026', 'DevOps', '9 min read',
    'Lint, test, build, and deploy themes/plugins automatically — with secrets handled correctly.'),
  meta('best-practices-code-reviews-web', 'Code Review Best Practices for Web Development Teams', 'April 1, 2026', 'Best Practices', '6 min read',
    'Review for intent, security, and maintainability — not just style nits — and keep PRs shippable.'),
  meta('career-freelance-wordpress-pricing', 'Pricing WordPress Freelance Work Without Undervaluing Yourself', 'April 4, 2026', 'Career', '7 min read',
    'Scopes, retainers, fixed-price traps, and how to communicate value to non-technical clients.'),
  meta('best-practices-api-design-rest', 'REST API Design Best Practices for Frontend-Friendly Backends', 'April 7, 2026', 'Best Practices', '8 min read',
    'Consistent resources, pagination, error shapes, versioning, and auth patterns that scale with clients.'),
]

function meta(id, title, date, category, readTime, excerpt) {
  return { id, title, date, category, readTime, excerpt, cover: '' }
}

/** Full HTML bodies keyed by id */
const bodies = {
  'wordpress-cron-jobs-wp-cron': `
<h2>How WP-Cron Actually Works</h2>
<p>WP-Cron is not a real system cron. It runs when someone visits your site, checks due events, and executes them in that request. On low-traffic sites, jobs can fire late. On high-traffic sites, concurrent visits can spawn overlapping runs.</p>

<h2>See What Is Scheduled</h2>
<pre><code>wp cron event list
wp cron event run --due-now</code></pre>

<h2>Schedule a Custom Event</h2>
<pre><code>if (!wp_next_scheduled('my_plugin_hourly_cleanup')) {
    wp_schedule_event(time(), 'hourly', 'my_plugin_hourly_cleanup');
}

add_action('my_plugin_hourly_cleanup', function () {
    // cleanup logic
});</code></pre>

<h2>Use Real System Cron in Production</h2>
<pre><code>// wp-config.php
define('DISABLE_WP_CRON', true);</code></pre>
<pre><code># crontab -e
*/5 * * * * curl -s https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&amp;1</code></pre>

<ul>
  <li>Always unschedule on plugin deactivation with <code>wp_clear_scheduled_hook()</code></li>
  <li>Keep cron callbacks fast — queue heavy work elsewhere</li>
  <li>Log failures; silent cron bugs are the worst kind</li>
</ul>
<blockquote>Reliable scheduling is infrastructure. Treat WP-Cron like a queue, not magic.</blockquote>
`,

  'wordpress-user-roles-capabilities': `
<h2>Roles Are Bags of Capabilities</h2>
<p>WordPress does not check role names for most permissions — it checks capabilities. Hardcoding <code>current_user_can('administrator')</code> is brittle. Prefer capability checks like <code>edit_posts</code> or your own custom caps.</p>

<h2>Add a Custom Role</h2>
<pre><code>add_role('project_manager', 'Project Manager', [
    'read'          => true,
    'edit_posts'    => true,
    'upload_files'  => true,
    'publish_posts' => false,
]);</code></pre>

<h2>Grant a Capability to Editors</h2>
<pre><code>$role = get_role('editor');
if ($role) {
    $role->add_cap('manage_woocommerce');
}</code></pre>

<h2>Check Access Correctly</h2>
<pre><code>if (!current_user_can('edit_others_posts')) {
    wp_die('Insufficient permissions');
}</code></pre>

<ul>
  <li>Remove custom roles on uninstall if you added them</li>
  <li>Never rely only on hiding UI — enforce caps server-side</li>
  <li>Map meta capabilities for custom post types carefully</li>
</ul>
<blockquote>Capability-first thinking scales; role-name hacks break under Multisite and client custom roles.</blockquote>
`,

  'wordpress-media-library-optimization': `
<h2>Media Is Often Your Biggest Payload</h2>
<p>Unoptimised uploads bloat disk, slow pages, and wreck Core Web Vitals. Fix generation, delivery, and cleanup — not just “install a compress plugin.”</p>

<h2>Limit Huge Uploads</h2>
<pre><code>add_filter('big_image_size_threshold', function () {
    return 1920; // scale down larger originals
});</code></pre>

<h2>Prefer Modern Formats</h2>
<ul>
  <li>Serve WebP/AVIF where supported</li>
  <li>Generate only the image sizes your theme uses</li>
  <li>Offload hot media to S3 + CDN when traffic grows</li>
</ul>

<h2>Find Orphaned Attachments</h2>
<pre><code>$orphans = get_posts([
    'post_type'      => 'attachment',
    'post_parent'    => 0,
    'posts_per_page' => 50,
    'fields'         => 'ids',
]);</code></pre>

<blockquote>Every unused thumbnail size is disk and CPU you pay for on every upload.</blockquote>
`,

  'wordpress-rewrite-rules-permalinks': `
<h2>Rewrite Rules Map URLs to Queries</h2>
<p>Pretty permalinks are a rewrite map from path patterns to query vars. Custom endpoints break when rules are stale or registered too late.</p>

<h2>Add a Custom Rewrite Rule</h2>
<pre><code>add_action('init', function () {
    add_rewrite_rule(
        '^docs/([^/]+)/?',
        'index.php?pagename=docs&amp;doc_slug=$matches[1]',
        'top'
    );
    add_rewrite_tag('%doc_slug%', '([^&amp;]+)');
});</code></pre>

<h2>Flush Safely</h2>
<p>Never call <code>flush_rewrite_rules()</code> on every <code>init</code>. Flush on theme/plugin activation only:</p>
<pre><code>register_activation_hook(__FILE__, function () {
    // register rules first, then:
    flush_rewrite_rules();
});</code></pre>

<ul>
  <li>Visit Settings → Permalinks and save to flush during debugging</li>
  <li>Use rewrite inspection tools when 404s appear after deploy</li>
</ul>
<blockquote>Most “permalink bugs” are flush timing bugs, not regex bugs.</blockquote>
`,

  'wordpress-object-cache-redis': `
<h2>Two Caches People Confuse</h2>
<p><strong>Page cache</strong> stores full HTML. <strong>Object cache</strong> stores computed data (options, queries, transients). Persistent object cache (Redis/Memcached) makes the second survive between requests.</p>

<h2>Use the Cache API</h2>
<pre><code>$key = 'home_featured_ids';
$ids = wp_cache_get($key, 'mytheme');
if (false === $ids) {
    $ids = get_posts(['fields' => 'ids', 'posts_per_page' => 6]);
    wp_cache_set($key, $ids, 'mytheme', HOUR_IN_SECONDS);
}</code></pre>

<ul>
  <li>Invalidate cache when content changes</li>
  <li>Never cache user-specific HTML in a shared key</li>
  <li>Monitor Redis memory and eviction policy</li>
</ul>
<blockquote>Redis will not fix a terrible query — it will only help you run it less often.</blockquote>
`,

  'wordpress-responsive-images-srcset': `
<h2>Core Already Generates srcset</h2>
<p>WordPress outputs <code>srcset</code> and <code>sizes</code> for featured images and content images — if your sizes and attributes are correct.</p>

<h2>Register Only Useful Sizes</h2>
<pre><code>add_action('after_setup_theme', function () {
    add_image_size('card', 640, 400, true);
    add_image_size('hero', 1600, 900, true);
});</code></pre>

<h2>Fix sizes Attribute</h2>
<pre><code>add_filter('wp_calculate_image_sizes', function ($sizes, $size) {
    return '(max-width: 768px) 100vw, 640px';
}, 10, 2);</code></pre>

<ul>
  <li>Remove unused intermediate sizes to save disk</li>
  <li>Always set meaningful width/height to reduce CLS</li>
  <li>Lazy-load below-the-fold images</li>
</ul>
<blockquote>Responsive images are a contract between your layout CSS and the sizes attribute.</blockquote>
`,

  'wordpress-nav-walker-custom-menus': `
<h2>Menus Are Data; Walkers Are Presentation</h2>
<p><code>wp_nav_menu()</code> walks a tree of menu items. When markup needs to change for accessibility or design systems, extend <code>Walker_Nav_Menu</code>.</p>

<h2>Register and Render</h2>
<pre><code>register_nav_menus([
    'primary' => 'Primary',
    'footer'  => 'Footer',
]);

wp_nav_menu([
    'theme_location' => 'primary',
    'container'      => 'nav',
    'menu_class'     => 'nav__list',
    'walker'         => new My_Nav_Walker(),
]);</code></pre>

<blockquote>Prefer CSS and sparse walker overrides over rewriting the entire menu system.</blockquote>
`,

  'wordpress-widgets-sidebars-api': `
<h2>Classic Widgets Still Exist on Many Sites</h2>
<p>Block widgets replaced many use cases, but client sites still ship sidebars. Knowing the API keeps you effective on legacy projects.</p>

<pre><code>register_sidebar([
    'name'          => 'Blog Sidebar',
    'id'            => 'blog-sidebar',
    'before_widget' => '&lt;section class="widget %2$s"&gt;',
    'after_widget'  => '&lt;/section&gt;',
    'before_title'  => '&lt;h3 class="widget-title"&gt;',
    'after_title'   => '&lt;/h3&gt;',
]);</code></pre>

<blockquote>If you can migrate a sidebar to blocks, do it — but support legacy until content is moved.</blockquote>
`,

  'wordpress-ajax-admin-ajax-fetch': `
<h2>Three Ways to Talk to WordPress Asynchronously</h2>
<ul>
  <li><code>admin-ajax.php</code> — classic, works everywhere, easy to misuse</li>
  <li>REST API — cleaner URLs, better structure</li>
  <li>Admin routes / custom endpoints — advanced cases</li>
</ul>

<h2>Secure admin-ajax Pattern</h2>
<pre><code>add_action('wp_ajax_save_pref', 'save_pref');
add_action('wp_ajax_nopriv_save_pref', 'save_pref');

function save_pref() {
    check_ajax_referer('pref_nonce', 'nonce');
    $value = sanitize_text_field($_POST['value'] ?? '');
    update_user_meta(get_current_user_id(), 'pref', $value);
    wp_send_json_success(['saved' => true]);
}</code></pre>

<blockquote>If you are building something new, prefer REST — keep admin-ajax for legacy compatibility.</blockquote>
`,

  'wordpress-nonce-csrf-protection': `
<h2>Nonces Are Not Encryption</h2>
<p>A WordPress nonce is a user+action+time limited token that helps prevent CSRF. It is not a capability check and not a secret API key.</p>

<pre><code>// Form field
wp_nonce_field('save_settings', 'settings_nonce');

// Verify
if (!isset($_POST['settings_nonce']) || !wp_verify_nonce($_POST['settings_nonce'], 'save_settings')) {
    wp_die('Invalid request');
}</code></pre>

<ul>
  <li>Still call <code>current_user_can()</code> after nonce verification</li>
  <li>Nonces expire (roughly 12–24 hours depending on tick)</li>
  <li>Use distinct action names per form</li>
</ul>
<blockquote>Nonce + capability + sanitization is the security triad for form handlers.</blockquote>
`,

  'wordpress-page-templates-explained': `
<h2>Page Templates Override Default Page Layout</h2>
<p>Editors pick a template in the Page attributes panel. Use them for landing pages, full-width layouts, or special modules without new post types.</p>

<pre><code>/**
 * Template Name: Full Width Landing
 */
get_header();
// custom layout
get_footer();</code></pre>

<ul>
  <li>Keep template logic thin — move queries to functions</li>
  <li>Name templates clearly for editors</li>
  <li>Do not invent a template when a block pattern would do</li>
</ul>
<blockquote>Templates are for layout variance; custom post types are for content models.</blockquote>
`,

  'wordpress-conditional-tags-guide': `
<h2>Conditionals Answer “Where Am I?”</h2>
<p>Use conditional tags in templates and hooks to branch behaviour without cloning entire files.</p>

<pre><code>if (is_front_page()) {
    // homepage modules
} elseif (is_singular('project')) {
    // single project
} elseif (is_post_type_archive('project')) {
    // archive
}</code></pre>

<ul>
  <li><code>is_home()</code> vs <code>is_front_page()</code> is the classic gotcha</li>
  <li><code>is_admin()</code> means admin screens, not “is administrator user”</li>
  <li>Prefer conditionals over parsing <code>$_SERVER['REQUEST_URI']</code></li>
</ul>
<blockquote>Readable conditionals beat clever URL string matching every time.</blockquote>
`,

  'wordpress-enqueue-scripts-best-practices': `
<h2>Enqueue Is Not Optional</h2>
<p>Hardcoded script tags break dependency order, concatenation plugins, and conditional loading. Always enqueue.</p>

<pre><code>add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'theme-main',
        get_stylesheet_directory_uri() . '/assets/main.css',
        [],
        filemtime(get_stylesheet_directory() . '/assets/main.css')
    );

    if (is_singular('post')) {
        wp_enqueue_script(
            'theme-comments',
            get_template_directory_uri() . '/assets/comments.js',
            [],
            '1.0.0',
            true
        );
    }
});</code></pre>

<ul>
  <li>Use <code>filemtime</code> or build hashes for cache busting</li>
  <li>Load scripts in the footer unless you must block render</li>
  <li>Dequeue plugin assets you do not need on a template</li>
</ul>
`,

  'wordpress-debugging-wp-debug': `
<h2>Safe Local Debugging</h2>
<pre><code>// wp-config.php (never leave display on in production)
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', true);</code></pre>

<h2>Tools That Pay Rent</h2>
<ul>
  <li><strong>Query Monitor</strong> — hooks, queries, HTTP, redirects</li>
  <li><strong>debug.log</strong> — fatal errors and notices</li>
  <li><strong>WP-CLI</strong> — rewrite flush, cache flush, cron list</li>
</ul>

<pre><code>error_log(print_r($data, true));</code></pre>

<blockquote>If you can only install one plugin on a broken site, make it Query Monitor.</blockquote>
`,

  'wordpress-staging-to-production': `
<h2>Deployments Fail on URLs and Secrets</h2>
<p>Copying files is easy. Copying a database with hardcoded absolute URLs is where sites break.</p>

<ul>
  <li>Use WP-CLI search-replace with serialization safety</li>
  <li>Never copy production secrets into public repos</li>
  <li>Keep environment-specific constants out of the database when possible</li>
</ul>

<pre><code>wp search-replace 'https://staging.example.com' 'https://example.com' --all-tables --dry-run
wp search-replace 'https://staging.example.com' 'https://example.com' --all-tables</code></pre>

<blockquote>Dry-run first. Always.</blockquote>
`,

  'wordpress-backup-disaster-recovery': `
<h2>Backups Are Only as Good as Restores</h2>
<p>If you have never restored a backup, you do not have a backup — you have a hope.</p>

<ul>
  <li>Backup files + database on different schedules</li>
  <li>Store offsite (S3, Backblaze, etc.)</li>
  <li>Retain multiple versions (ransomware / bad deploy)</li>
  <li>Test restore quarterly on staging</li>
</ul>

<pre><code>wp db export backup-$(date +%F).sql</code></pre>

<blockquote>Automation without restore drills is theatre.</blockquote>
`,

  'wordpress-seo-technical-checklist': `
<h2>Plugins Help; Developers Decide</h2>
<p>SEO plugins manage metadata. You still own crawlability, performance, structured data edge cases, and clean information architecture.</p>

<ul>
  <li>One H1, logical heading order</li>
  <li>Canonical tags on archives and filtered views</li>
  <li>XML sitemaps that exclude thin/noindex URLs</li>
  <li>Fast LCP: hero media, fonts, critical CSS</li>
  <li>JSON-LD that matches visible content</li>
</ul>

<pre><code>add_filter('wpseo_robots', function ($robots) {
    if (is_paged()) {
        return 'noindex,follow';
    }
    return $robots;
});</code></pre>

<blockquote>SEO is content quality + technical hygiene, not a plugin toggle.</blockquote>
`,

  'wordpress-custom-forms-without-plugins': `
<h2>When a Plugin Is Overkill</h2>
<p>A simple contact form does not need a megabyte of assets. Build a small, secure handler.</p>

<pre><code>add_action('admin_post_nopriv_contact_form', 'handle_contact_form');
add_action('admin_post_contact_form', 'handle_contact_form');

function handle_contact_form() {
    if (!isset($_POST['_wpnonce']) || !wp_verify_nonce($_POST['_wpnonce'], 'contact_form')) {
        wp_die('Invalid nonce');
    }
    $name    = sanitize_text_field($_POST['name'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');
    wp_mail(get_option('admin_email'), 'Contact: ' . $name, $message, ['Reply-To: ' . $email]);
    wp_safe_redirect(home_url('/thank-you/'));
    exit;
}</code></pre>

<ul>
  <li>Add honeypot or reCAPTCHA for spam</li>
  <li>Rate-limit by IP/transient if abuse appears</li>
  <li>Never trust raw <code>$_POST</code></li>
</ul>
`,

  'wordpress-taxonomy-archives-custom': `
<h2>Taxonomies Are Navigation, Not Just Labels</h2>
<p>A good term archive is a landing page: intro copy, FAQs, related terms, and a tuned query.</p>

<pre><code>register_taxonomy('skill', 'project', [
    'label'        => 'Skills',
    'public'       => true,
    'rewrite'      => ['slug' => 'skill'],
    'show_in_rest' => true,
]);</code></pre>

<pre><code>add_action('created_skill', function ($term_id) {
    update_term_meta($term_id, 'intro', sanitize_text_field($_POST['intro'] ?? ''));
});</code></pre>

<blockquote>Empty taxonomy archives are SEO dead ends — add curated content.</blockquote>
`,

  'wordpress-login-customization': `
<h2>Small Touches, Big Client Trust</h2>
<pre><code>add_action('login_enqueue_scripts', function () {
    wp_enqueue_style('custom-login', get_template_directory_uri() . '/login.css');
});

add_filter('login_headerurl', fn() => home_url('/'));
add_filter('login_headertext', fn() => get_bloginfo('name'));</code></pre>

<pre><code>add_filter('login_redirect', function ($redirect, $request, $user) {
    if (isset($user->roles) && in_array('subscriber', $user->roles, true)) {
        return home_url('/account/');
    }
    return $redirect;
}, 10, 3);</code></pre>

<ul>
  <li>Limit login attempts</li>
  <li>Force strong passwords for admins</li>
  <li>Consider 2FA on high-value sites</li>
</ul>
`,

  'wordpress-admin-ui-customization': `
<h2>The Admin Is a Product UI</h2>
<p>Clients judge WordPress by wp-admin. Reduce noise, highlight what matters, and name things in their language.</p>

<pre><code>add_action('admin_menu', function () {
    remove_menu_page('edit-comments.php'); // if unused
}, 999);

add_filter('manage_post_posts_columns', function ($cols) {
    $cols['word_count'] = 'Words';
    return $cols;
});</code></pre>

<ul>
  <li>Use role checks before removing menus</li>
  <li>Add help tabs on complex CPT screens</li>
  <li>White-label carefully — do not break updates UX</li>
</ul>
`,

  'wordpress-rest-api-authentication': `
<h2>Pick Auth for the Client Type</h2>
<ul>
  <li><strong>Cookie + nonce</strong> — same-origin themes/plugins</li>
  <li><strong>Application Passwords</strong> — scripts and integrations (HTTPS)</li>
  <li><strong>OAuth/JWT plugins</strong> — third-party / mobile apps</li>
</ul>

<pre><code>register_rest_route('myplugin/v1', '/profile', [
    'methods'  => 'GET',
    'callback' => 'myplugin_profile',
    'permission_callback' => function () {
        return is_user_logged_in();
    },
]);</code></pre>

<blockquote>Never leave write routes with <code>__return_true</code> permission callbacks.</blockquote>
`,

  'wordpress-block-styles-variations': `
<h2>Not Everything Needs a New Block</h2>
<p>Style variations and block variations reuse core blocks with opinionated defaults — faster for editors, less JS for you.</p>

<pre><code>register_block_style('core/quote', [
    'name'  => 'accent-border',
    'label' => 'Accent Border',
]);

register_block_variation('core/group', [
    'name'       => 'narrow-content',
    'title'      => 'Narrow Content',
    'attributes' => [
        'layout' => ['type' => 'constrained', 'contentSize' => '720px'],
    ],
]);</code></pre>

<blockquote>Ship a design system of variations before inventing custom blocks.</blockquote>
`,

  'wordpress-filesystem-api': `
<h2>Direct File Writes Are Not Always Allowed</h2>
<p>Some hosts require FTP credentials for writes. The Filesystem API abstracts that.</p>

<pre><code>require_once ABSPATH . 'wp-admin/includes/file.php';
global $wp_filesystem;
WP_Filesystem();

$path = WP_CONTENT_DIR . '/uploads/export.json';
$wp_filesystem->put_contents($path, wp_json_encode($data), FS_CHMOD_FILE);</code></pre>

<ul>
  <li>Prefer WP APIs (media, options) over raw files when possible</li>
  <li>Never store secrets in web-accessible uploads</li>
</ul>
`,

  'wordpress-gdpr-privacy-compliance': `
<h2>Core Gives You Hooks — You Still Design Policy</h2>
<p>WordPress includes personal data export/erasure tools. Plugins must hook into them if they store user data outside posts/comments.</p>

<pre><code>add_filter('wp_privacy_personal_data_exporters', function ($exporters) {
    $exporters['myplugin'] = [
        'exporter_friendly_name' => 'My Plugin',
        'callback'               => 'myplugin_export_user_data',
    ];
    return $exporters;
});</code></pre>

<ul>
  <li>Document cookies and third-party scripts</li>
  <li>Minimize data collection by default</li>
  <li>Support export and erase for any custom user data you store</li>
</ul>
`,

  'wordpress-comments-moderation-api': `
<h2>Comments Are Still a Content Type</h2>
<pre><code>$comment_id = wp_insert_comment([
    'comment_post_ID'  => $post_id,
    'comment_content'  => sanitize_textarea_field($text),
    'user_id'          => get_current_user_id(),
    'comment_approved' => 0,
]);

wp_set_comment_status($comment_id, 'approve');
update_comment_meta($comment_id, 'rating', 5);</code></pre>

<ul>
  <li>Disable comments on site types that do not need them</li>
  <li>Use spam protection and moderation queues</li>
  <li>Prefer REST comment routes for headless front-ends</li>
</ul>
`,

  'wordpress-database-custom-tables': `
<h2>Post Meta Does Not Scale Forever</h2>
<p>For high-volume, relational, or heavily queried data, custom tables beat postmeta every time.</p>

<pre><code>global $wpdb;
$table   = $wpdb->prefix . 'form_submissions';
$charset = $wpdb->get_charset_collate();

$sql = "CREATE TABLE $table (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(190) NOT NULL,
  payload LONGTEXT NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY email (email)
) $charset;";

require_once ABSPATH . 'wp-admin/includes/upgrade.php';
dbDelta($sql);</code></pre>

<blockquote>Use <code>$wpdb-&gt;prepare()</code> for every dynamic query. No exceptions.</blockquote>
`,

  'wordpress-headless-architecture': `
<h2>Headless Is a Trade-Off, Not a Trophy</h2>
<p>You gain front-end freedom and lose free wins: previews, plugins that assume PHP themes, and simple form handling.</p>

<ul>
  <li>Use Application Passwords or OAuth for writes</li>
  <li>Cache GET responses at the edge</li>
  <li>Solve draft preview early — it is the usual project killer</li>
  <li>Keep editorial UX inside wp-admin excellent</li>
</ul>

<blockquote>If the team only needs a marketing site, a well-built PHP theme often ships faster and costs less.</blockquote>
`,

  'wordpress-cli-automation-scripts': `
<h2>WP-CLI Is Your Ops Multipurpose Tool</h2>
<pre><code>wp user create jane jane@example.com --role=editor
wp post list --post_type=page --fields=ID,post_title
wp plugin update --all
wp cache flush</code></pre>

<pre><code>#!/usr/bin/env bash
set -euo pipefail
wp db export "backup-$(date +%F).sql"
wp rewrite flush
wp transient delete --all</code></pre>

<ul>
  <li>Run under the correct system user to avoid permission messes</li>
  <li>Combine with cron for nightly maintenance</li>
</ul>
`,

  'wordpress-multisite-domain-mapping': `
<h2>Domain Mapping Today</h2>
<p>Modern WordPress supports mapping custom domains more cleanly than the old plugin-era days — but DNS and SSL still dominate the work.</p>

<ul>
  <li>Point domains to the same server / load balancer</li>
  <li>Issue certificates per domain (or wildcard where appropriate)</li>
  <li>Watch cookie domain settings carefully</li>
  <li>Test login on mapped domains, not just the main site</li>
</ul>

<pre><code>is_multisite();
get_site_url($blog_id);
switch_to_blog($blog_id);
// ... work ...
restore_current_blog();</code></pre>
`,

  'woocommerce-custom-product-types': `
<h2>Product Types Are Classes</h2>
<pre><code>add_filter('product_type_selector', function ($types) {
    $types['booking'] = 'Booking';
    return $types;
});

class WC_Product_Booking extends WC_Product {
    public function get_type() {
        return 'booking';
    }
}

add_filter('woocommerce_product_class', function ($classname, $product_type) {
    if ($product_type === 'booking') {
        return 'WC_Product_Booking';
    }
    return $classname;
}, 10, 2);</code></pre>

<blockquote>Mirror WooCommerce core patterns — do not invent a parallel cart system.</blockquote>
`,

  'woocommerce-order-status-hooks': `
<h2>Orders Are State Machines</h2>
<pre><code>add_action('woocommerce_order_status_changed', function ($order_id, $from, $to, $order) {
    if ($to === 'completed') {
        // provision license, notify ERP, etc.
    }
}, 10, 4);

add_action('woocommerce_order_status_processing', function ($order_id) {
    $order = wc_get_order($order_id);
    // fulfilment kickoff
});</code></pre>

<ul>
  <li>Use custom statuses sparingly</li>
  <li>Make handlers idempotent — hooks can fire more than you expect</li>
  <li>Prefer order notes for audit trails</li>
</ul>
`,

  'woocommerce-payment-gateway-basics': `
<h2>Extend WC_Payment_Gateway</h2>
<pre><code>class WC_Gateway_Simple extends WC_Payment_Gateway {
    public function __construct() {
        $this->id           = 'simple_gateway';
        $this->method_title = 'Simple Gateway';
        $this->has_fields   = false;
        $this->init_form_fields();
        $this->init_settings();
    }

    public function process_payment($order_id) {
        $order = wc_get_order($order_id);
        $order->payment_complete();
        return [
            'result'   => 'success',
            'redirect' => $this->get_return_url($order),
        ];
    }
}</code></pre>

<blockquote>Handle webhooks with signature verification — never trust raw POST bodies.</blockquote>
`,

  'woocommerce-shipping-methods-custom': `
<h2>Shipping Methods Calculate Rates</h2>
<pre><code>class WC_Shipping_Weight_Tier extends WC_Shipping_Method {
    public function calculate_shipping($package = []) {
        $weight = WC()->cart->get_cart_contents_weight();
        $cost   = $weight > 5 ? 15 : 8;
        $this->add_rate([
            'id'    => $this->id,
            'label' => 'Weight Tier',
            'cost'  => $cost,
        ]);
    }
}</code></pre>

<ul>
  <li>Respect shipping zones</li>
  <li>Document units (kg/lb) for store managers</li>
  <li>Test free shipping interactions</li>
</ul>
`,

  'woocommerce-cart-checkout-performance': `
<h2>Checkout Is a Conversion Surface</h2>
<ul>
  <li>Remove cart fragments on pages that do not need live cart counts</li>
  <li>Defer non-essential scripts on checkout</li>
  <li>Avoid remote API calls on every cart calculation</li>
  <li>Never cache personalised cart HTML publicly</li>
</ul>

<pre><code>add_action('wp_enqueue_scripts', function () {
    if (!is_cart() && !is_checkout()) {
        wp_dequeue_script('wc-cart-fragments');
    }
}, 20);</code></pre>
`,

  'php-8-features-for-wordpress': `
<h2>Modern PHP Fits WordPress Cleanly</h2>
<pre><code>// Nullsafe
$host = $request?->headers?->get('host');

// Match
$label = match ($status) {
    'publish' => 'Live',
    'draft'   => 'Draft',
    default   => 'Other',
};

// Named args (where supported by the function signature)
update_post_meta(
    post_id: $id,
    meta_key: '_views',
    meta_value: $views
);</code></pre>

<ul>
  <li>Set <code>Requires PHP</code> in plugin headers</li>
  <li>Avoid features your minimum host PHP cannot run</li>
  <li>Typed properties reduce whole classes of bugs</li>
</ul>
`,

  'php-composer-in-wordpress-projects': `
<h2>Composer Brings Order to Plugin Codebases</h2>
<pre><code>{
  "name": "vikral/my-plugin",
  "autoload": {
    "psr-4": { "Vikral\\\\MyPlugin\\\\": "src/" }
  },
  "require": {
    "php": ">=8.1"
  }
}</code></pre>

<pre><code>require __DIR__ . '/vendor/autoload.php';</code></pre>

<ul>
  <li>Do not commit entire vendor unless deploy constraints force it</li>
  <li>Scope namespaces to avoid collisions</li>
  <li>Prefer small libraries over copy-pasted utilities</li>
</ul>
`,

  'php-error-handling-exceptions': `
<h2>WP_Error vs Exceptions</h2>
<p>WordPress core often returns <code>WP_Error</code>. Application layers you control can use exceptions — but convert at the boundary so hooks and AJAX handlers stay predictable.</p>

<pre><code>function fetch_remote_json($url) {
    $res = wp_remote_get($url);
    if (is_wp_error($res)) {
        return $res;
    }
    $code = wp_remote_retrieve_response_code($res);
    if ($code !== 200) {
        return new WP_Error('bad_status', 'Unexpected status ' . $code);
    }
    return json_decode(wp_remote_retrieve_body($res), true);
}</code></pre>

<blockquote>Log context-rich errors; show users short, safe messages.</blockquote>
`,

  'laravel-queues-background-jobs': `
<h2>Move Slow Work Off the Request</h2>
<pre><code>php artisan make:job SendInvoiceEmail

// dispatch
SendInvoiceEmail::dispatch($invoice);

// job handle()
public function handle(): void
{
    Mail::to($this->invoice->email)->send(new InvoiceMail($this->invoice));
}</code></pre>

<ul>
  <li>Configure retries and backoff</li>
  <li>Monitor <code>failed_jobs</code></li>
  <li>Keep payloads small — pass IDs, not huge models</li>
</ul>
`,

  'laravel-eloquent-performance-tips': `
<h2>Kill N+1 Early</h2>
<pre><code>// Bad
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name;
}

// Good
$posts = Post::with('author')->get();</code></pre>

<pre><code>Post::query()
    ->select(['id', 'title', 'author_id'])
    ->chunkById(200, function ($posts) {
        // process
    });</code></pre>

<blockquote>Enable query logging in local and fix the chatty endpoints first.</blockquote>
`,

  'javascript-modules-wordpress-blocks': `
<h2>Blocks Are Modern JS Apps</h2>
<pre><code>import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';

registerBlockType('myplugin/callout', {
  edit({ attributes, setAttributes }) {
    const props = useBlockProps();
    return (
      &lt;div {...props}&gt;
        &lt;RichText
          tagName="p"
          value={attributes.text}
          onChange={(text) => setAttributes({ text })}
        /&gt;
      &lt;/div&gt;
    );
  },
  save({ attributes }) {
    const props = useBlockProps.save();
    return (
      &lt;div {...props}&gt;
        &lt;RichText.Content tagName="p" value={attributes.text} /&gt;
      &lt;/div&gt;
    );
  },
});</code></pre>

<blockquote>Let <code>@wordpress/scripts</code> own the bundler config until you outgrow it.</blockquote>
`,

  'javascript-dom-performance': `
<h2>Layout Thrashing Is Silent</h2>
<pre><code>// Bad: read/write interleaved
items.forEach((el) => {
  const h = el.offsetHeight; // read
  el.style.height = h + 10 + 'px'; // write
});

// Better: batch reads then writes
const heights = items.map((el) => el.offsetHeight);
items.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});</code></pre>

<ul>
  <li>Use event delegation on large lists</li>
  <li>Prefer <code>requestAnimationFrame</code> for visual updates</li>
  <li>Debounce scroll/resize handlers</li>
</ul>
`,

  'css-container-queries-layouts': `
<h2>Components That Respond to Their Parent</h2>
<pre><code>.card-grid {
  container-type: inline-size;
}

@container (min-width: 480px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}</code></pre>

<blockquote>Container queries make design systems reusable across sidebars and main columns.</blockquote>
`,

  'css-custom-properties-design-tokens': `
<h2>Tokens Beat Magic Numbers</h2>
<pre><code>:root {
  --color-accent: #e84b2b;
  --color-ink: #0d0d0d;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --font-sans: 'Syne', system-ui, sans-serif;
}

.button {
  background: var(--color-accent);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-sans);
}</code></pre>

<ul>
  <li>Align tokens with <code>theme.json</code> presets when using block themes</li>
  <li>Document semantic names (<code>--color-danger</code>) not raw palettes only</li>
</ul>
`,

  'mysql-indexing-for-wordpress': `
<h2>Indexes Are Decision Trees for MySQL</h2>
<pre><code>EXPLAIN SELECT * FROM wp_postmeta
WHERE meta_key = '_sku' AND meta_value = 'ABC';</code></pre>

<ul>
  <li>Index columns used in WHERE/JOIN</li>
  <li>Avoid leading-wildcard LIKE if you need index use</li>
  <li>Custom tables need intentional keys — postmeta is a compromise</li>
  <li>Measure before adding five indexes “just in case”</li>
</ul>

<blockquote>The fastest query is the one you never run — cache and denormalise thoughtfully.</blockquote>
`,

  'angular-rxjs-operators-essentials': `
<h2>Operators Shape Async Data</h2>
<pre><code>this.route.paramMap.pipe(
  map(params => params.get('id')),
  distinctUntilChanged(),
  switchMap(id => this.api.getPost(id)),
  catchError(() => of(null))
).subscribe(post => this.post = post);</code></pre>

<ul>
  <li><code>switchMap</code> for latest-only requests (search typeahead)</li>
  <li><code>exhaustMap</code> to ignore spam clicks</li>
  <li>Unsubscribe via <code>takeUntilDestroyed()</code> or async pipe</li>
</ul>
`,

  'devops-github-actions-wordpress': `
<h2>A Minimal Theme CI Pipeline</h2>
<pre><code>name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run build</code></pre>

<ul>
  <li>Store deploy keys in GitHub Secrets</li>
  <li>Run PHPCS for PHP plugins</li>
  <li>Deploy artifacts, not your entire laptop folder</li>
</ul>
`,

  'best-practices-code-reviews-web': `
<h2>Review the Risk, Not the Author</h2>
<ul>
  <li>Does this change match the ticket?</li>
  <li>Security: authz, sanitization, escaping, secrets</li>
  <li>Performance: queries, bundles, images</li>
  <li>Maintainability: naming, tests, dead code</li>
</ul>

<blockquote>Small PRs get better reviews. Huge PRs get rubber stamps and production incidents.</blockquote>
`,

  'career-freelance-wordpress-pricing': `
<h2>Price Outcomes, Not Hours Alone</h2>
<ul>
  <li>Define scope in writing: pages, integrations, revisions</li>
  <li>Charge for discovery — free estimates train clients to waste time</li>
  <li>Retainers beat endless one-off fire drills</li>
  <li>Rush fees are not rude; they protect quality</li>
</ul>

<blockquote>Your rate includes years of debugging ghosts in <code>functions.php</code> at midnight.</blockquote>
`,

  'best-practices-api-design-rest': `
<h2>APIs Are UI for Developers</h2>
<ul>
  <li>Noun-based resources: <code>/orders/123</code></li>
  <li>Consistent error shape: code, message, details</li>
  <li>Cursor or page pagination for lists</li>
  <li>Version before you break clients</li>
  <li>Idempotency keys for payments and dangerous POSTs</li>
</ul>

<pre><code>{
  "code": "validation_failed",
  "message": "Email is invalid",
  "details": { "field": "email" }
}</code></pre>
`,
}

function escapeForTemplateLiteral(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
}

function toBlogObject(post) {
  const content = (bodies[post.id] || `
<h2>Overview</h2>
<p>${post.excerpt}</p>
<blockquote>Write code for the next developer — including future you.</blockquote>
`).trim()

  return `  {
    id: ${JSON.stringify(post.id)},
    title: ${JSON.stringify(post.title)},
    date: ${JSON.stringify(post.date)},
    category: ${JSON.stringify(post.category)},
    readTime: ${JSON.stringify(post.readTime)},
    excerpt: ${JSON.stringify(post.excerpt)},
    cover: "",
    content: \`
${escapeForTemplateLiteral(content)}
    \`
  }`
}

// Validate all bodies exist
const missing = posts.filter((p) => !bodies[p.id])
if (missing.length) {
  console.error('Missing bodies for:', missing.map((p) => p.id).join(', '))
  process.exit(1)
}

if (posts.length !== 50) {
  console.error(`Expected 50 posts, got ${posts.length}`)
  process.exit(1)
}

const fragment = posts.map(toBlogObject).join(',\n')

let source = readFileSync(blogsPath, 'utf8')

// Insert before the closing of the blogs array: `\n];`
const marker = '\n];\n\n// ─────────────────────────────────────────────────────────────────────────────\n//  HOW TO ADD A NEW BLOG POST'
const idx = source.indexOf(marker)
if (idx === -1) {
  console.error('Could not find insertion marker in blogs.js')
  process.exit(1)
}

// Ensure previous object ends with comma
const before = source.slice(0, idx).replace(/\}\s*$/, '},\n')
const after = source.slice(idx)

// If we already ran, avoid duplicate ids
const firstId = posts[0].id
if (source.includes(`id: "${firstId}"`)) {
  console.error(`Posts already present (found id "${firstId}"). Aborting.`)
  process.exit(1)
}

const next = before + fragment + after
writeFileSync(blogsPath, next, 'utf8')

console.log(`Appended ${posts.length} blog posts to src/data/blogs.js`)
console.log('Categories:', [...new Set(posts.map((p) => p.category))].join(', '))
