var zakodowanaWiadomosc;
var tablica = [];
var wylosowanyKlucz;
var wylosowanaWiadomosc;
var k = 0;
var runda = 1;
var glow = {
    red: [],
    green: []
};
var punkty = 0;

function poprawKlucz(klucz) {    //usuwa powtarzające się litery z klucza
    klucz = klucz.toUpperCase();    //same wielkie litery
    klucz = klucz.replace(/ /g, "");    //wywala spacje
    document.getElementById('klucz').value = klucz; //wstawia na miejsce klucza na stronie poprawiony klucz
    var i = 0;
    for (var i = 0; i < klucz.length; i++) {   //wywalane są powtarzające się litery w kluczu
        var kluczRep = [];
        var k = 0;
        for (var j = 0; j < klucz.length; j++) {
            if (i == j)
                continue;
            else if (klucz.charAt(j) == klucz.charAt(i)) {
                kluczRep[k] = j;
                k += 1;
                continue;
            }
            else if ((klucz.charAt(i) == "I" || klucz.charAt(i) == "J") && (klucz.charAt(j) == "I" || klucz.charAt(j) == "J")) {
                kluczRep[k] = j;
                k += 1;
            }
        }
        for (var j = 0; j < kluczRep.length; j++) {
            klucz = klucz.substring(0, kluczRep[j]) + klucz.substring(kluczRep[j] + 1);
            for (k = j + 1; k < kluczRep.length; k++) {
                kluczRep[k] -= 1;
            }
        }
    }
    for (var i = 0; i < klucz.length; i++) {
        if (klucz[i] == "J")
            klucz = klucz.substring(0, i) + "I" + klucz.substring(i + 1);
    }
    return klucz;
}

function poprawAlfabet(klucz) { //zwraca alfabet bez tych liter, które są w kluczu
    var alfabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    var gdzieKlucz = [];
    for (var i = 0, k = 0; i < alfabet.length; i++) {
        for (var j = 0; j < klucz.length; j++) {
            if (alfabet.charAt(i) == klucz.charAt(j)) {
                gdzieKlucz[k] = i;
                k += 1;
            }
        }
    }
    for (var i = 0; i < gdzieKlucz.length; i++) {
        alfabet = alfabet.substring(0, gdzieKlucz[i]) + alfabet.substring(gdzieKlucz[i] + 1);
        for (k = i + 1; k < gdzieKlucz.length; k++) {
            gdzieKlucz[k] -= 1;
        }
    }
    return alfabet;
}

function poprawWiadomosc() {   //wstawia X (ew. Q) pomiędzy dwie takie same litery i X (lub Q) na koneic jak nieparzyście
    var wiadomosc = wylosowanaWiadomosc;
    wiadomosc = wiadomosc.toUpperCase()
    wiadomosc = wiadomosc.replace(/J/g, "I");
    wiadomosc = wiadomosc.replace(/ /g, "");
    var gdzieRep = [];
    var k = 0;
    for (var i = 0; i < wiadomosc.length - 1; i++) {
        if (wiadomosc[i] == wiadomosc[i + 1]) {
            gdzieRep[k] = i;
            k++;
        }
    }
    for (var i = 0; i < gdzieRep.length; i++) {
        if (wiadomosc[gdzieRep[i]] != "X")
            wiadomosc = wiadomosc.substring(0, gdzieRep[i] + 1) + "X" + wiadomosc.substring(gdzieRep[i] + 1);
        else
            wiadomosc = wiadomosc.substring(0, gdzieRep[i] + 1) + "Q" + wiadomosc.substring(gdzieRep[i] + 1);
        for (k = i + 1; k < gdzieRep.length; k++) {
            gdzieRep[k] += 1;
        }
    }
    if (wiadomosc.length % 2 == 1) {
        if (wiadomosc[wiadomosc.length - 1] != "X")
            wiadomosc += "X";
        else
            wiadomosc += "Q";
    }
    wylosowanaWiadomosc = wiadomosc;
}

