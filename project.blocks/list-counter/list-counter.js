import {getID} from '../../pages/scripts/generate_ID.js'
let radnom_set = new Set();

/* !!!!!!!!!!!!!!!!!!!!!! Старый list-counter !!!!!!!!!!!!!!!!!!!!! */

/* -------------- Переменные блока list-counter -------------- */

var listCounter_top = '.list-counter__top',
    listCounter_item = '.list-counter__item',
    lenghtList = $(listCounter_item).length;

// Генерация массива переменных на основе размера списка на странице
var list_ID = new Array(lenghtList);
for (var i = 0; i <= lenghtList; i++) {
    list_ID[i] = getID(12, radnom_set);
}


// Добавление пронумерованных классов к list-counter__item
let iter_item_a = 1;
$(listCounter_item).map(function(){
    $(this).addClass("list-counter__item_amount" + iter_item_a);
    $(this).attr("id", "NODROP_"+list_ID[iter_item_a-1]);
    iter_item_a++
});

// Добавление пронумерованных классов к list-counter_top
let iter_top = 1;
$(".list-counter__top").map(function(){
    $(this).attr("id", "NODROP_"+list_ID[iter_top-1]);
    $(this).attr("data-number", iter_top);
    //$(this).attr("id", "3");
    iter_top++
});

// Добавление пронумерованных классов к list-counter__apply
let iter_apply = 1;
$(".list-counter__apply").map(function(){
    $(this).parent().attr("id", "NODROP_"+list_ID[iter_apply-1]);
    iter_apply++
});


console.log("lenghtList: "+lenghtList);
// Генерация массива переменных на основе размера списка на странице
var varItems = new Array(lenghtList);
for (var i = 0; i <= lenghtList; i++) {
    varItems[i] = new Object ();
    varItems[i].btnMinus = '.list-counter__item_amount' + i + ' .list-counter__minus';
    varItems[i].btnPlus = '.list-counter__item_amount' + i + ' .list-counter__plus';
    varItems[i].amount = '.list-counter__item_amount' + i + ' .list-counter__minusAndPlus h3';
}
console.log("varItems.length: "+varItems.length);

/* ------------------------------------------------------- */


/* -------------- Реализация блока list-counter -------------- */

// ---- MAIN ---- //

// Предварительный запуск изменения внежнего вида кнопок
editButtons();

// Обработчики нажатия list-counter
$('.list-counter__top').click ({items : varItems}, function(e){
    apply (e.data.items, $(this))
});

// Обработчики нажатия кнопок '-' и '+'
/*
for (let x = 1; x <= lenghtList; x++) {
    $(varItems[x].btnMinus).click ({ item : varItems[x], items : varItems}, function(e){
        minus (e.data.item, e.data.items, x)
    });
    $(varItems[x].btnPlus).click ({ item : varItems[x], items : varItems}, function(e){
        plus (e.data.item, e.data.items, x)
    });
}
*/

$(".list-counter__minus").click ({ items : varItems}, function(e){
    minus ($(this), e.data.items)
});

$(".list-counter__plus").click ({ items : varItems}, function(e){
    plus ($(this), e.data.items)
});


// Обработчики нажатия кнопок 'применить'
$('.list-counter__apply').click ({items : varItems}, function(e){
    let ID = $(this).parent().attr("id");
    apply (e.data.items, $('.list-counter__top[id="'+ID+'"]'));
});

// Обработчик нажатия кнопки 'отменить'
$('.list-counter__clear').click (function view(){
    clear();
});


// ---- FUNCTIONS ---- //

// Функции изменения внежнего вида кнопок
function editButtons(){
    for (var i = 0; i <= lenghtList; i++) {
        initButtons(varItems[i].amount, varItems[i].btnMinus);
    }
}
function initButtons(amount, btnMinus) {
    var value = parseInt($(amount).text());
    if (value > 0) {
        if ($(btnMinus).hasClass('list-counter__circle_not-active')) {
            $(btnMinus).removeClass('list-counter__circle_not-active');
        }
    }
    else if (value == 0){ $(btnMinus).addClass('list-counter__circle_not-active') }
}

// Реализация кнопки '-'
function minus (This, itemsObj) {
    var value = parseInt($(This).text());

    if (value > 1) {
        $(This).text(function() {return value - 1;});
        editButtons();
    }
    else if (value == 1){
        $(This).text(function() {return value - 1;});
        editButtons();
    }
    let ID = $(This).attr("id"),
        number = $(This).attr("data-number");
    totalAmount(itemsObj, ID, number);
}

// Реализация кнопки '+'
function plus (This, itemsObj) {
    var value = parseInt($(This).text());
    $(This).text(function() {return value + 1;});
      
    if ($(This).hasClass("list-counter__circle_not-active")) {
        $(This).removeClass('list-counter__circle_not-active')
    }
    let ID = $(This).parent().parent().attr("id"),
        number = $('.list-counter__top[id="'+ID+'"]').attr("data-number");
    totalAmount(itemsObj, ID, number);
}

// Функция вывода общей суммы гостей (число + слово)
function totalAmount(itemsObj, ID, number) {
    console.log("ID: "+ID);
    console.log("number: "+number);
    var totalAmount = totalAmountNum(itemsObj, number);
    $('#'+ID+' > p').text(function() {
        var allGuests = theGuests(totalAmount);
        return totalAmount + allGuests;
    });
}

// Функция подсчета общей суммы гостей (только число)
function totalAmountNum(itemsObj, number) {
    var totalAmount = 0, value = 0;
    let end = 3*number, start = end-2;
    for (var i = start; i <= end; i++){
        value = parseInt($(itemsObj[i].amount).text());
        totalAmount += value
    }
    if (totalAmount == 0) {
        $(".list-counter__clear").text("");
    }
    else {
        $(".list-counter__clear").text("очистить");
    }
    return totalAmount;
}

// Функция вывода слов: "гость", "гостя" и "гостей"
function theGuests(totalAmount) {
    var text,
    lastDigits;
    lastDigits = totalAmount - (Math.trunc((totalAmount/100)) * 100);

    switch (lastDigits){
        case 1: case 21: case 31: case 41: case 51: case 61: case 71: case 81: case 91:
            text = " гость";
            break;
        case 2: case 22: case 32: case 42: case 52: case 62: case 72: case 82: case 92:
        case 3: case 23: case 33: case 43: case 53: case 63: case 73: case 83: case 93:
        case 4: case 24: case 34: case 44: case 54: case 64: case 74: case 84: case 94:
            text = " гостя";
            break;
        default:
            text = " гостей";
            break;
    }
    return text;
}

// Реализация кнопки 'применить'
function apply (itemsObj, This) {
    var out = new Array (2);
        out[0] = totalAmountNum(itemsObj);
        out[1] = outItems();
    if (out[0] == 0) {
        $("#total-amount").attr("value", '');
    }
    else {
        $("#total-amount").attr("value", out);
    }
    let ID = $(This).attr("id"),
        number = $(This).attr("data-number");
        console.log("ID: "+ID);
        console.log("number: "+number);
    $('#'+ID+' > p').text(totalAmount(itemsObj, ID, number));
    
    // Поля массива out:
        // 1 поле [общая сумма списка]
        // 2 список с присваиваниями { [пункт1 [заголовок пункта1], [сумма пункта1]],  [пункт2 [заголовок пункта2], [сумма пункта2]] }

    return out
}
function outItems() {
    var outItems = new Array(lenghtList),
        amountClass = '.list-counter__item_amount';
    for (var i = 0; i <= lenghtList; i++) {
        outItems[i] = new Object ();
        outItems[i].title = $(amountClass + i + ' > h3').text();
        outItems[i].amount = $(varItems[i].amount).text();
    }
    return outItems
}

// Реализация кнопки 'отменить'
function clear() {
    for (var i = 0; i <= lenghtList; i++) {
        $(varItems[i].amount).text(0);
    }
    $("#total-amount").attr("value", '');
    totalAmount(varItems);
    editButtons();
}
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */