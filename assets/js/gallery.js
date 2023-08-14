jQuery(document).ready(function($) {
    var frame,
        addImgLink = $('#manage-gallery-button');

    function refreshSortable() {
        $('#gallery-metabox-container').sortable({
            items: 'div',
            update: function(event, ui) {
                updateImageIDs();
            }
        });
    }

    function updateImageIDs() {
        var ids = [];
        $('#gallery-metabox-container div').each(function() {
            ids.push($(this).data('id'));
        });
        $('#gallery-image-ids').val(ids.join(','));
    }

    addImgLink.on('click', function(event) {
        event.preventDefault();
        if (frame) {
            frame.open();
            return;
        }
        frame = wp.media({
            title: 'Selecione ou envie imagens para a galeria',
            button: {
                text: 'Use estas imagens'
            },
            library: {
                type: 'image'
            },
            multiple: true
        });

        frame.on('select', function() {
            var selection = frame.state().get('selection');
            var currentImages = $('#gallery-metabox-container div').length;

            selection.map(function(attachment) {
                if (currentImages < 10) {
                    attachment = attachment.toJSON();
                    $('#gallery-metabox-container').append('<div data-id="' + attachment.id + '"><img src="' + attachment.url + '"/><span class="remove-image"></span></div>');
                    refreshSortable();
                    currentImages++;
                } else {
                    alert('Você atingiu o limite de 10 imagens na galeria.');
                    return false;
                }
            });
            updateImageIDs();
        });
        frame.open();
    });

    $(document).on('click', '.remove-image', function(e) {
        e.preventDefault();
        $(this).parent().remove();
        updateImageIDs();
    });

    refreshSortable();
});
