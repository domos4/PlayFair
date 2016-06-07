var $list2 = $('#list2');
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

    var element = $("<div><div/>").addClass("tileFreeze").attr('id', 'tile' + p + 'Freeze' + (i + 1)).append(image);
    element.data({
        dropSlot: null,
        index: (i+1),
        p: p
    });

    $list2.append(element);
}

function getPositions() {
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
    for (i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            positions[i * 5 + j].x = offset[j];
            positions[i * 5 + j].y = offset[i];
        }
    }
}

function positionTileFreeze(i, p) {
    createTileFreeze(i, p);
    $('.tileFreeze').draggable({
        cursor: 'move',
        helper: 'clone',
        containment: '#gameFrame',
        stack: '.tileFreeze',

    });
    var tileFreeze = $('#tile' + p + 'Freeze' + (i + 1));
    tileFreeze.css('left', positions[i].x);
    tileFreeze.css('top', positions[i].y);
}

function freeze() {

    getPositions();
    positions.sort(function (a, b) {
        return parseInt(a.nr) - parseInt(b.nr);
    });

    $(".tile").remove();

    for (var i = 0; i < 25; i++) {
        positionTileFreeze(i, 1);
    }

    $('.tileFreeze').animate({
        boxShadow: '0 0 60px #08a40f'
    }, {
        duration: 750,
        complete: function () {
            $('.tileFreeze').animate({
                boxShadow: '0 0 0px #08a40f'
            }, {
                duration: 2000
            });
        }
    });

}

function createDropSlots() {
    for (var i = 1; i <= 12; i++) {
        $('<div></div>').appendTo('#dropArea').attr({
            id: 'dropSlot' + i,
            class: 'dropSlot'
        }).data({
            tile: null
        }).droppable({
            accept: '.tileFreeze',
            hoverClass: 'hovered',
            drop: handleTileDrop,
            over: function (event, ui) {
                ui.draggable.data('out', false);
            },
            out: function (event, ui) {
                ui.draggable.data('out', true);
            }
        });
    }
    // $('<div></div>').appendTo('#dropArea').attr({
    //     id: 'trashCan'
    // }).droppable({
    //     accept: '.tileFreeze',
    //     drop: tileRemove
    // });
}

function tileRemove(event, ui) {
    if (ui.draggable.data('out')) {
        var id = ui.draggable.attr('id');
        var index = '';
        if (!isNaN(id[id.length - 2]))
            index += id[id.length - 2];
        index += id[id.length - 1];
        var iteration = ui.draggable.data('p');
        positionTileFreeze(index - 1, iteration + 1);
        id = '#' + id;
        $(id).remove();
    }
}

function setDropSlotsFree() {
    $('#dropArea').children().each(function () {
        $(this).droppable('option', 'disabled', false);
        $(this).data({
            tile: null
        });
    });
    positions = [];
}

function handleTileDrop(event, ui) {
    ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});   //autocelowanie w dropSlot
    var id = ui.draggable.attr('id');
    var index = ui.draggable.data('index');
    var iteration = ui.draggable.data('p');
    if (ui.draggable.data('dropSlot') == null)  //jeśli klocek pochodzi z planszy, utwórz kolejny na planszy
        positionTileFreeze(index - 1, iteration + 1);
    else {  //jeśli nie pochodzi z planszy to pochodzi z dropSlota
        ui.draggable.data('dropSlot').droppable('option', 'disabled', false);   //odblokowuje dropSlot, z którego pochodzi klocek
        ui.draggable.data('dropSlot').data('tile', null);  //i ustawia że nie ma do tego dropSlota przypisanego żadnego klocka
    }
    $(this).droppable('disable');   //wyłącza możliwość dropowania klocków
    ui.draggable.data('dropSlot', $(this)); //przypisuje dropSlot do klocka
    $(this).data('tile', index);    //przypisuje klocek do dropSlota
    id = '#' + id;
    $(id).draggable('option', 'helper', 'original');
    $(this).data('tileID', id);    //przypisuje id klocka do dropSlota
}
