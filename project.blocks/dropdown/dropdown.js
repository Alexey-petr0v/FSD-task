var dropdown = '.field__input_dropdown',
    dropdown_list = $('.field__input_dropdown-list'),
    dropdown_item = '.field__dropdown-item';

var btnMinus1 = '.amount1 .minus',
    btnPlus1 = '.amount1 div.plus',
    amount1 = $('.amount1 .minusAndPlus h3'),

    btnMinus2 = '.amount2 div.minus',
    btnPlus2 = '.amount2 div.plus',
    amount2 = $('.amount2 .minusAndPlus h3'),

    btnMinus3 = '.amount3 div.minus',
    btnPlus3 = '.amount3 div.plus',
    amount3 = $('.amount3 .minusAndPlus h3');
    

/* ------- Отображение/скрытие всплывающего списка ------- */

$(dropdown).click (function view(){
    var click = parseInt($(dropdown_list).attr("data-clickStatus")),
        clickOn = 0,
        clickOff = 0;

    if (click == 0){
        clickOn = click;
        clickOn++;
        $(dropdown_list).attr("data-clickStatus", clickOn);
        dropdown_list.slideToggle();
    }
    else if (click == 1){
        clickOff = click;
        clickOff--;
        $(dropdown_list).attr("data-clickStatus", clickOff);
        dropdown_list.slideToggle();
    }
    
    $(dropdown + ' p').text("Список гостей");
});


/* ------- Функционал всплывающего списка ------- */

// Изначальный вид списка
    // Отображение количества гостей
    // и визуальной деактивации кнопок

// Кнопки списков
initButtons(amount1, btnMinus1);
initButtons(amount2, btnMinus2);
initButtons(amount3, btnMinus3);

function initButtons(amount, btnMinus) {
    var value = parseInt($(amount).text());
    if (value > 0) {
        if ($(btnMinus).hasClass('circle_not-active')) {
            $(btnMinus).removeClass('circle_not-active');
        }
    }
    else if (value == 0){ $(btnMinus).addClass('circle_not-active') }
}

// Вид списка после кликов
    // Отображение количества гостей
    // и визуальной деактивации кнопок

// Кнопки списков
$(btnMinus1).click (function view(){ minus (amount1, amount2, amount3, btnMinus1) });
$(btnPlus1).click (function view(){ plus (amount1, amount2, amount3, btnMinus1) });

$(btnMinus2).click (function view(){ minus (amount2, amount1, amount3, btnMinus2) });
$(btnPlus2).click (function view(){ plus (amount2, amount1, amount3, btnMinus2) });

$(btnMinus3).click (function view(){ minus (amount3, amount1, amount2, btnMinus3) });
$(btnPlus3).click (function view(){ plus (amount3, amount1, amount2, btnMinus3) });

// Реализация кнопки '-'
function minus (amount_current, amount_next2, amount_next3, btnMinus){
    var value = parseInt($(amount_current).text());

    if (value > 1) {
        $(amount_current).text(function() {return value - 1;});
        if ($(btnMinus).hasClass('circle_not-active')) {
            $(btnMinus).removeClass('circle_not-active');
        }
    }
    else if (value == 1){
        $(amount_current).text(function() {return value - 1;});
        if (!$(btnMinus).hasClass("circle_not-active")) {
            $(btnMinus).addClass('circle_not-active');
        }
    }

    totalAmount(parseInt($(amount_current).text()), parseInt($(amount_next2).text()), parseInt($(amount_next3).text()))
}

// Реализация кнопки '+'
function plus (amount_current, amount_next2, amount_next3, btnMinus){
    var value = parseInt($(amount_current).text());
    $(amount_current).text(function() {return value + 1;});
      
    if ($(btnMinus).hasClass("circle_not-active")) {
        $(btnMinus).removeClass('circle_not-active')
    }

    totalAmount(parseInt($(amount_current).text()), parseInt($(amount_next2).text()), parseInt($(amount_next3).text()))
}

// Функция вывода общей суммы гостей (число + слово)
function totalAmount(sum1, sum2, sum3) {
    $(dropdown + ' p').text(function() {
        var totalAmount = totalAmountNum(sum1, sum2, sum3),
            allGuests = theGuests(totalAmount);
        return totalAmount + allGuests;
    })
}
// Функция подсчета общей суммы гостей (только число)
function totalAmountNum(sum1, sum2, sum3) {
        var totalAmount = sum1 + sum2 + sum3;
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