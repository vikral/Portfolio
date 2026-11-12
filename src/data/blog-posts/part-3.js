// Blog entries in original order. Add new entries to the final part.
export const blogEntries = [
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
{
    id: "wordpress-cron-jobs-wp-cron",
    title: "Mastering WP-Cron: Scheduled Tasks Without Crontab Headaches",
    date: "November 5, 2025",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "How WP-Cron really works, when to disable it, and how to run reliable scheduled jobs with real system cron.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-user-roles-capabilities",
    title: "WordPress Roles and Capabilities: Building Fine-Grained Access Control",
    date: "November 8, 2025",
    category: "WordPress",
    readTime: "9 min read",
    excerpt: "Create custom roles, add capabilities, and lock down admin features without brittle role-name checks.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-media-library-optimization",
    title: "Optimising the WordPress Media Library for Speed and Storage",
    date: "November 12, 2025",
    category: "WordPress",
    readTime: "7 min read",
    excerpt: "WebP conversion, offloading to S3/CDN, cleaning orphaned attachments, and smarter image delivery.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-rewrite-rules-permalinks",
    title: "Pretty Permalinks and Custom Rewrite Rules in WordPress",
    date: "November 15, 2025",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Register custom endpoints, flush rules safely, and debug 404s when your rewrite map goes wrong.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-object-cache-redis",
    title: "WordPress Object Cache with Redis: Cut Database Load Dramatically",
    date: "November 18, 2025",
    category: "WordPress",
    readTime: "9 min read",
    excerpt: "Persistent object caching explained — drop-in setup, what to cache, and common Redis pitfalls on shared hosting.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-responsive-images-srcset",
    title: "Responsive Images in WordPress: srcset, sizes, and Custom Image Sizes",
    date: "November 22, 2025",
    category: "WordPress",
    readTime: "7 min read",
    excerpt: "Stop shipping 2000px images to phones. Register sizes, fix sizes attributes, and serve modern formats.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-nav-walker-custom-menus",
    title: "Custom Navigation Menus and Walkers in WordPress",
    date: "November 25, 2025",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Build accessible mega-menus and custom markup with Walker_Nav_Menu without fighting the default output.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-widgets-sidebars-api",
    title: "WordPress Widgets and Sidebars API: Still Useful in a Block World",
    date: "November 28, 2025",
    category: "WordPress",
    readTime: "6 min read",
    excerpt: "Register sidebars, build classic widgets, and migrate legacy widget areas without breaking client sites.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-ajax-admin-ajax-fetch",
    title: "WordPress AJAX Done Right: admin-ajax, REST, and Modern Fetch",
    date: "December 2, 2025",
    category: "WordPress",
    readTime: "8 min read",
    excerpt: "Secure AJAX handlers with nonces, compare admin-ajax vs REST API, and ship snappy front-end interactions.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-nonce-csrf-protection",
    title: "WordPress Nonces Explained: CSRF Protection for Forms and AJAX",
    date: "December 5, 2025",
    category: "WordPress",
    readTime: "6 min read",
    excerpt: "What nonces actually protect, how long they last, and the correct verify patterns for forms and endpoints.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-page-templates-explained",
    title: "WordPress Page Templates: When and How to Use Them",
    date: "December 8, 2025",
    category: "WordPress",
    readTime: "6 min read",
    excerpt: "Full-width layouts, landing pages, and template hierarchy tricks using classic and block theme templates.",
    cover: "",
    content: `
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
    `
  },
{
    id: "wordpress-conditional-tags-guide",
    title: "WordPress Conditional Tags: Control Layout Without Duplicating Templates",
    date: "December 11, 2025",
    category: "WordPress",
    readTime: "7 min read",
    excerpt: "is_singular, is_front_page, in_category, and the conditionals that keep templates DRY and readable.",
    cover: "",
    content: `
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
    `
  }
]
