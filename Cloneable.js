var $list2 = $('#list2');

function freeze() {
    $(".tile").remove();
    $('#list2').show();
}

function createBoardFreeze() {
    $('#list2').hide();
    for (var i = 0; i < numTiles; i++) {
        createTileFreeze(i);
    }
    $('#tileFreeze1').css('transform','translate3d(0px, 0px, 0px)');
    $('#tileFreeze2').css('transform','translate3d(80.6px, 0px, 0px)');
    $('#tileFreeze3').css('transform','translate3d(161.2px, 0px, 0px)');
    $('#tileFreeze4').css('transform','translate3d(241.8px, 0px, 0px)');
    $('#tileFreeze5').css('transform','translate3d(322.4px, 0px, 0px)');
    $('#tileFreeze6').css('transform','translate3d(0px, 80.6px, 0px)');
    $('#tileFreeze7').css('transform','translate3d(80.6px, 80.6px, 0px)');
    $('#tileFreeze8').css('transform','translate3d(161.2px, 80.6px, 0px)');
    $('#tileFreeze9').css('transform','translate3d(241.8px, 80.6px, 0px)');
    $('#tileFreeze10').css('transform','translate3d(322.4px, 80.6px, 0px)');
    $('#tileFreeze11').css('transform','translate3d(0px, 161.2px, 0px)');
    $('#tileFreeze12').css('transform','translate3d(80.6px, 161.2px, 0px)');
    $('#tileFreeze13').css('transform','translate3d(161.2px, 161.2px, 0px)');
    $('#tileFreeze14').css('transform','translate3d(241.8px, 161.2px, 0px)');
    $('#tileFreeze15').css('transform','translate3d(322.4px, 161.2px, 0px)');
    $('#tileFreeze16').css('transform','translate3d(0px, 241.8px, 0px)');
    $('#tileFreeze17').css('transform','translate3d(80.6px, 241.8px, 0px)');
    $('#tileFreeze18').css('transform','translate3d(161.2px, 241.8px, 0px)');
    $('#tileFreeze19').css('transform','translate3d(241.8px, 241.8px, 0px)');
    $('#tileFreeze20').css('transform','translate3d(322.4px, 241.8px, 0px)');
    $('#tileFreeze21').css('transform','translate3d(0px, 322.4px, 0px)');
    $('#tileFreeze22').css('transform','translate3d(80.6px, 322.4px, 0px)');
    $('#tileFreeze23').css('transform','translate3d(161.2px, 322.4px, 0px)');
    $('#tileFreeze24').css('transform','translate3d(241.8px, 322.4px, 0px)');
    $('#tileFreeze25').css('transform','translate3d(322.4px, 322.4px, 0px)');
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
