<?php

namespace Feed;

function add_gallery_metabox( $post_type ) {
    $types = ['post'];

    if ( in_array( $post_type, $types ) ) {
        add_meta_box(
            'gallery-metabox',
            __( 'Galeria de imagens', 'feed' ),
            'Feed\gallery_meta_callback',
            $post_type,
            'normal',
            'high'
        );
    }
}

add_action( 'add_meta_boxes', 'Feed\add_gallery_metabox' );


function gallery_meta_callback( $post ) {
    wp_nonce_field( basename( __FILE__ ), 'meta-box-nonce' );
    if ( is_user_logged_in() ) {
        $image_ids = get_post_meta( $post->ID, '_gallery_image_ids', true );
        ?>
            <div id="gallery-metabox-container">
                <?php
                if ( $image_ids ) {
                    $ids = explode( ',', $image_ids );
                    foreach ( $ids as $id ) {
                        $img_src = wp_get_attachment_url( $id );
                        echo '<div data-id="' . $id . '"><img src="' . $img_src . '"/><span class="remove-image"></span></div>';
                    }
                }
                ?>
            </div>
            <input type="hidden" id="gallery-image-ids" name="gallery_image_ids" value="<?php echo $image_ids; ?>"/>
            <div>
                <button type="button" id="manage-gallery-button" class="button"><?php _e( 'Gerenciar Galeria', 'feed' ); ?></button>
            </div>
        <?php
    } else {
        echo '<p>' . __( 'Você precisa ser um editor e estar logado para gerenciar a galeria.', 'feed' ) . '</p>';
    }
}


function save_gallery_metabox( $post_id, $post, $update ) {
    if ( ! isset( $_POST['meta-box-nonce'] ) || ! wp_verify_nonce( $_POST['meta-box-nonce'], basename( __FILE__ ) ) )
        return $post_id;

    if ( ! current_user_can( 'edit_post', $post_id ) )
        return $post_id;

    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
        return $post_id;

    if ( isset( $_POST['gallery_image_ids'] ) ) {
        $image_ids = explode( ',', $_POST['gallery_image_ids'] );
        if ( count( $image_ids ) > 10 ) {
            $image_ids = array_slice( $image_ids, 0, 10 );
        }
        update_post_meta( $post_id, '_gallery_image_ids', implode( ',', $image_ids ) );
    }
}

add_action( 'save_post', 'Feed\save_gallery_metabox', 10, 3 );