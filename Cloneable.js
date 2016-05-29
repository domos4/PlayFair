var $list2 = $('#list2');

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
        listID[i] = '#tileFreeze' + list[i];
    }

    $(listID[0]).css('transform','translate3d(0px, 0px, 0px)');
    $(listID[1]).css('transform','translate3d(80.6px, 0px, 0px)');
    $(listID[2]).css('transform','translate3d(161.2px, 0px, 0px)');
    $(listID[3]).css('transform','translate3d(241.8px, 0px, 0px)');
    $(listID[4]).css('transform','translate3d(322.4px, 0px, 0px)');
    $(listID[5]).css('transform','translate3d(0px, 80.6px, 0px)');
    $(listID[6]).css('transform','translate3d(80.6px, 80.6px, 0px)');
    $(listID[7]).css('transform','translate3d(161.2px, 80.6px, 0px)');
    $(listID[8]).css('transform','translate3d(241.8px, 80.6px, 0px)');
    $(listID[9]).css('transform','translate3d(322.4px, 80.6px, 0px)');
    $(listID[10]).css('transform','translate3d(0px, 161.2px, 0px)');
    $(listID[11]).css('transform','translate3d(80.6px, 161.2px, 0px)');
    $(listID[12]).css('transform','translate3d(161.2px, 161.2px, 0px)');
    $(listID[13]).css('transform','translate3d(241.8px, 161.2px, 0px)');
    $(listID[14]).css('transform','translate3d(322.4px, 161.2px, 0px)');
    $(listID[15]).css('transform','translate3d(0px, 241.8px, 0px)');
    $(listID[16]).css('transform','translate3d(80.6px, 241.8px, 0px)');
    $(listID[17]).css('transform','translate3d(161.2px, 241.8px, 0px)');
    $(listID[18]).css('transform','translate3d(241.8px, 241.8px, 0px)');
    $(listID[19]).css('transform','translate3d(322.4px, 241.8px, 0px)');
    $(listID[20]).css('transform','translate3d(0px, 322.4px, 0px)');
    $(listID[21]).css('transform','translate3d(80.6px, 322.4px, 0px)');
    $(listID[22]).css('transform','translate3d(161.2px, 322.4px, 0px)');
    $(listID[23]).css('transform','translate3d(241.8px, 322.4px, 0px)');
    $(listID[24]).css('transform','translate3d(322.4px, 322.4px, 0px)');

    // $('.list').css('box-shadow','0px 0px 5px #fff');
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
        layoutInvalidated();
    };

    image.src = "grafika/plytki/" + String.fromCharCode(65 + k) + ".png";

    // Add the image to the tile element
    var element = $("<div><div/>").addClass("tileFreeze").append(image);
    $(element).attr({
        'id': 'tileFreeze' + (i + 1),
    });

    // element.css('visibility', 'hidden');

    $list2.append(element);
}
