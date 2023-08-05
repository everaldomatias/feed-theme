<?php

namespace Feed;

function theme_setup() {
    add_theme_support( 'custom-logo', [
        'height'      => 100,
        'width'       => 400,
        'header-text' => [ 'site-title', 'site-description' ],
    ] );
}
add_action( 'after_setup_theme', 'Feed\theme_setup' );

function enqueue_scripts() {
    wp_enqueue_script( 'feed-theme', get_template_directory_uri() . '/dist/bundle.js', [], '1.0.0', true );
    wp_localize_script( 'feed-theme', 'feed', [
        'appTitle' => get_bloginfo( 'name' ),
        'logoId' =>  get_theme_mod( 'custom_logo' )
    ]);
}
add_action( 'wp_enqueue_scripts', 'Feed\enqueue_scripts' );

add_filter( 'use_block_editor_for_post', '__return_false', 10 );

function remove_supports() {
    // If not in the admin, return.
    if ( ! is_admin() ) {
        return;
    }

    remove_post_type_support( 'post', 'title' );
}

add_action( 'init', 'Feed\remove_supports' );