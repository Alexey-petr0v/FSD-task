
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
current_last_date.setDate(1); // Смена даты на 1 число для дальнейшего верного переключения месяца
current_last_date.setMonth(current_last_date.getMonth() + 1); // Переключить месяц на следующий
current_last_date.setDate(0); // 1 - последнее число предыдущего месяца
var current_last_date_full = current_last_date.getDate() + '.' + current_last_date.getMonth() + '.' + current_last_date.getFullYear();

// Следующий месяц: первый день
let next_first_date = new Date();
next_first_date.setHours(0, 0, 0, 0);
next_first_date.setDate(1);
next_first_date.setMonth(current_last_date.getMonth() + 1);
var next_first_date_full = next_first_date.getDate() + '.' + next_first_date.getMonth() + '.' + next_first_date.getFullYear();

// Предыдущий месяц: первый день
let prev_first_date = new Date();
prev_first_date.setHours(0, 0, 0, 0);
prev_first_date.setDate(1);
prev_first_date.setMonth(current_last_date.getMonth());
var prev_first_date_full = prev_first_date.getDate() + '.' + prev_first_date.getMonth() + '.' + prev_first_date.getFullYear();
//console.log("prev_first_date_full: "+prev_first_date_full);


// Текущий месяц: понедельник
let current_monday_date = addCurrentMonday (current_first_date); // Динамическая дата итерации
//console.log("current_monday_date: "+current_monday_date.getDate() + '.' + current_monday_date.getMonth() + '.' + current_monday_date.getFullYear());

// Предыдущий месяц: воскресенье
let current_sunday_date = addCurrentSunday (current_first_date); // Динамическая дата итерации
//console.log("current_monday_date: "+current_sunday_date.getDate() + '.' + current_sunday_date.getMonth() + '.' + current_sunday_date.getFullYear());


var veryfirst_ID = 0,          // Переменная для ID самой дальней недели prev
    latest_ID = -1,             // Переменная для ID самой дальней недели next
    first_ID = veryfirst_ID;    // Переменная для ID самой ближайшей недели prev
    last_ID = latest_ID,        // Переменная для ID самой ближайшей недели next
    week = "none";                       // Переменная для результатов выполнения функции addWeek()

// Добавление недель текущего месяца
while (week != "firstnext") { // Пока не будет найдено первое число след месяца
    latest_ID++; // Увеличть ID недели на 1
    week = addWeek(latest_ID,"right",prev_first_date_full,next_first_date_full); // Добавить новую неделю
}
// ID ближайшей недели next = ID дальней недели next
last_ID = latest_ID;

// Первичная установка названия месяца в заголовок
addTitleMonth(current_first_date.getMonth());
/*
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
*/


// -------------------------------------------------------------------------------- Функция добавления недель -------------------------------------------------------------------------------- //

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
            current_iter_date = current_sunday_date.getDate() + '.' + current_sunday_date.getMonth() + '.' + current_sunday_date.getFullYear();
            if (current_iter_date == firstprevdatefull) {
                result = "firstprev";
                console.log("prev!");
            }
            else if (current_iter_date == firstnextdatefull) {
                result = "firstnext";
            }

            $("#"+ID).prepend("<div data-date='"+current_sunday_date.getDate()+"' class='date__number'><p>" + current_sunday_date.getDate() + "</p></div>");
            current_sunday_date.setDate(current_sunday_date.getDate()-1);
        }
        else {
            // Сравнение текущей даты итерации и последней даты на совпадение
            current_iter_date = current_monday_date.getDate() + '.' + current_monday_date.getMonth() + '.' + current_monday_date.getFullYear();
            if (current_iter_date == firstprevdatefull) {
                result = "firstprev";
                //console.log("prev!");
            }
            else if (current_iter_date == firstnextdatefull) { result = "firstnext" }

            $("#"+ID).append("<div data-date='"+current_monday_date.getDate()+"' class='date__number'><p>" + current_monday_date.getDate() + "</p></div>");
            current_monday_date.setDate(current_monday_date.getDate()+1);
        }
    }
    return result;
}


// --------------------------------------------------------------------------------  Функция вывода недель -------------------------------------------------------------------------------- //

