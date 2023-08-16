<?php

namespace Feed;

function register_gallery_image_urls() {
    register_rest_field(
        'post',
        'gallery_image_urls',
        [
            'get_callback'    => 'Feed\get_gallery_image_urls',
            'update_callback' => null,
            'schema'          => null
        ]
    );
}

add_action( 'rest_api_init', 'Feed\register_gallery_image_urls' );

function get_gallery_image_urls( $post, $field_name, $request ) {
    $image_ids = get_post_meta( $post['id'], '_gallery_image_ids', true );
    $image_urls = [];

    if ( ! empty( $image_ids ) ) {
        $ids_array = explode( ',', $image_ids );

        foreach ( $ids_array as $id ) {
            $image_src = \wp_get_attachment_image_src( $id, 'full' );

            if ( $image_src ) {
                $image_urls[] = $image_src[0];
            }
        }
    }

    return $image_urls;
}