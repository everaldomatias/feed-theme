<?php

namespace Feed;

function enqueue_admin_scripts() {
    $screen = get_current_screen();

    if ( 'post' === $screen->base && 'post' === $screen->post_type ) {
        wp_enqueue_script( 'feed-gallery', get_template_directory_uri() . '/assets/js/gallery.js', ['jquery'], '1.0.0', true );
        wp_enqueue_style( 'feed-gallery', get_template_directory_uri() . '/assets/css/gallery.css', [], '1.0.0' );
    }
}

add_action( 'admin_enqueue_scripts', 'Feed\enqueue_admin_scripts' );