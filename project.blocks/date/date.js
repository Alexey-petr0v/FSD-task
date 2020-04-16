
// prev     - предыдущий месяц
// current  - текущий месяц
// next     - слудующий месяц

// iter     - день итерации
// first    - первый день месяца
// last     - последний день месяца

// monday   - понедельник
// sunday   - воскресенье

// date     - дата
// full     - обозначение строки содержащей дату в формате 01.01.2000


// Текущий месяц: первый день
let current_first_date = new Date();
current_first_date.setHours(0, 0, 0, 0); //Установка часов, минут, сеунд и миллисекунд
current_first_date.setDate(1); // 1 - первое число месяца
var current_first_date_full = current_first_date.getDate() + '.' + current_first_date.getMonth() + '.' + current_first_date.getFullYear(); // Дата в формате: 11.1.2003

// Текущий месяц: последний день
let current_last_date = new Date();
current_last_date.setHours(0, 0, 0, 0);
current_last_date.setMonth(current_last_date.getMonth() + 1); // Переключить месяц на следующий
current_last_date.setDate(0); // 1 - первое число предыдущего месяца
var current_last_date_full = current_last_date.getDate() + '.' + current_last_date.getMonth() + '.' + current_last_date.getFullYear();

// Следующий месяц: первый день
let next_first_date = new Date();
next_first_date.setHours(0, 0, 0, 0);
next_first_date.setMonth(current_last_date.getMonth() + 1);
next_first_date.setDate(1);
var next_first_date_full = next_first_date.getDate() + '.' + next_first_date.getMonth() + '.' + next_first_date.getFullYear();

// Предыдущий месяц: первый день
let prev_first_date = new Date();
prev_first_date.setHours(0, 0, 0, 0);
prev_first_date.setMonth(current_last_date.getMonth());
prev_first_date.setDate(1);
var prev_first_date_full = prev_first_date.getDate() + '.' + prev_first_date.getMonth() + '.' + prev_first_date.getFullYear();
console.log("prev_first_date_full: "+prev_first_date_full);

// Вычисление первого дня первой недели (+1, тк неделя стартует с вск, а нужно с пн)
var subtractor = current_first_date.getDay(); // Вычитатель

// Текущий месяц: понедельник
let current_monday_date = new Date(); // Динамическая дата итерации
current_monday_date.setHours(0, 0, 0, 0);
current_monday_date.setDate(current_first_date.getDate());
current_monday_date.setDate(current_monday_date.getDate() - subtractor + 1); 

// Следующий месяц: воскресенье
let next_sunday_date = new Date(); // Динамическая дата итерации
next_sunday_date.setHours(0, 0, 0, 0);
next_sunday_date.setDate(current_first_date.getDate());
next_sunday_date.setDate(next_sunday_date.getDate() - subtractor); 

var veryfirst_ID = -1,  // Переменная для ID самой дальней недели prev
    latest_ID = -1,     // Переменная для ID самой дальней недели next
    first_ID = -1;       // Переменная для ID самой ближайшей недели prev
    last_ID = -1,       // Переменная для ID самой ближайшей недели next
    week;               // Переменная для результатов выполнения функции addWeek()

// Добавление недель текущего месяца
while (week != "firstnext") { // Пока не будет найдено первое число след месяца
    latest_ID++; // Увеличть ID недели на 1
    var week = addWeek(latest_ID,"right",prev_first_date_full,next_first_date_full); // Добавить новую неделю
}
// ID ближайшей недели next = ID дальней недели next
last_ID = latest_ID;

// Первичная установка названия месяца в заголовок
addTitleMonth(current_first_date.getMonth());

console.log("-----START-----");
console.log("veryfirst_ID "+veryfirst_ID);
console.log("latest_ID "+latest_ID);
console.log("first_ID "+first_ID);
console.log("last_ID "+last_ID);
console.log("prev_first_date.getMonth() "+prev_first_date.getMonth());
console.log("prev_first_date.getDate() "+prev_first_date.getDate());
console.log("prev_first_date_full "+prev_first_date_full);
console.log("next_first_date.getMonth() "+next_first_date.getMonth());
console.log("next_first_date.getDate() "+next_first_date.getDate());
console.log("next_first_date_full "+next_first_date_full);
console.log("---------------");

// Функция добавления недель
function addWeek(ID,button,firstprevdatefull,firstnextdatefull) {
    var result = "none";
    var current_iter_date;
    // Добавление недели
        if (button == "left") {
            $(".date__cal").prepend("<div class='date__week' id='"+ID+"'></div>");
        }
        else {
            $(".date__cal").append("<div class='date__week' id='"+ID+"'></div>");
        }
    // Добавление дней недели
    for (var i = 0; i < 7; i++) {
        // Добавление числа
        // Прибавка к след числу
        if (button == "left") {
            // Сравнение текущей даты итерации и последней даты на совпадение
            current_iter_date = next_sunday_date.getDate() + '.' + next_sunday_date.getMonth() + '.' + next_sunday_date.getFullYear();
            if (current_iter_date == firstprevdatefull) {
                result = "firstprev";
                console.log("prev!");
            }
            else if (current_iter_date == firstnextdatefull) {
                result = "firstnext";
            }

            $("#"+ID).prepend("<div data-date='"+next_sunday_date.getDate()+"' class='date__number'><p>" + next_sunday_date.getDate() + "</p></div>");
            next_sunday_date.setDate(next_sunday_date.getDate()-1);
        }
        else {
            // Сравнение текущей даты итерации и последней даты на совпадение
            current_iter_date = current_monday_date.getDate() + '.' + current_monday_date.getMonth() + '.' + current_monday_date.getFullYear();
            if (current_iter_date == firstprevdatefull) {
                result = "firstprev";
                console.log("prev!");
            }
            else if (current_iter_date == firstnextdatefull) { result = "firstnext" }

            $("#"+ID).append("<div data-date='"+current_monday_date.getDate()+"' class='date__number'><p>" + current_monday_date.getDate() + "</p></div>");
            current_monday_date.setDate(current_monday_date.getDate()+1);
        }
    }
    return result;
}

// Функция вывода недель
function viewWeek(ID,button,firstprevdatefull,firstnextdatefull) {
    var result = "none";
    var current_iter_date;
    // Добавление дней недели
    for (var i = 0; i < 7; i++) {
        // Добавление числа
        // Прибавка к след числу
        if (button == "left") {
        }
        else {
            // Сравнение текущей даты итерации и последней даты на совпадение
            current_iter_date = current_monday_date.getDate() + '.' + current_monday_date.getMonth() + '.' + current_monday_date.getFullYear();
            if (current_iter_date == firstprevdatefull) {
                result = "firstprev";
                console.log("prev!");
            }
            else if (current_iter_date == firstnextdatefull) { result = "firstnext" }

            $("#"+ID).css("display","flex");
            current_monday_date.setDate(current_monday_date.getDate()+1);
        }
    }
    return result;
}

var first_click = true;
                                                                        // <<<<<<<<<<<<<<< Обработчик кнопки 'стрелка влево'
$('.date__arrow-left').click (function view(){
    console.log("-----LEFT_1-----");
    console.log("veryfirst_ID "+veryfirst_ID);
    console.log("latest_ID "+latest_ID);
    console.log("first_ID "+first_ID);
    console.log("last_ID "+last_ID);
    console.log("prev_first_date.getMonth() "+prev_first_date.getMonth());
    console.log("prev_first_date.getDate() "+prev_first_date.getDate());
    console.log("prev_first_date_full "+prev_first_date_full);
    console.log("next_first_date.getMonth() "+next_first_date.getMonth());
    console.log("next_first_date.getDate() "+next_first_date.getDate());
    console.log("next_first_date_full "+next_first_date_full);
    console.log("----------------");
    
    latest_ID = veryfirst_ID;

    // Скрытие всех недель по ID
    for (var ID = veryfirst_ID; ID <= latest_ID; ID++ ) {
        $("#"+ID).css("display","none");
    }

    // Если в последней неделе присутствует число 1, то вновь отобразить неделю
    for (var i = 0; i < 7; i++){
        var if_1 = $("#"+first_ID).children().eq(i).attr("data-date") > 27,
            if_2 = $("#"+first_ID).children().eq(i).attr("data-date") < 32;
        if ((if_1)&&(if_2)) {
            $("#"+first_ID).css("display","flex");
        }
    }

    // Переключить месяц на следующий
    prev_first_date.setMonth(prev_first_date.getMonth() - 1);
    prev_first_date_full = prev_first_date.getDate() + '.' + prev_first_date.getMonth() + '.' + prev_first_date.getFullYear();

    // Установка названия месяца в заголовок
    addTitleMonth(prev_first_date.getMonth());

    // Пока не будет найдено первое число след месяца
    while (week != "firstprev") {
        var week = addWeek(veryfirst_ID,"left",prev_first_date_full,next_first_date_full); // Добавить новую неделю
        veryfirst_ID--; // Уменьшить ID недели на 1
    }
});


                                                                        // >>>>>>>>>>>>>>>> Обработчик кнопки 'стрелка вправо'
$('.date__arrow-right').click (function view(){
    console.log("-----RIGHT_1-----");
    console.log("veryfirst_ID "+veryfirst_ID);
    console.log("latest_ID "+latest_ID);
    console.log("first_ID "+first_ID);
    console.log("last_ID "+last_ID);
    console.log("prev_first_date.getMonth() "+prev_first_date.getMonth());
    console.log("prev_first_date.getDate() "+prev_first_date.getDate());
    console.log("prev_first_date_full "+prev_first_date_full);
    console.log("next_first_date.getMonth() "+next_first_date.getMonth());
    console.log("next_first_date.getDate() "+next_first_date.getDate());
    console.log("next_first_date_full "+next_first_date_full);
    console.log("----------------");

    // Скрытие всех недель по ID
    for (var ID = veryfirst_ID; ID <= latest_ID; ID++) {
        $("#"+ID).css("display","none");
    }

    if ($("#"+(latest_ID+1)).eq(0).attr("id") != undefined) { // Если неделя уже создана
    // -- Вывод недели
        // Установка названия месяца в заголовок
        addTitleMonth(next_first_date.getMonth());
        // Переключить месяц на следующий
        next_first_date.setMonth(next_first_date.getMonth() + 1);
        next_first_date_full = next_first_date.getDate() + '.' + next_first_date.getMonth() + '.' + next_first_date.getFullYear();

        // Пока не будет найдено первое число след месяца
        while (week != "firstnext") {
            latest_ID++; // Увеличть ID недели на 1
            var week = viewWeek(latest_ID,"right",prev_first_date_full,next_first_date_full); // Вывести новую неделю
        }
    } else {
    // -- Добавление недели
        // Если в последней неделе присутствует число 1, то вновь отобразить неделю
        for (var i = 0; i < 7; i++){
            if ($("#"+latest_ID).children().eq(i).attr("data-date") == '1') {
                $("#"+latest_ID).css("display","flex");
            }
        }
        // Установка названия месяца в заголовок
        addTitleMonth(next_first_date.getMonth());
        // Переключить месяц на следующий
        next_first_date.setMonth(next_first_date.getMonth() + 1);
        next_first_date_full = next_first_date.getDate() + '.' + next_first_date.getMonth() + '.' + next_first_date.getFullYear();

        // Пока не будет найдено первое число след месяца
        while (week != "firstnext") {
            latest_ID++; // Увеличть ID недели на 1
            var week = addWeek(latest_ID,"right",prev_first_date_full,next_first_date_full); // Добавить новую неделю
        }
    }
});


// Функция вывода названий месяцев
function addTitleMonth(number_month) {
    var title_month;
    switch(number_month){
        case 0: title_month = "Январь"; break;
        case 1: title_month = "Февраль"; break;
        case 2: title_month = "Март"; break;
        case 3: title_month = "Апрель"; break;
        case 4: title_month = "Май"; break;
        case 5: title_month = "Июнь"; break;
        case 6: title_month = "Июль"; break;
        case 7: title_month = "Август"; break;
        case 8: title_month = "Сентябрь"; break;
        case 9: title_month = "Октябрь"; break;
        case 10: title_month = "Ноябрь"; break;
        case 11: title_month = "Декабрь"; break;                   
    }
    $(".date__title p").text(title_month);
}