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

function twentynineteen_register_nav_menu() {
	register_nav_menus( array(
		'primary_menu' => __( 'Primary Menu', 'twentynineteen'),
	) );
}
add_action( 'after_setup_theme', 'twentynineteen', 0);

function villagebikes_post_thumbnails() {
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'villagebikes_post_thumbnails' );

function api_endpoints() {
	register_rest_route('send-contact-form/v1', '/contact/', [
		'methods' => 'POST',
		'callback' => 'send_contact_form'
	]);
}

add_action( 'rest_api_init', 'api_endpoints' );

function send_contact_form (WP_REST_Request $request ) {
	$full_name = sanitize_text_field( trim( $request['full_name'] ) );
	$email = sanitize_email( trim( $request['email'] ) );
	$body = wp_kses_post( trim ($request['body'] ) );

	$errors = [];
	if( empty( $full_name ) ) {
		$errors[] = "Name is required";
	}
	if( empty( $email ) ) {
		$errors[] = "Valid email is required";
	}
	if( empty( $body ) ) {
		$errors[] = "Message is required";
	}

	if (count( $errors ) ) {
		return new WP_Error( 'contact_form_errors', $errors, ['status' => 422 ] );
	}

	$message = "Full name: {$full_name}. <br> From: {$email}. <br> Message: $body";

	$headers = ['Content-Type: text/html; charset=UTF-8'];
	wp_mail( 'tylerlangties@gmail.com', 'contact form', $message, $headers );
	return 'success';
}