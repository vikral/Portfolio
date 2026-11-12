// Blog entries in original order. Add new entries to the final part.
export const blogEntries = [
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
}
]
