
var quantity_week_minus = 0,
    quantity_week_plus = 0,
    current = 0;

// Первый день месяца
let first_date = new Date();
first_date.setHours(0, 0, 0, 0); //Установка часов, минут, сеунд и миллисекунд
first_date.setDate(1); // 1 - первое число месяца
first_date_full = first_date.getDate() + '.' + first_date.getMonth() + '.' + first_date.getFullYear(); // Дата в формате: 11.1.2003

// Последний день месяца
let last_date = new Date();
last_date.setHours(0, 0, 0, 0);
last_date.setMonth(last_date.getMonth() + 1); // Переключить месяц на следующий
last_date.setDate(0); // 1 - первое число предыдущего месяца
last_date_full = last_date.getDate() + '.' + last_date.getMonth() + '.' + last_date.getFullYear();

// Первый день след месяца
let first_next_date = new Date();
first_next_date.setHours(0, 0, 0, 0);
first_next_date.setMonth(last_date.getMonth() + 1);
first_next_date.setDate(1);
first_next_date_full = first_next_date.getDate() + '.' + first_next_date.getMonth() + '.' + first_next_date.getFullYear();

// Первый день предыд месяца
let first_prev_date = new Date();
first_prev_date.setHours(0, 0, 0, 0);
first_prev_date.setMonth(last_date.getMonth() - 1);
first_prev_date.setDate(1);
first_prev_date_full = first_prev_date.getDate() + '.' + first_prev_date.getMonth() + '.' + first_prev_date.getFullYear();
console.log("first_prev_date_full: "+first_prev_date_full);
// Динамическая дата итерации
let counter_date = new Date();
counter_date.setHours(0, 0, 0, 0);

// Вычисление первого дня первой недели (+1, тк неделя стартует с вск, а нужно с пн)
var subtractor = first_date.getDay(); // Вычитатель
counter_date.setDate(first_date.getDate());
counter_date.setDate(counter_date.getDate() - subtractor + 1); 

// Вывод недель текущего месяца
var last_ID = -1, week, first_ID = 0;
while (week != "firstnext") { // Пока не будет найдено первое число след месяца
    last_ID++; // Увеличть ID недели на 1
    var week = addWeek(last_ID,"right",first_prev_date_full,first_next_date_full); // Добавить новую неделю
}

// Первичная установка названия месяца в заголовок
addTitleMonth(first_date.getMonth());

// Функция вывода недель
function addWeek(ID,button,firstprevdatefull,firstnextdatefull) {
    var result = "none";
    var current_date;
    // Вывод недели
        if (button == "left") {
            $(".date__cal").prepend("<div class='date__week' id='"+ID+"'></div>");
        }
        else {
            $(".date__cal").append("<div class='date__week' id='"+ID+"'></div>");
        }
    // Вывод дней недели
    for (var i = 0; i < 7; i++) {
        // Сравнение текущей даты итерации и последней даты на совпадение
        current_date = counter_date.getDate() + '.' + counter_date.getMonth() + '.' + counter_date.getFullYear();
        //console.log("current_date: "+current_date);
        //console.log("firstprevdatefull: "+firstprevdatefull);
        if (current_date == firstprevdatefull) {
            result = "firstprev";
            console.log("prev!");
            //console.log(current_date);
        }
        else if (current_date == firstnextdatefull) { result = "firstnext" }
        // Вывод числа
        // Прибавка к след числу
        if (button == "left") {
            $("#"+ID).prepend("<div data-date='"+counter_date.getDate()+"' class='date__number'><p>" + counter_date.getDate() + "</p></div>");
            counter_date.setDate(counter_date.getDate()-1);
        }
        else {
            $("#"+ID).append("<div data-date='"+counter_date.getDate()+"' class='date__number'><p>" + counter_date.getDate() + "</p></div>");
            counter_date.setDate(counter_date.getDate()+1);
        }
    }
    //console.log(ID);
    return result;
}

// Обработчик кнопки 'стрелка влево'
$('.date__arrow-left').click (function view(){
    
    counter_date.setMonth(counter_date.getMonth()-1);
    counter_date.setDate(-2);

    // Скрытие всех недель по ID
    /*
    for (var ID = first_ID; ID <= last_ID; ID++ ) {
        $("#"+ID).css("display","none");
    }*/
    /*
    // Если в последней неделе присутствует число 1, то вновь отобразить неделю
    for (var i = 0; i < 7; i++){
        if ($("#"+last_ID).children().eq(i).attr("data-date") == '1') {
            $("#"+last_ID).css("display","flex");
        }
    }*/
    // Установка названия месяца в заголовок
    //console.log(first_prev_date_full);
    addTitleMonth(first_prev_date.getMonth());
    // Переключить месяц на следующий
    first_prev_date_full = first_prev_date.getDate() + '.' + first_prev_date.getMonth() + '.' + first_prev_date.getFullYear();
    // Пока не будет найдено первое число след месяца
    first_ID--;
    
    console.log(first_prev_date_full);
    while (week != "firstprev") {
        //console.log(week);
        var week = addWeek(first_ID,"left",first_prev_date_full,first_next_date_full); // Добавить новую неделю
        first_ID--; // Уменьшить ID недели на 1
        //console.log(week)
    }
});



// Обработчик кнопки 'стрелка вправо'
$('.date__arrow-right').click (function view(){
    // Скрытие всех недель по ID
    for (var ID = first_ID; ID <= last_ID; ID++ ) {
        $("#"+ID).css("display","none");
    }
    // Если в последней неделе присутствует число 1, то вновь отобразить неделю
    for (var i = 0; i < 7; i++){
        if ($("#"+last_ID).children().eq(i).attr("data-date") == '1') {
            $("#"+last_ID).css("display","flex");
        }
    }
    // Установка названия месяца в заголовок
    addTitleMonth(first_next_date.getMonth());
    // Переключить месяц на следующий
    first_next_date.setMonth(first_next_date.getMonth() + 1);
    first_next_date_full = first_next_date.getDate() + '.' + first_next_date.getMonth() + '.' + first_next_date.getFullYear();
    // Пока не будет найдено первое число след месяца
    while (week != "firstnext") {
        last_ID++; // Увеличть ID недели на 1
        var week = addWeek(last_ID,"right",first_prev_date_full,first_next_date_full); // Добавить новую неделю
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