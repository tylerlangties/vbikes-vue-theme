<?php
// Remove all default WP template redirects/lookups
remove_action( 'template_redirect', 'redirect_canonical' );

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action( 'init', 'remove_redirects' );

// Load scripts
function load_vue_scripts() {
	wp_enqueue_script(
		'wordpress-vue-js',
		get_stylesheet_directory_uri() . '/dist/main.js',
		array( 'jquery' ),
		filemtime( get_stylesheet_directory() . '/dist/main.js' ),
		true
	);

	wp_enqueue_style(
		'wordpress-vue-css',
		get_stylesheet_directory_uri() . '/dist/main.css',
		null,
		filemtime( get_stylesheet_directory() . '/dist/main.css' )
	);
}
add_action( 'wp_enqueue_scripts', 'load_vue_scripts', 100 );

function villagebikes_register_nav_menu() {
	register_nav_menus( array(
		'primary_menu' => __( 'Primary Menu', 'wordpress-vue'),
	) );
}
add_action( 'after_setup_theme', 'villagebikes_register_nav_menu', 0);

function villagebikes_post_thumbnails() {
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'villagebikes_post_thumbnails' );