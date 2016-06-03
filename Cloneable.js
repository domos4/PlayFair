var $list2 = $('#list2');
var numTilesDropped = 0;
var positions = [];

function createTileFreeze(i, p) {
    var k = i;
    if (k == 9)  //wywalamy J
        k++;
    else if (k > 9)
        k = i + 1;

    var image = new Image();

    image.onload = function () {
        $list2.append(element);
    };

    image.src = "grafika/plytki/" + String.fromCharCode(65 + k) + ".png";

    var element = $("<div><div/>").addClass("tileFreeze").addClass("tileFreeze" + (i + 1)).attr('id', 'tile'+ p +'Freeze' + (i + 1)).append(image);

    $list2.append(element);
}

function getPositions() {
    if ($('#tile1').index() == -1)
        return;

    var list = getOrder();

    for (var i = 0; i < list.length; i++) {
        list[i] = list[i].charCodeAt(0) - 65 + 1;
        if (list[i] > 9)
            --list[i];
        positions.push({
            nr: list[i]
        });
    }

    var offset = ['0px', '80.6px', '161.2px', '241.8px', '322.4px'];
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            positions[i * 5 + j].x = offset[j];
            positions[i * 5 + j].y = offset[i];
        }
    }
    console.log(positions);
}

function positionTileFreeze(i, p) {
    createTileFreeze(i, p);
    $('.tileFreeze' + (i + 1)).draggable({
        cursor: 'move',
        helper: 'clone',
        containment: '#gameFrame',
        stack: '.tileFreeze'
        // revert: true

    });
    $('#tile' + p + 'Freeze' + (i + 1)).css('left', positions[i].x);
    $('#tile' + p + 'Freeze' + (i + 1)).css('top', positions[i].y);
}

function freeze() {

    getPositions();

    $(".tile").remove();

    for (var i = 0; i < 25; i++) {
        positionTileFreeze(i, 1);
    }

    $('.tileFreeze').animate({
        boxShadow: '0 0 60px #08a40f',
    }, {
        duration: 750,
        complete: function () {
            $('.tileFreeze').animate({
                boxShadow: '0 0 0px #08a40f',
            }, {
                duration: 2500
            });
        }
    });

}

function handleTileDrop(event, ui) {
    var id = ui.draggable.attr('id');
    var index = '';
    if(!isNaN(id[id.length - 2]))
        index += id[id.length - 2];
    index += id[id.length - 1];
    console.log(index);

    var tileNumber = ui.draggable.data( 'tileNumber' );
//     createTileFreeze(tileNumber);

    ui.draggable.position({of: $(this), my: 'left top', at: 'left top'})


}