function viewWeek(ID,button,firstprevdatefull,firstnextdatefull) {
    var result = "none";
    var current_iter_date;
    // Добавление дней недели
    for (var i = 0; i < 7; i++) {
        // Добавление числа
        // Прибавка к след числу
        if (button == "left") {
            // Сравнение текущей даты итерации и последней даты на совпадение
            current_iter_date = current_monday_date.getDate() + '.' + current_monday_date.getMonth() + '.' + current_monday_date.getFullYear();
            if (current_iter_date == firstprevdatefull) {
                result = "firstprev";
                //console.log("prev!");
            }
            else if (current_iter_date == firstnextdatefull) {
                result = "firstnext";
                //console.log("next!");
            }
            else {
                //console.log("L");
            }

            $("#"+ID).css("display","flex");
            current_monday_date.setDate(current_monday_date.getDate()-1);
        }
        else {
            // Сравнение текущей даты итерации и последней даты на совпадение
            current_iter_date = current_monday_date.getDate() + '.' + current_monday_date.getMonth() + '.' + current_monday_date.getFullYear();
            if (current_iter_date == firstprevdatefull) {
                result = "firstprev";
                //console.log("prev!");
            }
            else if (current_iter_date == firstnextdatefull) {
                result = "firstnext";
                //console.log("next!");
            }
            else {
                //console.log("R");
            }

            $("#"+ID).css("display","flex");
            current_monday_date.setDate(current_monday_date.getDate()+1);
        }
    }
    return result;
}



var first_click = true;
// -------------------------------------------------------------------------------- Обработчик кнопки 'стрелка влево' -------------------------------------------------------------------------------- //
$('.date__arrow-left').click (function view(){
    //console.log("CLICK_LEFT");

    // Скрытие всех недель по ID
    for (var ID = veryfirst_ID; ID <= latest_ID; ID++ ) {
        $("#"+ID).css("display","none");
    }

    //console.log("STEP1: "+$("#"+(first_ID-1)).eq(0).attr("id"));
    //console.log("first_ID: "+first_ID);
    // ---------- ВЫВОД И ДОБАВЛЕНИЕ НЕДЕЛИ ---------- //
    if ($("#"+(first_ID-1)).eq(0).attr("id") != undefined) { // Если неделя уже создана
    // -- Вывод недели
        //console.log("STEP2: NO")

        // Установка названия месяца в заголовок
        current_first_date.setMonth(current_first_date.getMonth() - 1);
        addTitleMonth(current_first_date.getMonth());
        
        // Переключить месяц на следующий
        next_first_date.setMonth(next_first_date.getMonth() - 1);
        next_first_date_full = next_first_date.getDate() + '.' + next_first_date.getMonth() + '.' + next_first_date.getFullYear();
        /*prev_first_date.setMonth(prev_first_date.getMonth() + 1);
        prev_first_date_full = prev_first_date.getDate() + '.' + prev_first_date.getMonth() + '.' + prev_first_date.getFullYear();*/

        // Пока не будет найдено первое число след месяца
        week = "none";
        while (week != "firstprev") {
            first_ID--;
            last_ID--; // Увеличть ID недели на 1
            week = viewWeek(first_ID,"left",prev_first_date_full,next_first_date_full); // Добавить новую неделю
            //console.log(1);
        }

    } else {
        //console.log("STEP2: YES");
        // -- Добавление недели
            // Если в последней неделе присутствует число 1, то вновь отобразить неделю
        for (var i = 0; i < 7; i++){
            var if_1 = $("#"+first_ID).children().eq(i).attr("data-date") > 27,
                if_2 = $("#"+first_ID).children().eq(i).attr("data-date") < 32;
            if ((if_1)&&(if_2)) {
                $("#"+first_ID).css("display","flex");
            }
        }

        // Установка названия месяца в заголовок
        current_first_date.setMonth(current_first_date.getMonth() - 1);
        addTitleMonth(current_first_date.getMonth());

        // Переключить месяц на следующий
        prev_first_date.setMonth(prev_first_date.getMonth() - 1);
        prev_first_date_full = prev_first_date.getDate() + '.' + prev_first_date.getMonth() + '.' + prev_first_date.getFullYear();
        /*next_first_date.setMonth(next_first_date.getMonth() - 1);
        next_first_date_full = next_first_date.getDate() + '.' + next_first_date.getMonth() + '.' + next_first_date.getFullYear();*/

        // Пока не будет найдено первое число след месяца
        week = "none";
        while (week != "firstprev") {
            last_ID--;
            first_ID--; // Уменьшить ID недели на 1
            //console.log("first_ID-left: "+first_ID);
            week = addWeek(first_ID,"left",prev_first_date_full,next_first_date_full); // Добавить новую неделю
        }
        if (first_ID < veryfirst_ID) {
            veryfirst_ID = first_ID
        }
    }



    
    /*
    console.log("-----LEFT-----");
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
    console.log("--------------");
    */
});

// -------------------------------------------------------------------------------- Обработчик кнопки 'стрелка вправо' -------------------------------------------------------------------------------- //
$('.date__arrow-right').click (function view(){

    // Скрытие всех недель по ID
    for (var ID = veryfirst_ID; ID <= latest_ID; ID++) {
        $("#"+ID).css("display","none");
    }

    // ---------- ВЫВОД И ДОБАВЛЕНИЕ НЕДЕЛИ ---------- //
    if ($("#"+(last_ID+1)).eq(0).attr("id") != undefined) { // Если неделя уже создана
    // -- Вывод недели
        // Установка названия месяца в заголовок
        current_first_date.setMonth(current_first_date.getMonth() + 1);
        addTitleMonth(current_first_date.getMonth());
        
        // Переключить месяц на следующий
        next_first_date.setMonth(next_first_date.getMonth() + 1);
        next_first_date_full = next_first_date.getDate() + '.' + next_first_date.getMonth() + '.' + next_first_date.getFullYear();
        /*prev_first_date.setMonth(prev_first_date.getMonth() + 1);
        prev_first_date_full = prev_first_date.getDate() + '.' + prev_first_date.getMonth() + '.' + prev_first_date.getFullYear();*/

        // Пока не будет найдено первое число след месяца
        week = "none";
        while (week != "firstnext") {
            first_ID++;
            last_ID++; // Увеличть ID недели на 1
            week = viewWeek(last_ID,"right",prev_first_date_full,next_first_date_full); // Вывести новую неделю
        }
    } else {
    // -- Добавление недели
        // Если в последней неделе присутствует число 1, то вновь отобразить неделю
        for (var i = 0; i < 7; i++){
            if ($("#"+last_ID).children().eq(i).attr("data-date") == '1') {
                $("#"+last_ID).css("display","flex");
            }
        }
        // Установка названия месяца в заголовок
        current_first_date.setMonth(current_first_date.getMonth() + 1);
        addTitleMonth(current_first_date.getMonth());

        // Переключить месяц на следующий
        next_first_date.setMonth(next_first_date.getMonth() + 1);
        next_first_date_full = next_first_date.getDate() + '.' + next_first_date.getMonth() + '.' + next_first_date.getFullYear();

        // Пока не будет найдено первое число след месяца
        week = "none";
        while (week != "firstnext") {
            first_ID++;
            last_ID++; // Увеличть ID недели на 1
            //console.log("first_ID-right: "+first_ID);
            week = addWeek(last_ID,"right",prev_first_date_full,next_first_date_full); // Добавить новую неделю
        }
        if (last_ID > latest_ID) {
            latest_ID = last_ID
        }
    }

    /*
    console.log("-----RIGHT-----");
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
    console.log("--------------");
    */
});


// --------------------------------------------------------------------------------  Функция вывода названий месяцев -------------------------------------------------------------------------------- //

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




// Функция вычисления понедельника первой недели
function addCurrentMonday (date) {
    var subtractor = date.getDay(); // Вычитатель
    let monday = new Date();
    monday.setHours(0, 0, 0, 0);
    monday.setDate(date.getDate());
    monday.setDate(monday.getDate() - subtractor + 1); // (+1, тк неделя стартует с вск, а нужно с пн)
    return monday
}

// Функция вычисления воскресенья первой недели
function addCurrentSunday (date) {
    var subtractor = date.getDay(); // Вычитатель
    let monday = new Date();
    monday.setHours(0, 0, 0, 0);
    monday.setDate(date.getDate());
    monday.setDate(monday.getDate() - subtractor); 
    return monday
}