import {getID} from '../../pages/scripts/generate_ID.js'
let radnom_set = new Set();

// --------------- Date ---------------

class Date_cal {
    constructor(id) {
        this.id = "#" + id + " "; // id блока
        this.addButtons(); // Активация кнопок
        this.current_now_date = new Date();         // Сегодняшний
        this.current_now_date.setHours(0, 0, 0, 0); // день
        this.amount_checked_elements = 2 // Количество выделенных дат
                                         // (по умолчанию: 19 и 23 числа текущего месяца)
        this.addFirstAndLastDates(this.current_now_date.getFullYear(), this.current_now_date.getMonth(), 19, this.current_now_date.getFullYear(), this.current_now_date.getMonth(), 23) // Задание первых выделенных дат

        this.addDatesToBuffer() // Задание дат в div-буффер
        this.addDatesToInput() // Задание дат в input

        this.first_here_flag = true // Установка 'here' флагов как true, т.к.
        this.last_here_flag = true  // изначально на странице есть 2 отметки
                                    // обозначают наличие отметок на датах
        this.editAccentFlags(false, false)  // Установка 'accent' флагов как false, т.к.
                                            // след. переключение месяца (при отсутствии отметок)
                                            // должно выделить(accent) все дни месяца
        this.current_first_date = new Date();           // Первый день
        this.current_first_date.setDate(1);             // текущего
        this.current_first_date.setHours(0, 0, 0, 0);   // месяца
        let iter_date = this.createIterDate(new Date(), this.current_first_date.getDate()) // Создания даты отображаемого месяца
        this.addMonth(iter_date)// Создание текущего месяца
    }
    // Функция создания даты отображаемого месяца
    createIterDate(iter_date, date) {
        iter_date.setHours(0, 0, 0, 0);
        iter_date.setDate(date);
        iter_date.setMonth(this.current_first_date.getMonth());
        iter_date.setFullYear(this.current_first_date.getFullYear());
        return iter_date
    }
    // Функция распознания: есть ли на странице первый check
    firstHasClassCell() {
        return $(this.id+".date__cell[data-date='"+this.first_date+"'][data-month='"+this.first_month+"'][data-year='"+this.first_year+"']").hasClass('date__cell')
    }
    // Функция распознания: есть ли на странице второй check
    lastHasClassCell() {
        return $(this.id+".date__cell[data-date='"+this.last_date+"'][data-month='"+this.last_month+"'][data-year='"+this.last_year+"']").hasClass('date__cell')
    }
    // Функция расстановки флагов и установки выделения accent
    editFlagsAndAddAccent(id_button) {
        // Если установлен только 1-й флаг и нажата кнопка next или кнопка prev
        if ((this.first_here_flag)&&(!this.last_here_flag)&&
        ((id_button == '#date-but-next')||(id_button == '#date-but-prev'))) {
            this.editAccentFlags(false, true) // Шаг назад: не разрешено выделение, шаг вперед: разрешено
        }
        // Если установлен только 2-й флаг и нажата кнопка next или кнопка prev
        else if ((!this.first_here_flag)&&(this.last_here_flag)&&
        ((id_button == '#date-but-next')||(id_button == '#date-but-prev'))) {
            this.editAccentFlags(true, false) // Шаг назад: разрешено выделение, шаг вперед: не разрешено
        }
        // Если не установлены 1-й и 2-й флаги
        // и (разрешено выделение вперед и нажата кнопка next)
        // или (разрешено выделение назад и нажата кнопка prev)
        else if (((!this.first_here_flag)&&(!this.last_here_flag)&&(((this.accent_next_flag)&&(id_button == '#date-but-next'))||((this.accent_prev_flag)&&(id_button == '#date-but-prev'))))) {
            this.editAccentFlags(true, true) // Шаг назад и шаг вперед: разрешено выделение
            $(this.id+".date__cell").addClass("date__cell_accent")
        }
        // Если установлены 1-й и 2-й флаги
        else if ((this.first_here_flag)&&(this.last_here_flag)) {
            this.editAccentFlags(false, false) // Шаг назад и шаг вперед: не разрешено выделение
        }
        // Если не установлены 1-й и 2-й флаги
        else if ((!this.first_here_flag)&&(!this.last_here_flag)) {
            // Если (разрешено выделение назад и не разрешено выделение вперед и нажата кнопка next)
            // или если (не разрешено выделение назад и разрешено выделение вперед и нажата кнопка prev)
            if (((this.accent_prev_flag)&&(!this.accent_next_flag)&&(id_button == '#date-but-next'))||
            ((!this.accent_prev_flag)&&(this.accent_next_flag)&&(id_button == '#date-but-prev'))){
                this.editAccentFlags(false, false) // Шаг назад и шаг вперед: не разрешено выделение
            }
        }
    }
    // Функция установки выделения accent
    addAccent(flag) {
        // Если на странице обе отметки
        if (flag == "first-and-last") {
            $(this.id+".date__number_checked:eq(0)").parent().addClass("date__cell_accent") 
            $(this.id+".date__number_checked:eq(0)").parent().nextAll(this.id+".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
            $(this.id+".date__number_checked:eq(1)").parent().nextAll(this.id+".date__cell_accent").removeClass("date__cell_accent") 
            $(this.id+".date__number_checked:eq(0)").parent().addClass("date__cell_accent-first")  
            $(this.id+".date__number_checked:eq(1)").parent().addClass("date__cell_accent-last") 
        }
        // Если на странице только первая отметка
        else if (flag == "first") {
            $(this.id+".date__number_checked").parent().addClass("date__cell_accent-first")  
            $(this.id+".date__number_checked").parent().nextAll(this.id+".date__cell").addClass("date__cell_accent")
        }
        // Если на странице только вторая отметка
        else if (flag == "last") {
            $(this.id+".date__cell:eq(0)").addClass("date__cell_accent") 
            if (this.amount_checked_elements == 2) {
                $(this.id+".date__cell:eq(0)").nextAll(this.id+".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                $(this.id+".date__number_checked").parent().nextAll(this.id+".date__cell_accent").removeClass("date__cell_accent") 
                $(this.id+".date__number_checked").parent().addClass("date__cell_accent-last")
            }
        }
    }
    // Функция установки первой и второй выделенной даты в объект Date_cal
    addFirstAndLastDates(first_year, first_month, first_date, last_year, last_month, last_date) {
        if (first_date != 0) {
            this.first_date = first_date
            this.first_month = first_month
            this.first_year = first_year
        }
        if (last_date != 0) {
            this.last_date = last_date
            this.last_month = last_month
            this.last_year = last_year
        }
    }
    // Функция установки первой и второй даты в буффер
    addDatesToBuffer() {
        this.full_date_first = this.first_year+"-"+this.first_month+"-"+this.first_date
        this.full_date_last = this.last_year+"-"+this.last_month+"-"+this.last_date
        $(this.id+".date__buffer-value").attr('data-value', '{"full_date_first": "'+this.full_date_first+'", "full_date_last": "'+this.full_date_last+'"}')
    }
    // Функция установки первой и второй даты в инпут
    addDatesToInput() {
        $(this.id+".date__bottom input").attr('value', '{"full_date_first": "'+this.full_date_first+'", "full_date_last": "'+this.full_date_last+'"}')
    }
    // Функция удаления отметок и выделений
    removeCheckAndAccentClasses(check) {
        $(check).removeClass("date__number_checked");
        $(this.id+".date__cell_accent").removeClass("date__cell_accent");
        $(this.id+".date__cell_accent-first").removeClass("date__cell_accent-first");
        $(this.id+".date__cell_accent-last").removeClass("date__cell_accent-last");
    }
    // Функция установки флагов, разрешающих выделение предыдущего месяца или следующего
    editAccentFlags(prev, next) {
        this.accent_prev_flag = prev
        this.accent_next_flag = next
    }
    // Функция активации кнопок
    addButtons() {
        // Обработчик нажатия кнопки next
        $("body").on("click", this.id+'#date-but-next', {that: this}, function(e){
            e.data.that.current_first_date.setMonth(e.data.that.current_first_date.getMonth()+1); // Переключение месяца на следующий
            let iter_date = e.data.that.createIterDate(new Date(), e.data.that.current_first_date.getDate()) 
            e.data.that.removeMonth();
            e.data.that.addMonth(iter_date)
            e.data.that.first_here_flag = e.data.that.firstHasClassCell()
            e.data.that.last_here_flag = e.data.that.lastHasClassCell()
            e.data.that.editFlagsAndAddAccent('#date-but-next')
        })
        // Обработчик нажатия кнопки prev
        $("body").on("click", this.id+'#date-but-prev', {that: this}, function(e){
            e.data.that.current_first_date.setMonth(e.data.that.current_first_date.getMonth()-1); // Переключение месяца на предыдущий
            let iter_date = e.data.that.createIterDate(new Date(), e.data.that.current_first_date.getDate()) 
            e.data.that.removeMonth();
            e.data.that.addMonth(iter_date)
            e.data.that.first_here_flag = e.data.that.firstHasClassCell()
            e.data.that.last_here_flag = e.data.that.lastHasClassCell()
            e.data.that.editFlagsAndAddAccent('#date-but-prev')
        })
        // Обработчик нажатия невыделенных дат (добавление отметки)
        $("body").on("click", this.id+'.date__number:not(.date__number_checked)', {that: this}, function(e){
            $(e.data.that.id+".date__clear").css("visibility", "visible")
            // Если на данный момент не сделаны 2 отметки
            if (e.data.that.amount_checked_elements != 2) {
                $(this).addClass("date__number_checked") // Установки отметки
                e.data.that.amount_checked_elements++
                let val = $(e.data.that.id+".date__buffer-value").attr("data-value")    // Получение
                let dates = $.parseJSON(val)                                            // текущих
                e.data.that.full_date_first = dates.full_date_first;                    // значений
                e.data.that.full_date_last = dates.full_date_last;                      // из div-буффера

                let checked_0 = $(this).parent()                // Получение
                if (e.data.that.amount_checked_elements == 1){  // data-значений
                    let year = $(checked_0).data('year'),       // (год, месяц, дата)
                        month = $(checked_0).data('month'),     // из date__cal
                        date = $(checked_0).data('date')        // (родителя нажатого date__number)
                    e.data.that.addFirstAndLastDates(year, month, date, year, month, date)
                }
                else if (e.data.that.amount_checked_elements == 2){
                    let more_flag = false
                    // Сравнение что больше: checked или first
                    if ($(checked_0).data('year') > e.data.that.first_year){ more_flag = true }
                    else if (($(checked_0).data('year') == e.data.that.first_year)&&
                    ($(checked_0).data('month') > e.data.that.first_month)){ more_flag = true }
                    else if (($(checked_0).data('year') == e.data.that.first_year)&&
                    ($(checked_0).data('month') == e.data.that.first_month)&&
                    ($(checked_0).data('date') > e.data.that.first_date)){ more_flag = true }
                    // Если checked > first
                    if (more_flag) {
                        e.data.that.addFirstAndLastDates(0, 0, 0, $(checked_0).data('year'), $(checked_0).data('month'), $(checked_0).data('date'))
                    }
                    else {
                        e.data.that.addFirstAndLastDates(0, 0, 0, e.data.that.first_year, e.data.that.first_month, e.data.that.first_date)
                        e.data.that.addFirstAndLastDates($(checked_0).data('year'), $(checked_0).data('month'), $(checked_0).data('date'), 0, 0, 0)
                    }
                }
                e.data.that.addDatesToBuffer()
            }
            if (e.data.that.amount_checked_elements == 2){
                // Распознание: есть ли на странице checks
                e.data.that.first_here_flag = e.data.that.firstHasClassCell()
                e.data.that.last_here_flag = e.data.that.lastHasClassCell()
                if ((e.data.that.first_here_flag)&&(e.data.that.last_here_flag)) {
                    e.data.that.addAccent("first-and-last")
                }
                else if (e.data.that.first_here_flag) {
                    e.data.that.addAccent("first")
                    e.data.that.editAccentFlags(false, true)
                }
                else if (e.data.that.last_here_flag) {
                    e.data.that.addAccent("last")
                    e.data.that.editAccentFlags(true, false)
                }
            }
        })
        // Обработчик нажатия выделенных дат (удаление отметки)
        $("body").on("click", this.id+'.date__number_checked', { that: this }, function(e){
            if (e.data.that.amount_checked_elements != 0) {
                e.data.that.amount_checked_elements--
                e.data.that.removeCheckAndAccentClasses(this)
                if (e.data.that.amount_checked_elements == 0) {
                    e.data.that.addFirstAndLastDates("2000", "0", "1", "2000", "0", "3") // Установка значений по умолчанию
                    $(e.data.that.id+".date__clear").css("visibility", "hidden")
                }
                else if (e.data.that.amount_checked_elements == 1) {
                    let checked_0 = $(this).parent()
                    // Если нажатый checked == первому числу
                    if (($(checked_0).data('date') == e.data.that.first_date)&&
                    ($(checked_0).data('month') == e.data.that.first_month)&&
                    ($(checked_0).data('year') == e.data.that.first_year)){
                        e.data.that.addFirstAndLastDates(e.data.that.last_year, e.data.that.last_month, e.data.that.last_date, 0, 0, 0)
                    }
                    // Если нажатый checked == второму числу
                    else if (($(checked_0).data('date') == e.data.that.last_date)&&
                    ($(checked_0).data('month') == e.data.that.last_month)&&
                    ($(checked_0).data('year') == e.data.that.last_year)) {
                        e.data.that.addFirstAndLastDates(0, 0, 0, e.data.that.first_year, e.data.that.first_month, e.data.that.first_date)
                    }
                }
                e.data.that.addDatesToBuffer()
                e.data.that.editAccentFlags(false, false)
            }
        })
        // Обработчик нажатия кнопки clear
        $("body").on("click", this.id+'.date__clear', { that: this }, function(e) {
            e.data.that.removeCheckAndAccentClasses(e.data.that.id+".date__number_checked")
            e.data.that.amount_checked_elements = 0;
            e.data.that.addFirstAndLastDates("2000", "0", "1", "2000", "0", "3") // Установка значений по умолчанию
            e.data.that.addDatesToBuffer()
            e.data.that.addDatesToInput()
            e.data.that.editAccentFlags(false, false)
            $(e.data.that.id+".date__clear").css("visibility", "hidden");
        })
        // Обработчик нажатия кнопки apply
        $("body").on("click", this.id+'.date__apply', { that: this }, function(e) {
            e.data.that.full_date_first = e.data.that.first_year+"-"+e.data.that.first_month+"-"+e.data.that.first_date
            e.data.that.full_date_last = e.data.that.last_year+"-"+e.data.that.last_month+"-"+e.data.that.last_date
             // Если не установлены значения по умолчанию
            if ((e.data.that.full_date_first != "2000-0-1")&&
                (e.data.that.full_date_last != "2000-0-3")) {
                e.data.that.addDatesToInput()
                let first_name_month = e.data.that.createNameMonth(e.data.that.first_month, true),
                    second_name_month = e.data.that.createNameMonth(e.data.that.last_month, true);
                e.data.that.full_date_first = e.data.that.first_date + " " + first_name_month
                e.data.that.full_date_last = e.data.that.last_date + " " + second_name_month
                // Если к блоку установлен модификатор date_two-fields
                if ($(e.data.that.id).hasClass("date_two-fields")) {
                    let first_date = e.data.that.first_date;
                    let first_month = e.data.that.first_month+1;
                    let first_year = e.data.that.first_year;
                    if (e.data.that.full_date_first == e.data.that.full_date_last) {
                        if (first_date < 10) {first_date = "0"+first_date}      // Если значение < 10, то добавить 0 перед числом
                        if (first_month < 10) {first_month = "0"+first_month}   // (пример: было 1.4.2020, стало 01.04.2020)
                        // Установка одного значения в оба поля
                        $(e.data.that.id+".date__two-top p").text(first_date+"."+first_month+"."+first_year)
                    }
                    else {
                        let last_date = e.data.that.last_date;
                        let last_month = e.data.that.last_month+1;
                        let last_year = e.data.that.last_year;
                        if (first_date < 10) {first_date = "0"+first_date}
                        if (first_month < 10) {first_month = "0"+first_month}
                        if (last_date < 10) {last_date = "0"+last_date}
                        if (last_month < 10) {last_month = "0"+last_month}
                        // Установка двух значений в оба поля
                        $(e.data.that.id+".date__two-top p").eq(0).text(first_date+"."+first_month+"."+first_year)
                        $(e.data.that.id+".date__two-top p").eq(1).text(last_date+"."+last_month+"."+last_year)
                    }
                }
                else {
                    if (e.data.that.full_date_first == e.data.that.full_date_last) {
                        $(e.data.that.id+".date__top p").text(e.data.that.full_date_first)
                    }
                    else {
                        $(e.data.that.id+".date__top p").text(e.data.that.full_date_first + " - " + e.data.that.full_date_last)
                    }
                }
            }
            else {
                alert("Дата не выбрана")
                if ($(e.data.that.id).hasClass("date_two-fields")) {
                    $(e.data.that.id+".date__two-top p").text('ДД.ММ.ГГГГ')
                }
                else { $(e.data.that.id+".date__top p").text('ДДММ - ДДММ') }
            }
        })
    }
    // Функция создания наименования месяца
    // small_flag - флаг, обозначающий, что нужно выводить не "Январь", а "янв"
    createNameMonth(numMonth, small_flag) {
        let name_month = "month";
        switch(numMonth) {
            case 0: name_month = "Январь"; break
            case 1: name_month = "Февраль"; break
            case 2: name_month = "Март"; break
            case 3: name_month = "Апрель"; break
            case 4: name_month = "Май"; break
            case 5: name_month = "Июнь"; break
            case 6: name_month = "Июль"; break
            case 7: name_month = "Август"; break
            case 8: name_month = "Сентябрь"; break
            case 9: name_month = "Октябрь"; break
            case 10: name_month = "Ноябрь"; break
            case 11: name_month = "Декабрь"; break
        }
        if (small_flag) {
            if (numMonth == 4) { name_month = "мая" }
            else { name_month = name_month.substring(0,3).toLowerCase() }
        }
        return name_month
    }
    // Функция добавления ячейки для числа
    addCell(cal, iter_date, current) {
        $(cal).append("<div data-date='"+iter_date.getDate()+"' data-month='"+iter_date.getMonth()+"' data-year='"+iter_date.getFullYear()+"' class='date__cell'><div class='date__number"+current+"'><p>"+(iter_date.getDate())+"</p></div></div>");
    }
    // Функция создания месяца
    addMonth(iter_date){
        let current = ""; // Переменная для хранения класса отметки сегодняшней даты
        // Печать последних дат предыдущего года
        if (iter_date.getDay() != 1) {
            let prev_iter_date = this.createIterDate(new Date(), 1) 
            let end_day;
            if (prev_iter_date.getDay() == 0) { end_day = 7 }
            else { end_day = prev_iter_date.getDay() }
            for (let i = 1; i < end_day; i++) {
                prev_iter_date.setDate(prev_iter_date.getDate()-1)
                // Проверка: сегодняшняя ли дата (первая проверка)
                if (prev_iter_date.getTime() == this.current_now_date.getTime()) {
                    current = " date__number_current"
                }
                $(this.id+".date__cal").prepend("<div data-date='"+prev_iter_date.getDate()+"' data-month='"+prev_iter_date.getMonth()+"' data-year='"+prev_iter_date.getFullYear()+"' class='date__cell'><div class='date__number"+current+"'><p>"+(prev_iter_date.getDate())+"</p></div></div>");
                // Проверка: сегодняшняя ли дата (вторая проверка)
                if (prev_iter_date.getTime() == this.current_now_date.getTime()) {
                    current = ""
                }
            }
        }
        let name_month = this.createNameMonth(iter_date.getMonth())
        $(this.id+".date__of-the-month").append("<div class='date__month'><h2>"+name_month+ " " + iter_date.getFullYear() + "</h2></div>");
        // Печать всех дат этого года
        let next_month = iter_date.getMonth()+1
        if (next_month == 12) {next_month = 0}
        while(iter_date.getMonth() != next_month){
            // Проверка: сегодняшняя ли дата (первая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = " date__number_current"
            }
            this.addCell(this.id+".date__cal", iter_date, current)
            // Проверка: сегодняшняя ли дата (вторая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = ""
            }
            iter_date.setDate(iter_date.getDate()+1)
        }
        // Печать первых дат следующего года
        if (iter_date.getDay() != 0){
            for (let i = iter_date.getDay(); i <= 7; i++) {
                // Проверка: сегодняшняя ли дата (первая проверка)
                if (iter_date.getTime() == this.current_now_date.getTime()) {
                    current = " date__number_current"
                }
                this.addCell(this.id+".date__cal", iter_date, current)
                // Проверка: сегодняшняя ли дата (вторая проверка)
                if (iter_date.getTime() == this.current_now_date.getTime()) {
                    current = ""
                }
                iter_date.setDate(iter_date.getDate()+1)
            }
        }
        else {
            // Проверка: сегодняшняя ли дата (первая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = " date__number_current"
            }
            this.addCell(this.id+".date__cal", iter_date, current)
            // Проверка: сегодняшняя ли дата (вторая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = ""
            }
            iter_date.setDate(iter_date.getDate()+1);
        }
        this.first_here_flag = this.firstHasClassCell()
        this.last_here_flag = this.lastHasClassCell()
        let first_check = $(this.id+".date__cell[data-date='"+this.first_date+"'][data-month='"+this.first_month+"'][data-year='"+this.first_year+"']")
        let last_check = $(this.id+".date__cell[data-date='"+this.last_date+"'][data-month='"+this.last_month+"'][data-year='"+this.last_year+"']")
        if ((this.first_here_flag)&&(this.last_here_flag)&&(this.amount_checked_elements == 2)) {
            $(first_check).children().addClass("date__number_checked")
            $(last_check).children().addClass("date__number_checked")
            this.addAccent("first-and-last")
        }
        else if (this.first_here_flag) {
            $(first_check).children().addClass("date__number_checked")
            if (this.amount_checked_elements == 2) {
                this.addAccent("first")
            }
        }
        else if (this.last_here_flag) {
            $(last_check).children().addClass("date__number_checked")
            this.addAccent("last")
        }
    }
    // Функция удаления месяца
    removeMonth() {
        $(this.id+".date__cell").remove()
        $(this.id+".date__month").remove()
    }
}
// Создание объектов Date_cal и установка случайных ID всем классам date
let i = 0;
let date = new Array($('.date').length)
$('.date').map(function() {
    let id = getID(12, radnom_set);
    $(this).attr('id', id);
    date[i] = new Date_cal(id);
    i = i + 1;
});
// -----------------------------------------