function zwyklaWiadomosc() {
    var wiadomosc = wylosowanaWiadomosc;
    for (i = 0; i < wiadomosc.length - 2; i++) {
        if (wiadomosc[i] != "X" && wiadomosc[i + 1] == "X" && wiadomosc[i + 2] == wiadomosc[i])
            wiadomosc = wiadomosc.substring(0, i + 1) + wiadomosc.substring(i + 2);
        else if (wiadomosc[i] == "X" && wiadomosc[i + 1] == "Q" && wiadomosc[i + 2] == wiadomosc[i]) {
            wiadomosc = wiadomosc.substring(0, i + 1) + wiadomosc.substring(i + 2);
        }
    }
    if (wiadomosc.length % 2 == 0 && wiadomosc[wiadomosc.length - 1] == "X")
        wiadomosc = wiadomosc.substring(0, wiadomosc.length - 1);
    wylosowanaWiadomosc = wiadomosc;
}

function encode() {    //szyfruje wiadomość
    poprawWiadomosc();
    var wiadomosc = wylosowanaWiadomosc;
    var myTable = tablica;
    var wiadomoscIndeksy = [];
    for (var i = 0; i < wiadomosc.length; i++) {
        for (var j = 0; j < 25; j++) {
            if (wiadomosc[i] == myTable[j] || ((wiadomosc[i] == "I" || wiadomosc[i] == "J") && myTable[j] == "I/J")) {
                wiadomoscIndeksy[i] = j;
            }
        }
    }
    var szyfrogram = "";
    for (var i = 0; i < wiadomosc.length; i += 2) {
        if (wiadomoscIndeksy[i] % 5 == wiadomoscIndeksy[i + 1] % 5) {
            szyfrogram += myTable[(wiadomoscIndeksy[i] + 5) % 25];
            szyfrogram += myTable[(wiadomoscIndeksy[i + 1] + 5) % 25];
        }
        else if (Math.floor(wiadomoscIndeksy[i] / 5) == Math.floor(wiadomoscIndeksy[i + 1] / 5)) {
            szyfrogram += myTable[(wiadomoscIndeksy[i] + 1) % 5 + 5 * Math.floor(wiadomoscIndeksy[i] / 5)];
            szyfrogram += myTable[(wiadomoscIndeksy[i + 1] + 1) % 5 + 5 * Math.floor(wiadomoscIndeksy[i + 1] / 5)];
        }
        else {
            szyfrogram += myTable[(wiadomoscIndeksy[i] + wiadomoscIndeksy[i + 1] - wiadomoscIndeksy[i]) % 5 + 5 * Math.floor(wiadomoscIndeksy[i] / 5)];
            szyfrogram += myTable[(wiadomoscIndeksy[i + 1] + wiadomoscIndeksy[i] - wiadomoscIndeksy[i + 1]) % 5 + 5 * Math.floor(wiadomoscIndeksy[i + 1] / 5)];
        }
    }
    // for (var i = 2; i < szyfrogram.length; i += 3) {
    //     szyfrogram = szyfrogram.substring(0, i) + " " + szyfrogram.substring(i);
    // }
    zakodowanaWiadomosc = szyfrogram;
}

function encodeAll() {
    var klucz = wylosowanyKlucz;
    klucz = poprawKlucz(klucz);

    for (var i = 0; i < klucz.length; i++) {
        tablica.push(klucz[i]);
    }

    var alfabet = poprawAlfabet(klucz);
    for (i = 0; i < 25 - klucz.length; i++) {
        tablica.push(alfabet[i]);
    }

    encode();

}

function checkTable() {    //sprawdza czy wprowadzaono dobre litery
    var klucz = wylosowanyKlucz;
    klucz = poprawKlucz(klucz);
    var alfabet = poprawAlfabet(klucz);
    var myTable = getOrder();
    //for(var i=0; i<25; i++) {
    //    var id = "myTable" + (i+1);
    //    myTable[i] = document.getElementById(id).value;
    //}
    var licznik = 0;
    for (var i = 0; i < klucz.length; i++) {
        if (myTable[i] == klucz[i])
            licznik++;
        //else if(myTable[i] == 'I/J' && klucz[i] =='I')
        //    licznik++;
    }
    if (licznik == klucz.length) {
        var licznik2 = 0;
        for (var i = klucz.length; i < alfabet.length; i++) {
            if (myTable[i] == alfabet.charAt(i - klucz.length))
                licznik2++;
            //else if(myTable[i] == 'I/J' && alfabet.charAt(i-klucz.length)=='I')
            //    licznik2++;
        }
        return (licznik2 == alfabet.length - klucz.length);
    }
    return false;
}

