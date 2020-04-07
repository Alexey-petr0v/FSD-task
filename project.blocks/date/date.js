
 startCal();

 // Обработчик кнопки 'стрелка влево'
$('.date__arrow-left').click (function view(){
    startCal();
});

// Обработчик кнопки 'стрелка вправо'
$('.date__arrow-right').click (function view(){
   startCal();
});
 
 
 function startCal() {

    // Текущий день месяца
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    console.log('Сегодняшняя дата:' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear());
    
    // Первый день месяца
    let first_date = new Date();
    first_date.setHours(0, 0, 0, 0);
    first_date.setDate(1);
    console.log('Первый день месяца:' + first_date.getDate() + '.' + (first_date.getMonth() + 1) + '.' + first_date.getFullYear());
    
    // Последний день месяца
    let last_date = new Date();
    last_date.setHours(0, 0, 0, 0);
    last_date.setMonth(last_date.getMonth() + 1);
    last_date.setDate(0);
    console.log('Последний день месяца:' + last_date.getDate() + '.' + (last_date.getMonth() + 1) + '.' + last_date.getFullYear());
    
    // Тестовый вывод даты пред месяца
    /*
    let prev_month_date = new Date();
    prev_month_date.setDate(0);
    console.log('Тест даты пред месяца:' + prev_month_date.getDate() + '.' + (prev_month_date.getMonth() + 1) + '.' + prev_month_date.getFullYear());
    */
    console.log('День недели текущий:' + date.getDay());
    console.log('День недели первого дня месяца:' + first_date.getDay());
    
    
    
    // Цикл: от 0 до дня недели первого дня месяца
    /*
    for (i = 0; i < first_date.getDay(); i++){
        $($(".date__number").eq(i)).text(i);
    }
    */
    
    let prev_month_date = new Date();
    prev_month_date.setHours(0, 0, 0, 0);
    prev_month_date.setDate(0);
    let prev_date = prev_month_date.getDate();
    prev_date -= first_date.getDay();
    console.log('Тест даты пред месяца:' + prev_month_date.getDate() + '.' + (prev_month_date.getMonth() + 1) + '.' + prev_month_date.getFullYear());
    
    for (i = 0; i < first_date.getDay(); i++){
        prev_date++;
        $($(".date__number").eq(i)).text(prev_date);
    }
    
    var i = first_date.getDay();
    var date_month = 1;
    // Цикл: от первого дня месяца до последнего .length
    
    while (prev_month_date.getTime() < last_date.getTime()) {
        prev_month_date.setDate(prev_month_date.getDate()+1);
        $($(".date__number").eq(i)).text(date_month);
        // Выделение текущей даты
        if (prev_month_date.getTime() == date.getTime()){
            $($(".date__number").eq(i)).addClass( "date__number_current" );
        }
        date_month++;
        i++;
    }

    if ( $(".date__number").length != 35 ) {
        //$($(".date__number").eq(0)).detach();
        $($(".date__number").eq(0)).// ЗДЕСЬ ЗАКОНЧИЛ надо дисплей попробовать
        $(".date__number").eq(4).text('00');
     }
    
    for (var x = i; x < $(".date__number").length; x++) {
        console.log(1);
        prev_month_date.setDate(prev_month_date.getDate()+1);
        $($(".date__number").eq(x)).text(prev_month_date.getDate());
    }
    
    
    // Удаление 1 элемента. Т.к. подсчет нужен с пн, а не с вс
    

    
         
    
    
    /*
    console.log(prev_date);
    console.log(first_date.getTime());
    console.log(date.getTime());
    console.log(last_date.getTime());
    */
    /* --- ОСНОВНЫЕ ШАГИ --- */
    // ! Вывод дат предыдущего месяца
    // ! Вывод дат этого месяца до текущей даты
    // ! Вывод текущей даты
    // ! Вывод дат этого месяца после текущей даты и до последней даты
    // ! Вывод дат следующего месяца
    
    
    /* --- ВСЕ ШАГИ --- */
    // Определить текущую дату
    // Определить первую дату
    // Определить последнюю дату
    // Условие: если день недели первой даты не == 1, то
    //      цикл от 1 до 
    // ! Вывод дат предыдущего месяца
    // ! Вывод дат этого месяца до текущей даты
    // ! Вывод текущей даты
    // ! Вывод дат этого месяца после текущей даты и до последней даты
    // ! Вывод дат следующего месяца
    
    // Цикл: от 0 по 4 (5 недель месяца)
    //      Цикл от 0 по 6 (7 дней недели)
    // подумать на выводом от воскресенья
     
 }

 