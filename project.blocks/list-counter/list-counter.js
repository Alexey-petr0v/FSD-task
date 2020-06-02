import {getID} from '../../pages/scripts/generate_ID.js'
let radnom_set = new Set();

/* !!!!!!!!!!!!!!!!!!!!!! Старый list-counter !!!!!!!!!!!!!!!!!!!!! */

/* -------------- Переменные блока list-counter -------------- */

let top_class = 'list-counter__top',
    top_selector = '.list-counter__top',
    item_selector = '.list-counter__item',
    length_items = $(item_selector).length, // Количество элементов с классом .list-counter__item на всей странице
    length_top = $(top_selector).length, // Количество элементов с классом .list-counter__top на всей странице
    length_lists = new Array(length_top); // Список с количествами элементов с классом .list-counter__item в отдном классе .list-counter__bottom

// Генерация массива переменных на основе размера списка на странице
let list_ID = new Array(length_items);
for (let i = 0; i <= length_items; i++) {
    list_ID[i] = getID(12, radnom_set)
}

// Добавление пронумерованных классов к list-counter__item
let iter_item_a = 1;
$(item_selector).map(function(){
    $(this).addClass("list-counter__item_amount" + iter_item_a);
    iter_item_a++
});

// Добавление пронумерованных классов к list-counter_top
let iter_top = 1;
$(top_selector).map(function(){
    $(this).attr("id", "NODROP_"+list_ID[iter_top-1]);
    iter_top++
});

// Добавление пронумерованных классов к list-counter__bottom
let iter_bottom = 1;
$(".list-counter__bottom").map(function(){
    $(this).attr("id", "NODROP_"+list_ID[iter_bottom-1]);
    length_lists[iter_bottom-1] = $(this).children(".list-counter__item").length;
    iter_bottom++
});

// Добавление пронумерованных классов к list-counter__apply
let iter_apply = 1;
$(".list-counter__apply").map(function(){
    $(this).parent().attr("id", "NODROP_"+list_ID[iter_apply-1]);
    iter_apply++
});

/* ------------------------------------------------------- */


/* -------------- Реализация блока list-counter -------------- */

// ---- MAIN ---- //

// Предварительный запуск изменения внежнего вида кнопок
editButtons();

// Обработчики нажатия list-counter
$(top_selector).click (function(e){
    apply ($(this))
});

// Обработчики нажатия кнопок '-' и '+'
$(".list-counter__minus").click (function(e){
    minus ($(this))
});
$(".list-counter__plus").click (function(e){
    plus ($(this))
});

// Обработчики нажатия кнопок 'применить'
$('.list-counter__apply').click (function(e){
    let ID = $(this).parent().attr("id");
    apply ($(top_selector+'[id="'+ID+'"]'))
});

// Обработчик нажатия кнопки 'отменить'
$('.list-counter__clear').click (function view(){
    clear($(this))
});


// ---- FUNCTIONS ---- //

// Функция изменения внежнего вида кнопок
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

// Функция реализации кнопки '-'
function minus (This) {
    let h3 = $(This).parent().children("h3"),
        value = parseInt($(h3).text());
    if (value > 1) {
        $(h3).text(function() {return value - 1});
        editButtons()
    }
    else if (value == 1){
        $(h3).text(function() {return value - 1});
        editButtons()
    }
    totalAmount(This)
}

// Функция реализации кнопки '+'
function plus (This) {
    let h3 = $(This).parent().children("h3"),
        value = parseInt($(h3).text());
    $(h3).text(function() {return value + 1});
    editButtons();
    if ($(This).children(".list-counter__minus").hasClass("list-counter__circle_not-active")) {
        $(This).children(".list-counter__minus").removeClass('list-counter__circle_not-active')
    }
    totalAmount(This)
}

// Функция вывода общей суммы гостей (число + слово)
function totalAmount(This) {
    let bottom = searchBottom(This),
        ID = $(bottom).attr("id"),
        clear = bottom.find(".list-counter__clear");
    let totalAmount = totalAmountNum(ID, clear);
    $(top_selector+'[id="'+ID+'"] > p').text(function() {
        let allGuests = theGuests(totalAmount);
        return totalAmount + allGuests;
    });
}

// Функция поиска элемента с классом list-counter__bottom
function searchBottom(That){
    let Object = $(That),
        Class = $(Object).attr("class");
    while (Class != "list-counter__bottom"){
        if (Class == top_class) {
            let ID = $(Object).attr("id");
            Object = $(".list-counter__bottom[id='"+ID+"']");
            return Object
        }
        Object = $(Object).parent();
        Class = $(Object).attr("class")
    }
    return Object
}

// Функция подсчета общей суммы гостей (только число)
function totalAmountNum(ID, clear) {
    let totalAmount = 0, value = 0;

    let adfg = $("#"+ID+".list-counter__bottom").find(".list-counter__minusAndPlus").children("h3");
    $(adfg).map(function(){
        value = parseInt($(this).text());
        totalAmount += value
    });
    if (totalAmount == 0) {$(clear).text("")}
    else {$(clear).text("очистить")}
    return totalAmount
}



// Функция вывода слов: "гость", "гостя" и "гостей"
function theGuests(totalAmount) {
    let text, lastDigits = totalAmount - (Math.trunc((totalAmount/100)) * 100);
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
    return text
}

// Реализация кнопки 'применить'
function apply (This) {
    let bottom = searchBottom(This),
        ID = $(bottom).attr("id"),
        clear = bottom.find(".list-counter__clear");
    let out = new Array (2);
        out[0] = totalAmountNum(ID, clear);
        out[1] = outItems(bottom);
    if (out[0] == 0) {$('#'+ID+" #total-amount").attr("value", '')}
    else {
        $('#'+ID+" #total-amount").attr("value", out.toString());
    }
    totalAmount(This);
    // Поля массива out:
    //  1) поле [общая сумма списка]
    //  2) список с присваиваниями { [пункт1 [заголовок пункта1], [сумма пункта1]],  [пункт2 [заголовок пункта2], [сумма пункта2]] }
    return out
}

function outItems(bottom) {
    let outItems = new Array(length_items), i = 0;
    $($(bottom).children(item_selector)).map(function(){
        outItems[i] = new Object ();
        outItems[i].title = $(this).children("h3").text();
        outItems[i].amount = $(this).children(".list-counter__minusAndPlus").children("h3").text();
        i++
    });
    return outItems
}

// Реализация кнопки 'отменить'
function clear(This) {
    let bottom = searchBottom(This);
        $(bottom).find(".list-counter__minusAndPlus").find("h3").text(0);
    $("#total-amount").attr("value", '');
    totalAmount(This);
    editButtons()
}

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */