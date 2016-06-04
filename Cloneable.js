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

    var element = $("<div><div/>").addClass("tileFreeze").addClass("tileFreeze" + (i + 1)).attr('id', 'tile'+ p +'Freeze' + (i + 1)).append(image);
    element.data('fromBoard', true).data('p', p).data('dropSlot', null);

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
    for (i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            positions[i * 5 + j].x = offset[j];
            positions[i * 5 + j].y = offset[i];
        }
    }
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
    var tileFreeze = $('#tile' + p + 'Freeze' + (i + 1));
    tileFreeze.css('left', positions[i].x);
    tileFreeze.css('top', positions[i].y);
}

function freeze() {
    
    getPositions();
    positions.sort(function(a, b) {
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
                duration: 2500
            });
        }
    });

}

function handleTileDrop(event, ui) {
    if($(this).data('vacant')) {    //jeśli dropSlot jest pusty
        ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});   //autocelowanie w dropSlot
        var id = ui.draggable.attr('id');
        var index = '';
        if(!isNaN(id[id.length - 2]))
            index += id[id.length - 2];
        index += id[id.length - 1];
        var iteration = ui.draggable.data('p');
        if(ui.draggable.data('fromBoard'))  //jeśli klocek pochodzi z planszy, utwórz kopię na planszy
            positionTileFreeze(index-1, iteration+1);
        ui.draggable.data('fromBoard', false);  //teraz już nie pochodzi z planszy
        $(this).droppable('disable');   //wyłącza możliwość dropowania klocków
        $(this).data('vacant', false);  //dropSlot zajęty
        if(ui.draggable.data('dropSlot') != null){
            ui.draggable.data('dropSlot').droppable('option', 'disabled', false);   //odblokowuje dropSlot, z którego pochodzi klocek
            ui.draggable.data('dropSlot').data('vacant', true); //i ustawia falgę że jest pusty
        }
        ui.draggable.data('dropSlot', $(this)); //przypisuje dropSlot do klocka
        $(this).data('tile', index);    //przypisuje klocek do dropSlota
    }
}
