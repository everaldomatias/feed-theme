<?php

namespace Feed;

function enqueue_scripts() {
    wp_enqueue_script( 'feed-theme', get_template_directory_uri() . '/dist/bundle.js', [], '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'Feed\enqueue_scripts' );