var zakodowanaWiadomosc;
var tablica;
var wylosowanyKlucz;
var wylosowanaWiadomosc;

function setTable() {   //tworzy tabelę z polami do wprowadzania liter

    var myTable = "<table>";
    for (var i = 0; i < 5; i++) {
        myTable += "<tr>";
        for (var j = 0; j < 5; j++) {
            myTable += "<td><input type='text' onchange='autoCorrect(this.value,this.id,true)' " +
                "id='myTable" + (5 * i + j + 1) + "' size='1' maxlength='1' pattern='[A-Za-z]{1}|[A-Za-z]\/[A-Za-z]{1}' required></td>";
        }
        myTable += "</tr>";
    }
    myTable += "</table>";
    //myTable += "<input type='submit'/></form>";
    document.getElementById('tablePrint').innerHTML = myTable;
}

function setTable2(wiadomosc) { //tworzy tabelę z polami do wprowadzenia zaszyfrowanej wiadomości
    var myTable = "<form><table><tr>";
    var n = Math.ceil(wiadomosc.length / 2);
    for (var i = 0; i < n; i++) {
        myTable += "<td><input type='text' onchange='autoCorrect(this.value,this.id,false)' " +
            "id='my2Table" + i + "' size='1' maxlength='2' pattern='[A-Za-z]{1,2}' required></td>";
    }
    myTable += "</tr></table></form>";
    document.getElementById('table2Print').innerHTML = myTable;
}

function autoCorrect(value, id, bool) { //poprawia żeby były same wielkie litery
    if (bool && (value.toUpperCase() == "I" || value.toUpperCase() == "J")) {
        document.getElementById(id).value = "I/J";
    }
    else {
        value = value.toUpperCase();
        document.getElementById(id).value = value;
    }

}

function fillAll() {    // uzupełnia tabelę losowymi literami
    for (var i = 0; i < 25; i++) {
        var id = "myTable" + (i + 1);
        var value = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        document.getElementById(id).value = value;
        autoCorrect(value, id, true);
    }
}

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

function encode() {    //szyfruje wiadomość
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

function encodeAll(klucz, wiadomosc) {
    klucz = poprawKlucz(klucz);
    for (var i = 0, id = ""; i < klucz.length; i++) {
        id = "myTable" + (i + 1);
        document.getElementById(id).value = klucz[i];
        autoCorrect(klucz[i], id, true);
    }

    var alfabet = poprawAlfabet(klucz);
    for (var i = klucz.length; i < 25; i++) {
        id = "myTable" + (i + 1);
        document.getElementById(id).value = alfabet[i - klucz.length];
        autoCorrect(alfabet[i - klucz.length], id, true);
    }

    wiadomosc = poprawWiadomosc(wiadomosc);
    document.getElementById('wiadomosc').value = wiadomosc;
    setTable2(wiadomosc);
    document.getElementById('szyfrogram').value = encode(wiadomosc);

}

function checkTable() {    //sprawdza czy wprowadzaono dobre litery
    var klucz = wylosowanyKlucz;
    klucz = poprawKlucz(klucz);
    var alfabet = poprawAlfabet(klucz);
    var myTable = getOrder();
    tablica = myTable;
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

function alertCheckTable(bool) {
    if (bool)
        alert("OK");
    else
        alert("ŹLE");
}

function sprawdzSzyfrogram() {
    var szyfrogram = getSzyfrogramOrder();
    for (var i = 0; i < szyfrogram.length; i++) {
        if (zakodowanaWiadomosc[i] !== szyfrogram[i])
            return false;
    }
    return true;
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
        if (orderList[i] === undefined)
            myTable[i] = undefined;
        else if (orderList[i] <= 9)
            myTable[i] = String.fromCharCode(65 + Number(orderList[i]) - 1);
        else
            myTable[i] = String.fromCharCode(65 + Number(orderList[i]));
    }
    return myTable;
}

function generateRandomKlucz() {    //generuje losowy klucz z listy
    var list = [];
    list.push('ala');
    list.push('ma');
    list.push('kota');
    list.push('pat');
    list.push('i');
    list.push('kot');

    var n = list.length;
    var k = Math.floor((Math.random() * n));

    wylosowanyKlucz = list[k];
    wylosowanyKlucz = wylosowanyKlucz.toUpperCase();
    $('#klucz').text(wylosowanyKlucz);
}

function generateRandomWiadomosc() {    //generuje losową wiadomość z listy
    var list = [];
    // list.push('archipelag');
    // list.push('matematyka');
    list.push('i');
    //hipoteza, dowód, twierdzenia, wyspa logiki, euler, gauss,

    var n = list.length;
    var k = Math.floor((Math.random() * n));

    wylosowanaWiadomosc = list[k];
    wylosowanaWiadomosc = wylosowanaWiadomosc.toUpperCase();
    $('#wiadomosc').text(wylosowanaWiadomosc);
}

function dzwignia(k) {
    if (k == 0) {
        generateRandomKlucz();
        generateRandomWiadomosc();
        // console.log('wylosowanaWiadomosc: ' + wylosowanaWiadomosc);
        // console.log('wylosowanyKlucz: ' + wylosowanyKlucz);
        return ++k;
    }
    else if ((k == 1) && checkTable()) {
        poprawWiadomosc();
        encode();
        freeze();
        $('#wiadomosc').text(wylosowanaWiadomosc);
        // console.log('wylosowanaWiadomosc: ' + wylosowanaWiadomosc);
        // console.log('wylosowanyKlucz: ' + wylosowanyKlucz);
        // console.log('tablica: ' + tablica);
        // console.log('zakodowanaWiadomosc: ' + zakodowanaWiadomosc);
        return ++k;
    }
    else if ((k == 2) && sprawdzSzyfrogram()) {
        alert('wygrales');
        return ++k;
    }
    return k;

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

     wiadomość i klucz najpierw pokazują się normalnie ze spacjami i tak dalej a potem dopiero jak już trzeba kodować to WYSKALOGIKIX

     */
}