function sprawdzSzyfrogram() {
    var szyfrogram = getSzyfrogramOrder();
    var szyfrogram2 = [];

    for (var i = 0; i < 12; i++) {
        if (szyfrogram[i] === undefined) {
            continue;
        }
        for (var j = i, n = ++i; j < 12; j++) {
            szyfrogram2.push(szyfrogram[j]);
        }
        szyfrogram = [];
        for (i = szyfrogram2.length; i--;) {
            if (szyfrogram2[i] === undefined) {
                continue;
            }
            for (j = ++i; j--;) {
                szyfrogram.push(szyfrogram2[j]);
            }
            szyfrogram.reverse();
            break;
        }
        break;
    }

    var result = true;
    if (runda < 3) {
        var t = (zakodowanaWiadomosc.length > szyfrogram.length) ?
            zakodowanaWiadomosc.length : szyfrogram.length;
        for (i = 0; i < t; i++) {
            var id = '#dropSlot' + n++;
            if (zakodowanaWiadomosc[i] == szyfrogram[i] && zakodowanaWiadomosc[i] !== undefined)
                glow.green.push($(id));
            else if (szyfrogram[i] !== undefined) {
                glow.red.push($(id));
                result = false;
            }
            else
                result = false;
        }
    }

    else {
        var t = (wylosowanaWiadomosc.length > szyfrogram.length) ?
            wylosowanaWiadomosc.length : szyfrogram.length;
        for (i = 0; i < t; i++) {
            var id = '#dropSlot' + n++;
            if (wylosowanaWiadomosc[i] == szyfrogram[i] && wylosowanaWiadomosc[i] !== undefined)
                glow.green.push($(id));
            else if (szyfrogram[i] !== undefined) {
                glow.red.push($(id));
                result = false;
            }
            else
                result = false;
        }
    }
    return result;
}

function decode(szyfrogram) {
    // szyfrogram = szyfrogram.toUpperCase();
    // szyfrogram = szyfrogram.replace(/ /g, "");
    // szyfrogram = szyfrogram.replace(/J/g, "I");
    // document.getElementById('szyfrogram').value = szyfrogram;

    var szyfrogram = zakodowanaWiadomosc;
    // klucz = poprawKlucz(klucz);

    var myTable = tablica;
    // for (var i = 0; i < klucz.length; i++)
    //     myTable += klucz[i];
    //
    // var alfabet = poprawAlfabet(klucz);
    // for (i = klucz.length; i < 25; i++)
    //     myTable += alfabet[i - klucz.length];

    var szyfrogramIndeksy = [];
    for (var i = 0; i < szyfrogram.length; i++) {
        for (var j = 0; j < 25; j++) {
            if (szyfrogram[i] == myTable[j] || ((szyfrogram[i] == "I" || szyfrogram[i] == "J") && myTable[j] == "I/J")) {
                szyfrogramIndeksy[i] = j;
            }
        }
    }
    var wiadomosc = "";
    for (i = 0; i < szyfrogram.length; i += 2) {
        if (szyfrogramIndeksy[i] % 5 == szyfrogramIndeksy[i + 1] % 5) {
            wiadomosc += myTable[(szyfrogramIndeksy[i] + 20) % 25];
            wiadomosc += myTable[(szyfrogramIndeksy[i + 1] + 20) % 25];
        }
        else if (Math.floor(szyfrogramIndeksy[i] / 5) == Math.floor(szyfrogramIndeksy[i + 1] / 5)) {
            wiadomosc += myTable[(szyfrogramIndeksy[i] + 4) % 5 + 5 * Math.floor(szyfrogramIndeksy[i] / 5)];
            wiadomosc += myTable[(szyfrogramIndeksy[i + 1] + 4) % 5 + 5 * Math.floor(szyfrogramIndeksy[i + 1] / 5)];
        }
        else {
            wiadomosc += myTable[(szyfrogramIndeksy[i] + szyfrogramIndeksy[i + 1] - szyfrogramIndeksy[i]) % 5 + 5 * Math.floor(szyfrogramIndeksy[i] / 5)];
            wiadomosc += myTable[(szyfrogramIndeksy[i + 1] + szyfrogramIndeksy[i] - szyfrogramIndeksy[i + 1]) % 5 + 5 * Math.floor(szyfrogramIndeksy[i + 1] / 5)];
        }
    }
    for (i = 0; i < wiadomosc.length - 2; i++) {
        if (wiadomosc[i] != "X" && wiadomosc[i + 1] == "X" && wiadomosc[i + 2] == wiadomosc[i])
            wiadomosc = wiadomosc.substring(0, i + 1) + wiadomosc.substring(i + 2);
        else if (wiadomosc[i] == "X" && wiadomosc[i + 1] == "Q" && wiadomosc[i + 2] == wiadomosc[i]) {
            wiadomosc = wiadomosc.substring(0, i + 1) + wiadomosc.substring(i + 2);
        }
    }
    if (wiadomosc.length % 2 == 0 && wiadomosc[wiadomosc.length - 1] == "X")
        wiadomosc = wiadomosc.substring(0, wiadomosc.length - 1);
    document.getElementById('wiadomosc').value = wiadomosc;
    for (i = 2; i < szyfrogram.length; i += 3) {
        szyfrogram = szyfrogram.substring(0, i) + " " + szyfrogram.substring(i);
    }
    // document.getElementById('szyfrogram').value = szyfrogram;
    return wiadomosc;
}

function getOrder() {   //zwraca tablicę liter
    var orderList = [];
    for (var i = 0; i < 25; i++) {
        var id = "#tile" + (i + 1);
        orderList[i] = $(id).index();
    }
    var myTable = [];
    for (var i = 0; i < 25; i++) {
        if (i < 9)
            myTable[orderList[i]] = String.fromCharCode(65 + i);
        else
            myTable[orderList[i]] = String.fromCharCode(65 + i + 1);
    }
    return myTable;
}

function getSzyfrogramOrder() {
    var orderList = [];
    for (var i = 1; i <= 12; i++) {
        var id = '#dropSlot' + i;
        var tileIndex = $(id).data('tile');
        orderList.push(tileIndex)
    }
    var myTable = [12];
    for (i = 0; i < 12; i++) {
        if (orderList[i] === null)
            myTable[i] = undefined;
        else if (orderList[i] <= 9)
            myTable[i] = String.fromCharCode(65 + Number(orderList[i]) - 1);
        else
            myTable[i] = String.fromCharCode(65 + Number(orderList[i]));
    }
    return myTable;
}

var listaKluczy = [''];
// var listaKluczy = ['kot', 'pies', 'krowa', 'okon', 'karp', 'wrobel', 'lew', 'mysz', 'szczur', 'paw'];
function generateRandomKlucz() {    //generuje losowy klucz z listy
    var n = listaKluczy.length;
    var k = Math.floor((Math.random() * n));
    wylosowanyKlucz = listaKluczy[k];
    wylosowanyKlucz = wylosowanyKlucz.toUpperCase();
    $('#klucz').text(wylosowanyKlucz);
    // listaKluczy.splice(k, 1);    //wyywalam wylosowamy element z listy, żeby nie powtórzały się klucze
}

var listaWiadomosci = [['vw'], ['xy']];
// var listaWiadomosci = [['dowod', 'euler', 'calka', 'lemat'],
//     ['archipelag', 'matematyka', 'hipoteza', 'twierdzenie', 'gauss', 'wyspa liczb']];
function generateRandomWiadomosc() {    //generuje losową wiadomość z listy
    var t = runda % 2 == 1 ? 0 : 1;
    var n = listaWiadomosci[t].length;
    var k = Math.floor((Math.random() * n));
    wylosowanaWiadomosc = listaWiadomosci[t][k];
    wylosowanaWiadomosc = wylosowanaWiadomosc.toUpperCase();
    // listaWiadomosci[t].splice(k, 1);
}

function resetuj() {
    // $('.tileFreeze').animate({
    //     opacity: 0
    // }, {
    //     duration: 2000,
    //     start: function () {
    //         console.log("poczatek");
    //     },
    //     always: function () {
    //         console.log('koniec');
    //         $('.tileFreeze').remove();
    //         initDraggable();
    //
    //     }
    // });
    $('.tileFreeze').remove();
    initDraggable();
    k = 0;
    ++runda;
    wylosowanaWiadomosc = undefined;
    wylosowanyKlucz = undefined;
    zakodowanaWiadomosc = undefined;
    tablica = [];
    $('#klucz').text('');
    $('#wiadomosc').text('');
    $('#szyfrogram').text('');
    setDropSlotsFree();
    glow = {
        red: [],
        green: []
    };
}

function koniec() {
    drukuj('Otrzymujesz ' + punkty + ' punktów. Gratulacje!');
}

function pokolorujKlocki() {
    $.each(glow.red, function () {
        $(this.data('tileID')).css('opacity', '0.7');
        this.css('background', 'red');
    });
    $.each(glow.green, function () {
        $(this.data('tileID')).css('opacity', '0.7');
        this.css('background', '#08a40f');
    });
}

function zablokujKlocki() {
    $(".tileFreeze").draggable('option', 'disabled', true);
    $(".tileFreeze").css('cursor', 'auto');
}

function tooltip(s) {
    switch (s) {
        case 'klucz':
        {
            var offset = 0;
        }
            break;
        case 'wiadomosc':
        {
            var offset = 50;
        }
            break;
        case 'szyfrogram':
        {
            var offset = 100;
        }
            break;
        default:
        {
        }
    }
    var id = '#' + s;
    var idOpis = id + 'Opis';
    $(id).mousemove(function (event) {
        var left = event.pageX - $(this).offset().left + 100;
        var top = event.pageY - $(this).offset().top + 550 + offset;
        $(idOpis).css({top: top, left: left}).show();
    });
    $(id).mouseout(function () {
        $(idOpis).hide();
    });
}

function drukuj(string) {
    $("#chatlist").append("<span>" + string + "</span>");
}

function dzwignia() {
    switch (k) {
        case 0:
        {
            drukuj('Ułóż klocki według klucza i pociągnij za dźwignię.');
            generateRandomKlucz();
            generateRandomWiadomosc();
            encodeAll();
            ++k;
        }
            break;
        case 1:
        {
            if (!checkTable())
                drukuj('Źle ułożone klocki. Ułóż ponownie i pociągnij za dźwignię.');
            else {
                freeze();
                if (runda < 3) {
                    $('#wiadomosc').text(wylosowanaWiadomosc);
                    drukuj('Przeciągnij klocki, aby zaszyfrować wiadomość i pociągnij za dźwignię.')
                }
                else {
                    $('#szyfrogram').text(zakodowanaWiadomosc);
                    drukuj('Przeciągnij klocki, aby odszyfrować wiadomość i pociągnij za dźwignię.')
                }
                ++k;
            }
        }
            break;
        case 2:
        {
            if (sprawdzSzyfrogram()) {
                drukuj('Bardzo dobrze!');
                punkty++;
            }
            else
                drukuj('Niestety, pomyłka.');
            if (runda < 5)
                drukuj('Pociągnij za dźwignię, aby przejść do następnej rundy.');
            else
                drukuj('Pociągnij za dźwignię, aby podliczyć punkty.');
            zablokujKlocki();
            pokolorujKlocki();
            ++k;
        }
            break;
        case 3:
        {
            resetuj();
            if (runda < 5)
                dzwignia();
            else
                koniec();
        }
            break;
        default:
        {
        }
    }
}

/*

 1. losujemy klucz i wiadomość z klasy pierwszej - łatwej
 2. użytkownik ustawia kafle i ciągnie dźwignię
 3. kafle zamarzają, można je teraz przeciągać do dropArea
 4. użytkownik uskłąda szyfrogram i pociąga dźwignię
 5. kafle w dropArea podświetlają się na zielono lub czerwono i
 losowana jest kolejna para klucz-wiadomość, tym razem z klasy drugiej - trudnej
 6. itd
 7. do samo tylko dwa szyfrogramy do odkodowania
 8. na koniec podliczane są punkty za te cztery rzeczy.

 */
/*

 wiadomość i klucz najpierw pokazują się normalnie ze spacjami i tak dalej a potem dopiero jak już trzeba kodować to WYSPALOGIKIX

 */

