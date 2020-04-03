/* !!!!!!!!!!!!!!!!!!!!!! Старый list-counter !!!!!!!!!!!!!!!!!!!!! */

/* -------------- Переменные блока list-counter -------------- */

var listCounter_top = '.list-counter__top',
    listCounter_item = '.list-counter__item',
    lenghtList = $(listCounter_item).length;

// Генерация массива переменных на основе размера списка на странице
var varItems = new Array(lenghtList);
for (var i = 0; i < lenghtList; i++) {
    varItems[i] = new Object ();
    varItems[i].btnMinus = '.list-counter__item_amount' + i + ' .list-counter__minus';
    varItems[i].btnPlus = '.list-counter__item_amount' + i + ' .list-counter__plus';
    varItems[i].amount = '.list-counter__item_amount' + i + ' .list-counter__minusAndPlus h3';
}

/* ------------------------------------------------------- */


/* -------------- Реализация блока list-counter -------------- */

// ---- MAIN ---- //

// Предварительный запуск изменения внежнего вида кнопок
editButtons();

// Обработчик нажатия list-counter
$(listCounter_top).click (function view(){
    apply (varItems);
});

// Обработчики нажатия кнопок '-' и '+'
$(varItems[0].btnMinus).click (function view(){ minus (varItems, 0) });
$(varItems[1].btnMinus).click (function view(){ minus (varItems, 1) });
$(varItems[2].btnMinus).click (function view(){ minus (varItems, 2) });
$(varItems[0].btnPlus).click (function view(){ plus (varItems, 0) });
$(varItems[1].btnPlus).click (function view(){ plus (varItems, 1) });
$(varItems[2].btnPlus).click (function view(){ plus (varItems, 2) });

// Обработчик кнопки 'применить'
$('.list-counter__apply').click (function view(){
    apply (varItems);
});

// Обработчик кнопки 'отменить'
$('.list-counter__clear').click (function view(){
    clear();
});


// ---- FUNCTIONS ---- //

// Функции изменения внежнего вида кнопок
function editButtons(){
    for (var i = 0; i < lenghtList; i++) {
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
function minus (itemsObj, x) {
    var value = parseInt($(itemsObj[x].amount).text());

    if (value > 1) {
        $(itemsObj[x].amount).text(function() {return value - 1;});
        editButtons();
    }
    else if (value == 1){
        $(itemsObj[x].amount).text(function() {return value - 1;});
        editButtons();
    }
    totalAmount(itemsObj);
}

// Реализация кнопки '+'
function plus (itemsObj, x) {
    var value = parseInt($(itemsObj[x].amount).text());
    $(itemsObj[x].amount).text(function() {return value + 1;});
      
    if ($(itemsObj[x].btnMinus).hasClass("list-counter__circle_not-active")) {
        $(itemsObj[x].btnMinus).removeClass('list-counter__circle_not-active')
    }
    totalAmount(itemsObj);
}

// Функция вывода общей суммы гостей (число + слово)
function totalAmount(itemsObject) {
    var totalAmount = totalAmountNum(itemsObject);
    $(listCounter_top + ' p').text(function() {
        var allGuests = theGuests(totalAmount);
        return totalAmount + allGuests;
    });
}

// Функция подсчета общей суммы гостей (только число)
function totalAmountNum(itemsObject) {
    var totalAmount = 0, value = 0;
    for (var i = 0; i < lenghtList; i++){
        value = parseInt($(itemsObject[i].amount).text());
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
function apply (itemsObj) {
    var out = new Array (2);
        out[0] = totalAmountNum(itemsObj);
        out[1] = outItems();
    if (out[0] == 0) {
        $("#total-amount").attr("value", '');
    }
    else {
        $("#total-amount").attr("value", out);
    }
    $(listCounter_top + ' p').text(totalAmount(itemsObj));
    
    // Поля массива out:
        // 1 поле [общая сумма списка]
        // 2 список с присваиваниями { [пункт1 [заголовок пункта1], [сумма пункта1]],  [пункт2 [заголовок пункта2], [сумма пункта2]] }

    return out
}
function outItems() {
    var outItems = new Array(lenghtList),
        amountClass = '.list-counter__item_amount';
    for (var i = 0; i < lenghtList; i++) {
        outItems[i] = new Object ();
        outItems[i].title = $(amountClass + i + ' > h3').text();
        outItems[i].amount = $(varItems[i].amount).text();
    }
    return outItems
}

// Реализация кнопки 'отменить'
function clear() {
    for (var i = 0; i < lenghtList; i++) {
        $(varItems[i].amount).text(0);
    }
    $("#total-amount").attr("value", '');
    totalAmount(varItems);
    editButtons();
}
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */