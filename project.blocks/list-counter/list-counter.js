import {getID} from '../../pages/scripts/generate_ID.js'
let radnom_set = new Set();

/* !!!!!!!!!!!!!!!!!!!!!! Старый list-counter !!!!!!!!!!!!!!!!!!!!! */

/* -------------- Переменные блока list-counter -------------- */

let listCounter_top = '.list-counter__top',
    listCounter_item = '.list-counter__item',
    lenghtList = $(listCounter_item).length;

// Генерация массива переменных на основе размера списка на странице
let list_ID = new Array(lenghtList);
for (let i = 0; i <= lenghtList; i++) {
    list_ID[i] = getID(12, radnom_set);
}


// Добавление пронумерованных классов к list-counter__item
let iter_item_a = 1;
$(listCounter_item).map(function(){
    $(this).addClass("list-counter__item_amount" + iter_item_a);
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

// Добавление пронумерованных классов к list-counter__bottom
let iter_bottom = 1;
$(".list-counter__bottom").map(function(){
    $(this).attr("id", "NODROP_"+list_ID[iter_bottom-1]);
    $(this).attr("data-number", iter_bottom);
    //$(this).attr("id", "3");
    iter_bottom++
});

// Добавление пронумерованных классов к list-counter__apply
let iter_apply = 1;
$(".list-counter__apply").map(function(){
    $(this).parent().attr("id", "NODROP_"+list_ID[iter_apply-1]);
    $(this).attr("data-number", iter_apply);
    iter_apply++
});


//console.log("lenghtList: "+lenghtList);
// Генерация массива переменных на основе размера списка на странице
let varItems = new Array(lenghtList);
for (let i = 0; i <= lenghtList; i++) {
    varItems[i] = new Object ();
    varItems[i].btnMinus = '.list-counter__item_amount' + i + ' .list-counter__minus';
    varItems[i].btnPlus = '.list-counter__item_amount' + i + ' .list-counter__plus';
    varItems[i].amount = '.list-counter__item_amount' + i + ' .list-counter__minusAndPlus h3';
}
//console.log("varItems.length: "+varItems.length);

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
    $(".list-counter__minus").map(function(){
        let value = parseInt($(this).parent().children("h3").text());
        if (value > 0) {
            if ($(this).hasClass('list-counter__circle_not-active')) {
                $(this).removeClass('list-counter__circle_not-active');
            }
        }
        else if (value == 0){ $(this).addClass('list-counter__circle_not-active') }
    });
}


// Реализация кнопки '-'
function minus (This, itemsObj) {
    let h3 = $(This).parent().children("h3");

    let value = parseInt($(h3).text());

    if (value > 1) {
        $(h3).text(function() {return value - 1;});
        editButtons();
    }
    else if (value == 1){
        $(h3).text(function() {return value - 1;});
        editButtons();
    }
    totalAmount(itemsObj, This);
}

// Реализация кнопки '+'
function plus (This, itemsObj) {
    let h3 = $(This).parent().children("h3");

    let value = parseInt($(h3).text());
    $(h3).text(function() {return value + 1;});
    editButtons();
      
    if ($(This).children(".list-counter__minus").hasClass("list-counter__circle_not-active")) {
        $(This).children(".list-counter__minus").removeClass('list-counter__circle_not-active')
    }
    totalAmount(itemsObj, $(This));
}

// Функция вывода общей суммы гостей (число + слово)
function totalAmount(itemsObj, This) {
    let bottom = searchBottom(This),
        ID = $(bottom).attr("id"),
        number = $(bottom).attr("data-number"),
        clear = bottom.find(".list-counter__clear");

    let totalAmount = totalAmountNum(itemsObj, number, clear);
    $('.list-counter__top[id="'+ID+'"] > p').text(function() {
        let allGuests = theGuests(totalAmount);
        return totalAmount + allGuests;
    });
}

// Функция поиска элемента с классом list-counter__bottom
function searchBottom(That){
    let Object = $(That),
    Class = $(Object).attr("class");
    
    while (Class != "list-counter__bottom"){
        if (Class == "list-counter__top") {
            let ID = $(Object).attr("id");
            Object = $(".list-counter__bottom[id='"+ID+"']");
            return Object;
        }
        Object = $(Object).parent();
        Class = $(Object).attr("class");
    }
    return Object;
}






// Функция подсчета общей суммы гостей (только число)
function totalAmountNum(itemsObj, number, clear) {
    let totalAmount = 0, value = 0;
    let end = 3*number, start = end-2;
    for (let i = start; i <= end; i++){
        value = parseInt($(itemsObj[i].amount).text());
        //console.log("value: "+value);
        totalAmount += value
    }

    if (totalAmount == 0) {
        $(clear).text("");
    }
    else {
        $(clear).text("очистить");
    }
    return totalAmount;
}

// Функция вывода слов: "гость", "гостя" и "гостей"
function theGuests(totalAmount) {
    let text,
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
    let out = new Array (2);
        out[0] = totalAmountNum(itemsObj);
        out[1] = outItems();
    if (out[0] == 0) {
        $("#total-amount").attr("value", '');
    }
    else {
        $("#total-amount").attr("value", out);
    }
    let ID = $(This).attr("id");
    //console.log("apply_ID: "+ID);
    $('.list-counter__top[id="'+ID+'"] > p').text(totalAmount(itemsObj, This));
    
    // Поля массива out:
        // 1 поле [общая сумма списка]
        // 2 список с присваиваниями { [пункт1 [заголовок пункта1], [сумма пункта1]],  [пункт2 [заголовок пункта2], [сумма пункта2]] }

    return out
}
function outItems() {
    let outItems = new Array(lenghtList),
        amountClass = '.list-counter__item_amount';
    for (let i = 0; i <= lenghtList; i++) {
        outItems[i] = new Object ();
        outItems[i].title = $(amountClass + i + ' > h3').text();
        outItems[i].amount = $(varItems[i].amount).text();
    }
    return outItems
}

// Реализация кнопки 'отменить'
function clear() {
    for (let i = 0; i <= lenghtList; i++) {
        $(varItems[i].amount).text(0);
    }
    $("#total-amount").attr("value", '');
    totalAmount(varItems);
    editButtons();
}


/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */