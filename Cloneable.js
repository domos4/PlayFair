var $list2 = $('#list2');
var numTilesDropped = 0;

function freeze() {

    if($('#tile1').index() == -1)
        return;

    var list = getOrder();
    $(".tile").remove();

    for (var i=0; i<list.length; i++) {
        list[i] = list[i].charCodeAt(0) - 65 + 1;
        if (list[i] > 9)
            --list[i];
    }

    var listID =[];

    for (var i = 0; i < numTiles; i++) {
        createTileFreeze(i);
        $('.tileFreeze').draggable({
            cursor: 'move',
            helper: 'clone',
            containment: '#gameFrame'


        });
        listID[i] = '#tileFreeze' + list[i];
    }

    var offset = ['0px', '80.6px', '161.2px', '241.8px', '322.4px'];
    for(var i=0; i<5; i++) {
        for(var j=0; j<5; j++) {
            $(listID[i*5+j]).css('top', offset[i]);
            $(listID[i*5+j]).css('left', offset[j]);
        }
    }

    $('.tileFreeze').animate({
        boxShadow: '0 0 60px #08a40f',
    }, {
        duration: 750,
        complete: function() {
            $('.tileFreeze').animate({
                boxShadow: '0 0 0px #08a40f',
            }, {
                duration: 2500
            });
        }
    });

}

function createTileFreeze(i) {
    var k = i;
    if (k == 9)  //wywalamy J
        k++;
    else if (k > 9)
        k = i + 1;

    var colspan = 1;

    // Create a new image
    var image = new Image();

    // Wait until the image is loaded before adding to the grid
    image.onload = function () {
        $list2.append(element);
        // layoutInvalidated();
    };

    image.src = "grafika/plytki/" + String.fromCharCode(65 + k) + ".png";

    var element = $("<div><div/>").addClass("tileFreeze").attr('id', 'tileFreeze' + (i+1)).append(image)

    $list2.append(element);
}

function handleTileDrop( event, ui ) {
    var slotNumber = $(this).data( 'number' );
    var cardNumber = ui.draggable.data( 'number' );

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again

    if ( slotNumber == cardNumber ) {
        ui.draggable.addClass( 'correct' );
        ui.draggable.draggable( 'disable' );
        $(this).droppable( 'disable' );
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
        numTilesDropped++;
    }

    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    if ( numTilesDropped == 10 ) {
        $('#successMessage').show();
        $('#successMessage').animate( {
            left: '380px',
            top: '200px',
            width: '400px',
            height: '100px',
            opacity: 1
        } );
    }

}
