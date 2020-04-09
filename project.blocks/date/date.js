

var toggle_month = 0, //0 - текущий месяц
    check_status = false; //флаг: выбраны ли обе даты

startCal(toggle_month);

// Обработчик кнопки 'стрелка влево'
$('.date__arrow-left').click (function view(){
   toggle_month -= 1;
   startCal(toggle_month);
});

// Обработчик кнопки 'стрелка вправо'
$('.date__arrow-right').click (function view(){
   toggle_month += 1;
   startCal(toggle_month);
});

// Обработчик нажатия на даты
$('.date__number').click (function view(){
    // Если совершено < 2 нажатий
    if ($(".date__number_checked").length < 2) {
        $(this).toggleClass("date__number_checked");
    } else {
            $(this).removeClass("date__number_checked");
    }
    // Если совершены 2 нажатия
    if (($(".date__number_checked").length == 2)&&(!check_status)) {
        check_status = true;

        // one - выделение более ранней даты
        var one = $($(".date__number_checked").eq(0)).index();
        // two - выделение более поздней даты
        var two = $($(".date__number_checked").eq(1)).index();
        console.log(two);

        // Вывод выделения
        for (var m = one; m <= two; m++){
            var position = $($($(".date__number").eq(m))).position();
            $( ".date__day-of-the-week" ).append( "<div class='date__from-and-to' style='left:"+(position.left)+"px;top:"+position.top+"px'></div>" );
        }
        // Вывод корректировка выделения в начале и в конце
        $($(".date__from-and-to").eq(0)).addClass("date__from-and-to_first");
        $($(".date__from-and-to").eq(-1)).addClass("date__from-and-to_last");
    }

    else {
        check_status = false;
        $(".date__from-and-to").remove();
    }
});



function startCal(toggle_month) {
    
    $(".date__number").remove();

    // Текущий день месяца
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    console.log('Сегодняшняя дата:' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear());

    // Первый день месяца
    let first_date = new Date();
    first_date.setHours(0, 0, 0, 0);
    first_date.setMonth(first_date.getMonth() + toggle_month);
    first_date.setDate(1);
    console.log('Первый день месяца:' + first_date.getDate() + '.' + (first_date.getMonth() + 1) + '.' + first_date.getFullYear());

    // Последний день месяца
    let last_date = new Date();
    last_date.setHours(0, 0, 0, 0);
    last_date.setMonth(last_date.getMonth() + toggle_month);
    last_date.setMonth(last_date.getMonth() + 1);
    last_date.setDate(0);
    console.log('Последний день месяца:' + last_date.getDate() + '.' + (last_date.getMonth() + 1) + '.' + last_date.getFullYear());


    let prev_month_date = new Date();
    prev_month_date.setHours(0, 0, 0, 0);
    prev_month_date.setMonth(prev_month_date.getMonth() + toggle_month);
    prev_month_date.setDate(0);
    let prev_date = prev_month_date.getDate();


    $( ".date__cal" ).append( "<div class='date__day-of-the-week'></div>" );

    // Печать чисел прошлого месяца (черв числ теку мес != 1)
    if (first_date.getDay() !== 0) {
        prev_date = prev_date - first_date.getDay();
        for (var y = 0; y < first_date.getDay(); y++){
            prev_date++;
            $( ".date__day-of-the-week" ).append( "<div class='date__number'>" + prev_date + "</div>" );
        }
    }
    else {
        prev_date = prev_date - 7;
        for (var y = 0; y < 7; y++){
            prev_date++;
            $( ".date__day-of-the-week" ).append( "<div class='date__number'>" + prev_date + "</div>" );
        }

    }

    // Печать всех чисел данного месяца
    for (var y = 1; y <= last_date.getDate(); y++) {
        if ((y == date.getDate())&&(toggle_month == 0)){
            $( ".date__day-of-the-week" ).append( "<div class='date__number date__number_current'>"+y+"</div>" );
        } else {
            $( ".date__day-of-the-week" ).append( "<div class='date__number'>"+y+"</div>" );
        }
    }

    // Печать чисел следующего месяца
    var next_date = 1;
    for (var y = last_date.getDay(); y < 7; y++){
        $(".date__day-of-the-week").append( "<div class='date__number'>" + next_date + "</div>" );
        next_date++;
    }

    // Сокрытие первого элемента. Т.к. подсчет нужен с пн, а не с вс
    if ( $(".date__number").length != 35 ) {
        if (first_date.getDate() != $($(".date__number").eq(0)).text()){
            $($(".date__number").eq(0)).attr("style", "display: none");
        }
    }

    // Вывод названий месяцев
    var title_month;
    switch(first_date.getMonth()){
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

