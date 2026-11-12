// Blog entries in original order. Add new entries to the final part.
export const blogEntries = [
{
    id: "wordpress-enqueue-scripts-best-practices",
    title: "wp_enqueue Best Practices: Scripts, Styles, and Dependency Hell",
    date: "December 14, 2025",
    category: "WordPress",
    readTime: "7 min read",
    excerpt: "Load assets only where needed, manage versions for cache busting, and stop hardcoding script tags forever.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-debugging-wp-debug",
    title: "Debugging WordPress Like a Pro: WP_DEBUG, Query Monitor, and Logs",
    date: "December 17, 2025",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Turn on safe debugging, hunt white screens, and use Query Monitor to find slow queries and hook spam.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-staging-to-production",
    title: "WordPress Staging to Production: A Safe Deployment Checklist",
    date: "December 20, 2025",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Search-replace URLs, migrate databases cleanly, and avoid the classic “works on staging only” disasters.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-backup-disaster-recovery",
    title: "WordPress Backup and Disaster Recovery That Actually Works",
    date: "December 23, 2025",
    category: "WordPress",
    readTime: "7 min read",
    excerpt: "What to back up, how often, offsite storage, and how to test restores before you need them at 2 a.m.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-seo-technical-checklist",
    title: "Technical SEO for WordPress Developers: Beyond Plugin Defaults",
    date: "December 27, 2025",
    category: "WordPress",
    readTime: "9 min read",
    excerpt: "Schema, sitemaps, crawl budget, canonical tags, and performance signals that plugins alone will not fix.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-custom-forms-without-plugins",
    title: "Building Contact Forms in WordPress Without Heavy Plugins",
    date: "December 30, 2025",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Secure custom forms with nonces, sanitization, spam protection, and reliable email delivery.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-taxonomy-archives-custom",
    title: "Custom Taxonomy Archives and Term Meta in WordPress",
    date: "January 3, 2026",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Design useful taxonomy landing pages, store term meta, and query posts by related terms efficiently.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-login-customization",
    title: "Customising the WordPress Login Screen and Authentication Flow",
    date: "January 6, 2026",
    category: "WordPress",
    readTime: "6 min read",
    excerpt: "Brand wp-login.php, redirect after login, and harden authentication without locking yourself out.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-admin-ui-customization",
    title: "Customising the WordPress Admin for Client-Friendly CMS Experiences",
    date: "January 9, 2026",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Clean dashboards, custom columns, help tabs, and role-aware menus that make editors love the CMS.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-rest-api-authentication",
    title: "WordPress REST API Authentication: Cookies, Application Passwords, and JWT",
    date: "January 12, 2026",
    category: "WordPress",
    readTime: "9 min read",
    excerpt: "Choose the right auth method for headless apps, mobile clients, and internal tooling securely.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-block-styles-variations",
    title: "Block Styles and Variations: Extend Gutenberg Without Building New Blocks",
    date: "January 15, 2026",
    category: "WordPress",
    readTime: "7 min read",
    excerpt: "Register style variations, block variations, and editor UI polish that keep content teams productive.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-filesystem-api",
    title: "The WordPress Filesystem API: Safe File Operations on Any Host",
    date: "January 18, 2026",
    category: "WordPress",
    readTime: "7 min read",
    excerpt: "Write and read files the WordPress way — direct, FTP, or SSH — without permission nightmares.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-gdpr-privacy-compliance",
    title: "WordPress Privacy and GDPR Essentials for Developers",
    date: "January 21, 2026",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Export/erase personal data, cookie consent patterns, and privacy-by-design hooks in core WordPress.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-comments-moderation-api",
    title: "Working with the WordPress Comment System Programmatically",
    date: "January 24, 2026",
    category: "WordPress",
    readTime: "6 min read",
    excerpt: "Moderate comments via code, add meta, disable spam vectors, and rebuild comment UIs when needed.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-database-custom-tables",
    title: "When to Use Custom Database Tables in WordPress Plugins",
    date: "January 27, 2026",
    category: "WordPress",
    readTime: "9 min read",
    excerpt: "Post meta vs custom tables, dbDelta migrations, and schema design for high-volume plugin data.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-headless-architecture",
    title: "Headless WordPress Architecture: When It Helps and When It Hurts",
    date: "January 30, 2026",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "REST vs GraphQL, preview workflows, caching layers, and realistic trade-offs for headless CMS builds.",
    cover: "",
    content: `
<h2>Headless Is a Trade-Off, Not a Trophy</h2>
<p>You gain front-end freedom and lose free wins: previews, plugins that assume PHP themes, and simple form handling.</p>

<ul>
  <li>Use Application Passwords or OAuth for writes</li>
  <li>Cache GET responses at the edge</li>
  <li>Solve draft preview early — it is the usual project killer</li>
  <li>Keep editorial UX inside wp-admin excellent</li>
</ul>

<blockquote>If the team only needs a marketing site, a well-built PHP theme often ships faster and costs less.</blockquote>
    `
  },
{
    id: "wordpress-cli-automation-scripts",
    title: "Automating WordPress with WP-CLI Scripts and Bash",
    date: "February 2, 2026",
    category: "WordPress",
    readTime: "7 min read",
    excerpt: "Bulk user imports, search-replace, plugin scaffolding, and nightly maintenance scripts with WP-CLI.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-multisite-domain-mapping",
    title: "WordPress Multisite Domain Mapping Without the Pain",
    date: "February 5, 2026",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Map custom domains, SSL considerations, and cookie/domain gotchas on modern Multisite networks.",
    cover: "",
    content: `
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
    `
  },
{
    id: "woocommerce-custom-product-types",
    title: "Creating Custom WooCommerce Product Types",
    date: "February 8, 2026",
    category: "WooCommerce",
    readTime: "9 min read",
    excerpt: "Register a new product type, add admin fields, and control cart and checkout behaviour cleanly.",
    cover: "",
    content: `
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
    `
  },
{
    id: "woocommerce-order-status-hooks",
    title: "WooCommerce Order Statuses and Lifecycle Hooks",
    date: "February 11, 2026",
    category: "WooCommerce",
    readTime: "8 min read",
    excerpt: "Hook into order status changes, send custom emails, and build fulfilment workflows that scale.",
    cover: "",
    content: `
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
    `
  },
{
    id: "woocommerce-payment-gateway-basics",
    title: "Building a Simple WooCommerce Payment Gateway",
    date: "February 14, 2026",
    category: "WooCommerce",
    readTime: "10 min read",
    excerpt: "Extend WC_Payment_Gateway, handle callbacks, and process payments without reinventing checkout.",
    cover: "",
    content: `
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
    `
  },
{
    id: "woocommerce-shipping-methods-custom",
    title: "Custom WooCommerce Shipping Methods Explained",
    date: "February 17, 2026",
    category: "WooCommerce",
    readTime: "8 min read",
    excerpt: "Calculate rates dynamically by weight, zone, and cart contents with a maintainable shipping class.",
    cover: "",
    content: `
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
    `
  },
{
    id: "woocommerce-cart-checkout-performance",
    title: "Speeding Up WooCommerce Cart and Checkout",
    date: "February 20, 2026",
    category: "WooCommerce",
    readTime: "7 min read",
    excerpt: "Reduce AJAX chatter, defer non-critical scripts, and keep conversion-critical pages fast under load.",
    cover: "",
    content: `
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
    `
  },
{
    id: "php-8-features-for-wordpress",
    title: "PHP 8 Features Every WordPress Developer Should Use",
    date: "February 23, 2026",
    category: "PHP",
    readTime: "8 min read",
    excerpt: "Named arguments, match expressions, nullsafe operator, and typed properties in real WP code.",
    cover: "",
    content: `
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
    `
  },
{
    id: "php-composer-in-wordpress-projects",
    title: "Using Composer in WordPress Themes and Plugins",
    date: "February 26, 2026",
    category: "PHP",
    readTime: "7 min read",
    excerpt: "Autoload classes, manage third-party packages, and ship production builds without vendor bloat chaos.",
    cover: "",
    content: `
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
    `
  },
{
    id: "php-error-handling-exceptions",
    title: "PHP Error Handling and Exceptions in Application Code",
    date: "March 1, 2026",
    category: "PHP",
    readTime: "7 min read",
    excerpt: "When to throw, when to return WP_Error, and how to log failures without leaking details to users.",
    cover: "",
    content: `
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
    `
  },
{
    id: "laravel-queues-background-jobs",
    title: "Laravel Queues and Background Jobs for Real-World Workloads",
    date: "March 4, 2026",
    category: "Laravel",
    readTime: "8 min read",
    excerpt: "Dispatch jobs, choose queue drivers, handle failures, and keep HTTP requests fast under heavy work.",
    cover: "",
    content: `
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
    `
  },
{
    id: "laravel-eloquent-performance-tips",
    title: "Eloquent Performance Tips: N+1 Queries and Beyond",
    date: "March 7, 2026",
    category: "Laravel",
    readTime: "8 min read",
    excerpt: "Eager loading, select columns wisely, chunk large datasets, and profile queries before they hurt production.",
    cover: "",
    content: `
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
    `
  },
{
    id: "javascript-modules-wordpress-blocks",
    title: "ES Modules and Modern JavaScript in WordPress Block Development",
    date: "March 10, 2026",
    category: "JavaScript",
    readTime: "7 min read",
    excerpt: "Use @wordpress/scripts, modular block code, and maintainable JS as your block library grows.",
    cover: "",
    content: `
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
    `
  },
{
    id: "javascript-dom-performance",
    title: "DOM Performance in JavaScript: Practical Wins for Real Sites",
    date: "March 13, 2026",
    category: "JavaScript",
    readTime: "7 min read",
    excerpt: "Batch reads/writes, use event delegation, and avoid layout thrashing on interactive marketing pages.",
    cover: "",
    content: `
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
    `
  },
{
    id: "css-container-queries-layouts",
    title: "CSS Container Queries for Truly Component-Driven Layouts",
    date: "March 16, 2026",
    category: "CSS",
    readTime: "6 min read",
    excerpt: "Stop relying only on viewport media queries — style components based on their own container width.",
    cover: "",
    content: `
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
    `
  },
{
    id: "css-custom-properties-design-tokens",
    title: "Design Tokens with CSS Custom Properties in Production Themes",
    date: "March 19, 2026",
    category: "CSS",
    readTime: "7 min read",
    excerpt: "Build a token system for colour, type, and spacing that works with WordPress theme.json and SCSS.",
    cover: "",
    content: `
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
    `
  },
{
    id: "mysql-indexing-for-wordpress",
    title: "MySQL Indexing Strategies Every WordPress Developer Needs",
    date: "March 22, 2026",
    category: "MySQL",
    readTime: "8 min read",
    excerpt: "Understand EXPLAIN, composite indexes, and why meta_query can destroy performance without planning.",
    cover: "",
    content: `
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
    `
  },
{
    id: "angular-rxjs-operators-essentials",
    title: "RxJS Operators Every Angular Developer Should Know",
    date: "March 25, 2026",
    category: "Angular",
    readTime: "8 min read",
    excerpt: "switchMap, combineLatest, debounceTime, and patterns that keep streams readable and leak-free.",
    cover: "",
    content: `
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
    `
  },
{
    id: "devops-github-actions-wordpress",
    title: "CI/CD for WordPress with GitHub Actions",
    date: "March 28, 2026",
    category: "DevOps",
    readTime: "9 min read",
    excerpt: "Lint, test, build, and deploy themes/plugins automatically — with secrets handled correctly.",
    cover: "",
    content: `
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
    `
  },
{
    id: "best-practices-code-reviews-web",
    title: "Code Review Best Practices for Web Development Teams",
    date: "April 1, 2026",
    category: "Best Practices",
    readTime: "6 min read",
    excerpt: "Review for intent, security, and maintainability — not just style nits — and keep PRs shippable.",
    cover: "",
    content: `
<h2>Review the Risk, Not the Author</h2>
<ul>
  <li>Does this change match the ticket?</li>
  <li>Security: authz, sanitization, escaping, secrets</li>
  <li>Performance: queries, bundles, images</li>
  <li>Maintainability: naming, tests, dead code</li>
</ul>

<blockquote>Small PRs get better reviews. Huge PRs get rubber stamps and production incidents.</blockquote>
    `
  },
{
    id: "career-freelance-wordpress-pricing",
    title: "Pricing WordPress Freelance Work Without Undervaluing Yourself",
    date: "April 4, 2026",
    category: "Career",
    readTime: "7 min read",
    excerpt: "Scopes, retainers, fixed-price traps, and how to communicate value to non-technical clients.",
    cover: "",
    content: `
<h2>Price Outcomes, Not Hours Alone</h2>
<ul>
  <li>Define scope in writing: pages, integrations, revisions</li>
  <li>Charge for discovery — free estimates train clients to waste time</li>
  <li>Retainers beat endless one-off fire drills</li>
  <li>Rush fees are not rude; they protect quality</li>
</ul>

<blockquote>Your rate includes years of debugging ghosts in <code>functions.php</code> at midnight.</blockquote>
    `
  },
{
    id: "best-practices-api-design-rest",
    title: "REST API Design Best Practices for Frontend-Friendly Backends",
    date: "April 7, 2026",
    category: "Best Practices",
    readTime: "8 min read",
    excerpt: "Consistent resources, pagination, error shapes, versioning, and auth patterns that scale with clients.",
    cover: "",
    content: `
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
    `
  },
{
    id: "claude-fable-5-1-vs-gpt-6-astra-coding-agents",
    title: "Claude Fable 5.1 vs GPT-6 Astra: Choosing an AI Coding Agent for Serious Work",
    date: "September 25, 2026",
    category: "AI",
    readTime: "14 min read",
    excerpt: "A practical comparison of Claude Fable 5.1 in Claude Code and GPT-6 Astra: long-running coding, tools, cost, safeguards, and how to evaluate both on your own repository.",
    cover: "",
    content: "<h2>A Workflow Comparison, Not a Benchmark Trophy</h2>\n\n<p>Claude Fable 5.1 and GPT-6 Astra are both built for difficult, multi-step work. That does not make them interchangeable. The useful question is not which model wins a single prompt, but which system helps your team produce a correct, reviewable change in a real repository with your tests, tools, policies, and time constraints.</p>\n\n<p>Anthropic positions Fable 5.1 for long-running agentic coding and knowledge work, while OpenAI positions GPT-6 Astra for complex reasoning, coding, computer use, research, and document creation. Both are broad claims. For engineering teams, the practical measure remains boring and important: can the agent understand an unfamiliar codebase, make a scoped change, verify it, and clearly state what remains uncertain?</p>\n\n<h2>Where Claude Fable 5.1 Fits</h2>\n\n<p>Fable 5.1 is designed around sustained agentic work. Anthropic describes a model that can carry out long, multi-step coding and research tasks, verify its work, and pursue root causes instead of superficial symptoms. In Claude Code, that orientation is most useful when the objective is durable: trace a production issue, map dependencies across services, implement a feature with tests, or improve a system over several iterations.</p>\n\n<p>The advantage is not simply that an agent can run for longer. It is that it can build and maintain a working model of the problem while it does. The risk is equally clear: long-running agents need strong boundaries. Define the directories and commands they may use, prohibit access to secrets, set a budget, and require a checkpoint before any destructive or external action.</p>\n\n<h2>Where GPT-6 Astra Fits</h2>\n\n<p>GPT-6 Astra combines configurable reasoning with a broad tool surface in the Responses API. Official documentation lists web search, file search, code interpreter, hosted shell, computer use, MCP, skills, and apply-patch support. That makes Astra especially useful when code work is inseparable from research, documentation, browser-based verification, or work spread across several systems.</p>\n\n<p>Its reasoning effort can be set from low through max. Treat that as a budget control, not a quality switch. Routine test changes and narrow UI fixes need a constrained, fast workflow. Ambiguous incidents, migrations, and documentation-backed integrations are better candidates for higher effort because the model has more uncertainty to resolve.</p>\n\n<h2>What Actually Matters in a Repository</h2>\n\n<ul><li><strong>Context discipline:</strong> Astra documents a 1.05 million-token context window and 128,000 maximum output tokens. Large context is helpful, but selective retrieval and a clean problem statement matter more than loading every file.</li><li><strong>Tool boundaries:</strong> Astra offers a broad hosted and developer-controlled toolchain. Fable 5.1 is strongly oriented around Claude Code and long-running tool use. Choose the environment that best matches your existing permissions and observability.</li><li><strong>Verification:</strong> neither model should be trusted because it sounds confident. Require tests, diff inspection, migration checks, and an explicit list of unverified assumptions.</li><li><strong>Handoff quality:</strong> a useful agent leaves a concise summary of changed files, commands run, results, and follow-up risks.</li></ul>\n\n<h2>Cost: Measure the Complete Task</h2>\n\n<p>At published standard API rates, Fable 5.1 and GPT-6 Astra both list $10 per million input tokens and $50 per million output tokens. The details differ: Anthropic says Fable 5.1 cache reads cost $0.25 per million tokens, while OpenAI lists Astra cached input at $1 per million tokens and has separate charges for certain tools. These numbers are inputs to a budget, not the budget itself.</p>\n\n<p>Measure cost per accepted outcome. Include loaded context, tool calls, retries, human review time, tests that caught mistakes, and follow-up fixes. A cheap run that creates an authorization bug is expensive. A frontier run that repeatedly reads stale context can also be expensive. Build a small evaluation suite from your own tickets before choosing a default model.</p>\n\n<h2>Safety and Governance Are Features</h2>\n\n<p>Fable 5.1 uses production safeguards that can intervene on cybersecurity and life-sciences requests. Anthropic says its updated safeguards reduce false positives for defensive security work while continuing to restrict exploit development. That may fit teams that value a strong policy boundary, but their workflow should still handle a refusal or fallback gracefully.</p>\n\n<p>Astra can operate with high-impact tools, so access control matters just as much. Keep credentials out of prompts, scope filesystem and network permissions, require review before deployments or destructive commands, and retain logs. AI does not replace change management; it amplifies whatever permissions and validation loops it receives.</p>\n\n<h2>A Fair Evaluation Plan</h2>\n\n<ol><li>Choose 10 to 20 closed, representative tasks: bug fixes, tests, a small feature, code review, and a documentation-backed integration change.</li><li>Give both systems the same repository state, acceptance criteria, time budget, and permission boundaries.</li><li>Score correctness, test quality, unnecessary diff size, security issues, time to a reviewable result, cost, and clarity of the final handoff.</li><li>Repeat tasks enough times to avoid treating one lucky run as a product decision.</li><li>Route by task type after the evaluation. A lower-cost model may handle routine work while Fable or Astra handles ambiguous, high-leverage investigations.</li></ol>\n\n<h2>The Practical Decision</h2>\n\n<p>Choose Claude Fable 5.1 in Claude Code when the priority is a deeply sustained coding run that must investigate, implement, test, and continue across a large codebase. Choose GPT-6 Astra when the task benefits from configurable reasoning combined with web and file research, computer use, and the wider Responses API toolchain.</p>\n\n<p>For most teams, the strongest answer is not loyalty to one model. It is a disciplined workflow: define the task, limit authority, require evidence, evaluate outcomes on your own code, and let the model earn the next level of autonomy.</p>\n\n<h2>Primary Sources</h2>\n\n<ul><li><a href=\"https://www.anthropic.com/claude-fable-and-mythos-5-1\" target=\"_blank\" rel=\"noreferrer\">Anthropic: Claude Fable 5.1 and Claude Mythos 5.1</a></li><li><a href=\"https://developers.openai.com/api/docs/models/gpt-6-astra\" target=\"_blank\" rel=\"noreferrer\">OpenAI: GPT-6 Astra model documentation</a></li></ul>"
  }
]
