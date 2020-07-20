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
        this.first_year = this.current_now_date.getFullYear() // Первый выделенный год
        this.first_month = this.current_now_date.getMonth() // Первый выделенный месяц
        this.first_date = 19 // Первое выделенное число
        this.last_year = this.current_now_date.getFullYear() // Последний выделенный год
        this.last_month = this.current_now_date.getMonth() // Последний выделенный месяц
        this.last_date = 23 // Последний выделенное число
        this.full_date_first = this.first_year+"-"+this.first_month+"-"+this.first_date // Первая дата в полном виде
        this.full_date_last = this.last_year+"-"+this.last_month+"-"+this.last_date // Последняя дата в полном виде
        // Первичная установка значений в инпут и буффер значений
        $(this.id+".date__buffer-value").attr('data-value', '{"full_date_first": "'+this.full_date_first+'", "full_date_last": "'+this.full_date_last+'"}')
        $(this.id+".dropdown__bottom input").attr('value', '{"full_date_first": "'+this.full_date_first+'", "full_date_last": "'+this.full_date_last+'"}')

        this.first_here_flag = true
        this.last_here_flag = true
        this.accent_next_flag = false
        this.accent_prev_flag = false

        this.current_first_date = new Date();           // Первый день
        this.current_first_date.setDate(1);             // текущего
        this.current_first_date.setHours(0, 0, 0, 0);   // месяца

        let iter_date = new Date();
        iter_date.setHours(0, 0, 0, 0);
        iter_date.setDate(this.current_first_date.getDate());
        iter_date.setMonth(this.current_first_date.getMonth());
        iter_date.setFullYear(this.current_first_date.getFullYear());

        this.addMonth(iter_date)
    }
    addButtons() {
        $(this.id+'#date-but-next').click({that: this}, function(e){
            e.data.that.current_first_date.setMonth(e.data.that.current_first_date.getMonth()+1);
            let iter_date = new Date();
            iter_date.setHours(0, 0, 0, 0);
            iter_date.setDate(e.data.that.current_first_date.getDate());
            iter_date.setMonth(e.data.that.current_first_date.getMonth());
            iter_date.setFullYear(e.data.that.current_first_date.getFullYear());
            e.data.that.removeMonth();
            e.data.that.addMonth(iter_date)

            e.data.that.first_here_flag = $(e.data.that.id+".date__cell[data-date='"+e.data.that.first_date+"'][data-month='"+e.data.that.first_month+"'][data-year='"+e.data.that.first_year+"']").hasClass('date__cell')
            // Узнать есть ли на странице второй check (флаг last_here_flag)
            e.data.that.last_here_flag = $(e.data.that.id+".date__cell[data-date='"+e.data.that.last_date+"'][data-month='"+e.data.that.last_month+"'][data-year='"+e.data.that.last_year+"']").hasClass('date__cell')

            if ((e.data.that.first_here_flag)&&
                (!e.data.that.last_here_flag)) {
                e.data.that.accent_next_flag = true
                e.data.that.accent_prev_flag = false
            }
            else if ((!e.data.that.first_here_flag)&&
                     (e.data.that.last_here_flag)) {
                e.data.that.accent_next_flag = false
                e.data.that.accent_prev_flag = true
            }
            else if ((!e.data.that.first_here_flag)&&
                     (!e.data.that.last_here_flag)&&
                     (e.data.that.accent_next_flag)) {
                $(e.data.that.id+".date__cell").addClass("date__cell_accent")
            }
            else if ((e.data.that.first_here_flag)&&
                     (e.data.that.last_here_flag)) {
                e.data.that.accent_next_flag = false
                e.data.that.accent_prev_flag = false
            }
            else if ((!e.data.that.first_here_flag)&&
                    (!e.data.that.last_here_flag)) {
                if ((!e.data.that.accent_next_flag)&&
                    (e.data.that.accent_prev_flag)){
                        e.data.that.accent_next_flag = false
                        e.data.that.accent_prev_flag = false
                    }
            }
        })

        $(this.id+'#date-but-prev').click({that: this}, function(e){
            e.data.that.current_first_date.setMonth(e.data.that.current_first_date.getMonth()-1);
            let iter_date = new Date();
            iter_date.setHours(0, 0, 0, 0);
            iter_date.setDate(e.data.that.current_first_date.getDate());
            iter_date.setMonth(e.data.that.current_first_date.getMonth());
            iter_date.setFullYear(e.data.that.current_first_date.getFullYear());
            e.data.that.removeMonth();
            e.data.that.addMonth(iter_date)

            e.data.that.first_here_flag = $(e.data.that.id+".date__cell[data-date='"+e.data.that.first_date+"'][data-month='"+e.data.that.first_month+"'][data-year='"+e.data.that.first_year+"']").hasClass('date__cell')
            // Узнать есть ли на странице второй check (флаг last_here_flag)
            e.data.that.last_here_flag = $(e.data.that.id+".date__cell[data-date='"+e.data.that.last_date+"'][data-month='"+e.data.that.last_month+"'][data-year='"+e.data.that.last_year+"']").hasClass('date__cell')

            if ((!e.data.that.first_here_flag)&&
                (e.data.that.last_here_flag)) {
                e.data.that.accent_next_flag = false
                e.data.that.accent_prev_flag = true
            }
            else if ((e.data.that.first_here_flag)&&
                     (!e.data.that.last_here_flag)) {
                e.data.that.accent_next_flag = true
                e.data.that.accent_prev_flag = false
            }
            else if ((!e.data.that.first_here_flag)&&
                     (!e.data.that.last_here_flag)&&
                     (e.data.that.accent_prev_flag)) {
                $(e.data.that.id+".date__cell").addClass("date__cell_accent")
            }
            else if ((e.data.that.first_here_flag)&&
                     (e.data.that.last_here_flag)) {
                e.data.that.accent_next_flag = false
                e.data.that.accent_prev_flag = false
            }
            else if ((!e.data.that.first_here_flag)&&
                    (!e.data.that.last_here_flag)) {
                if ((e.data.that.accent_next_flag)&&
                    (!e.data.that.accent_prev_flag)){
                        e.data.that.accent_next_flag = false
                        e.data.that.accent_prev_flag = false
                    }
            }
        })
        // Add check
        $("body").on("click", this.id+'.date__number:not(.date__number_checked)', {that: this}, function(e){
            $(e.data.that.id+".date__clear").css("visibility", "visible")
            if (e.data.that.amount_checked_elements != 2) {
                $(this).addClass("date__number_checked")
                e.data.that.amount_checked_elements++

                let val = $(e.data.that.id+".date__buffer-value").attr("data-value")
                let dates = $.parseJSON(val)
                e.data.that.full_date_first = dates.full_date_first;
                e.data.that.full_date_last = dates.full_date_last;

                let date_3 = $(this).parent().data("date")
                let month_3 = $(this).parent().data("month")
                let year_3 = $(this).parent().data("year")
                let full_date_3 = year_3+"-"+month_3+"-"+date_3

                let checked_0 = $(this).parent()
                if (e.data.that.amount_checked_elements == 1){
                    e.data.that.first_year = $(checked_0).data('year')
                    e.data.that.first_month = $(checked_0).data('month')
                    e.data.that.first_date = $(checked_0).data('date')
                    e.data.that.last_year = $(checked_0).data('year')
                    e.data.that.last_month = $(checked_0).data('month')
                    e.data.that.last_date = $(checked_0).data('date')
                }
                else if (e.data.that.amount_checked_elements == 2){
                    let more_flag = false
                    // Сравнение что больше: checked или first
                    if ($(checked_0).data('year') > e.data.that.first_year){
                        more_flag = true
                    }
                    else if (($(checked_0).data('year') == e.data.that.first_year)&&
                            ($(checked_0).data('month') > e.data.that.first_month)){
                        more_flag = true
                    }
                    else if (($(checked_0).data('year') == e.data.that.first_year)&&
                            ($(checked_0).data('month') == e.data.that.first_month)&&
                            ($(checked_0).data('date') > e.data.that.first_date)){
                        more_flag = true
                    }
                    // Если checked > first
                    if (more_flag) {
                        e.data.that.last_year = $(checked_0).data('year')
                        e.data.that.last_month = $(checked_0).data('month')
                        e.data.that.last_date = $(checked_0).data('date')
                    }
                    else {
                        e.data.that.last_year = e.data.that.first_year
                        e.data.that.last_month = e.data.that.first_month
                        e.data.that.last_date = e.data.that.first_date
                        e.data.that.first_year = $(checked_0).data('year')
                        e.data.that.first_month = $(checked_0).data('month')
                        e.data.that.first_date = $(checked_0).data('date')
                    }
                }
                e.data.that.full_date_first = e.data.that.first_year+"-"+e.data.that.first_month+"-"+e.data.that.first_date
                e.data.that.full_date_last = e.data.that.last_year+"-"+e.data.that.last_month+"-"+e.data.that.last_date
                $(e.data.that.id+".date__buffer-value").attr('data-value', '{"full_date_first": "'+e.data.that.full_date_first+'", "full_date_last": "'+e.data.that.full_date_last+'"}')
            }

            if (e.data.that.amount_checked_elements == 2){
                // Узнать есть ли на странице первый check (флаг first_here_flag)
                e.data.that.first_here_flag = $(e.data.that.id+".date__cell[data-date='"+e.data.that.first_date+"'][data-month='"+e.data.that.first_month+"'][data-year='"+e.data.that.first_year+"']").hasClass('date__cell')
                // Узнать есть ли на странице второй check (флаг last_here_flag)
                e.data.that.last_here_flag = $(e.data.that.id+".date__cell[data-date='"+e.data.that.last_date+"'][data-month='"+e.data.that.last_month+"'][data-year='"+e.data.that.last_year+"']").hasClass('date__cell')

                if ((e.data.that.first_here_flag)&&(e.data.that.last_here_flag)) {
                    $(e.data.that.id+".date__number_checked:eq(0)").parent().addClass("date__cell_accent") 
                    $(e.data.that.id+".date__number_checked:eq(0)").parent().nextAll(e.data.that.id+".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                    $(e.data.that.id+".date__number_checked:eq(1)").parent().nextAll(e.data.that.id+".date__cell_accent").removeClass("date__cell_accent") 
                    $(e.data.that.id+".date__number_checked:eq(0)").parent().addClass("date__cell_accent-first")  
                    $(e.data.that.id+".date__number_checked:eq(1)").parent().addClass("date__cell_accent-last") 
                }
                else if (e.data.that.first_here_flag) {
                    $(e.data.that.id+".date__number_checked").parent().addClass("date__cell_accent-first")  
                    $(e.data.that.id+".date__number_checked").parent().nextAll(e.data.that.id+".date__cell").addClass("date__cell_accent")
                    e.data.that.accent_next_flag = true
                    e.data.that.accent_prev_flag = false
                }
                else if (e.data.that.last_here_flag) {
                    $(e.data.that.id+".date__cell:eq(0)").addClass("date__cell_accent") 
                    $(e.data.that.id+".date__cell:eq(0)").nextAll(e.data.that.id+".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                    $(e.data.that.id+".date__number_checked").parent().nextAll(e.data.that.id+".date__cell_accent").removeClass("date__cell_accent") 
                    $(e.data.that.id+".date__number_checked").parent().addClass("date__cell_accent-last") 
                    e.data.that.accent_next_flag = false
                    e.data.that.accent_prev_flag = true
                }
            }
        })
        // Remove check
        $("body").on("click", this.id+'.date__number_checked', { that: this }, function(e){
            if (e.data.that.amount_checked_elements != 0) {
                e.data.that.amount_checked_elements--
                $(this).removeClass("date__number_checked")
                $(e.data.that.id+".date__cell_accent").removeClass("date__cell_accent")
                $(e.data.that.id+".date__cell_accent-first").removeClass("date__cell_accent-first")
                $(e.data.that.id+".date__cell_accent-last").removeClass("date__cell_accent-last")
                if (e.data.that.amount_checked_elements == 0) {
                    e.data.that.first_year = "2000"
                    e.data.that.first_month = "0"
                    e.data.that.first_date = "1"
                    e.data.that.last_year = "2000"
                    e.data.that.last_month = "0"
                    e.data.that.last_date = "3"
                    $(e.data.that.id+".date__clear").css("visibility", "hidden")
                }
                else if (e.data.that.amount_checked_elements == 1) {
                    let checked_0 = $(this).parent()
                    // Если нажатый checked == первому числу
                    if (($(checked_0).data('date') == e.data.that.first_date)&&
                    ($(checked_0).data('month') == e.data.that.first_month)&&
                    ($(checked_0).data('year') == e.data.that.first_year)){
                        e.data.that.first_year = e.data.that.last_year
                        e.data.that.first_month = e.data.that.last_month
                        e.data.that.first_date = e.data.that.last_date
                    }
                    // Если нажатый checked == второму числу
                    else if (($(checked_0).data('date') == e.data.that.last_date)&&
                    ($(checked_0).data('month') == e.data.that.last_month)&&
                    ($(checked_0).data('year') == e.data.that.last_year)) {
                        e.data.that.last_year = e.data.that.first_year
                        e.data.that.last_month = e.data.that.first_month
                        e.data.that.last_date = e.data.that.first_date
                    }
                }
                e.data.that.full_date_first = e.data.that.first_year+"-"+e.data.that.first_month+"-"+e.data.that.first_date
                e.data.that.full_date_last = e.data.that.last_year+"-"+e.data.that.last_month+"-"+e.data.that.last_date
                $(e.data.that.id+".date__buffer-value").attr('data-value', '{"full_date_first": "'+e.data.that.full_date_first+'", "full_date_last": "'+e.data.that.full_date_last+'"}')
                e.data.that.accent_next_flag = false
                e.data.that.accent_prev_flag = false
            }
        })

        // Clear check
        $("body").on("click", this.id+'.date__clear', { that: this }, function(e) {
            $(e.data.that.id+".date__number_checked").removeClass("date__number_checked");
            $(e.data.that.id+".date__cell_accent").removeClass("date__cell_accent");
            $(e.data.that.id+".date__cell_accent-first").removeClass("date__cell_accent-first");
            $(e.data.that.id+".date__cell_accent-last").removeClass("date__cell_accent-last");
            e.data.that.amount_checked_elements = 0;
            e.data.that.first_year = "2000";
            e.data.that.first_month = "0";
            e.data.that.first_date = "1";
            e.data.that.last_year = "2000";
            e.data.that.last_month = "0";
            e.data.that.last_date = "3";
            e.data.that.full_date_first = e.data.that.first_year+"-"+e.data.that.first_month+"-"+e.data.that.first_date
            e.data.that.full_date_last = e.data.that.last_year+"-"+e.data.that.last_month+"-"+e.data.that.last_date
            $(e.data.that.id+".date__buffer-value").attr('data-value', '{"full_date_first": "'+e.data.that.full_date_first+'", "full_date_last": "'+e.data.that.full_date_last+'"}')
            $(e.data.that.id+".date__bottom input").attr('value', '{"full_date_first": "'+e.data.that.full_date_first+'", "full_date_last": "'+e.data.that.full_date_last+'"}')
            e.data.that.accent_next_flag = false
            e.data.that.accent_prev_flag = false
            $(e.data.that.id+".date__clear").css("visibility", "hidden");
        })
        
        // Apply check
        $("body").on("click", this.id+'.date__apply', { that: this }, function(e) {
            e.data.that.full_date_first = e.data.that.first_year+"-"+e.data.that.first_month+"-"+e.data.that.first_date
            e.data.that.full_date_last = e.data.that.last_year+"-"+e.data.that.last_month+"-"+e.data.that.last_date
            if ((e.data.that.full_date_first != "2000-0-1")&&
                (e.data.that.full_date_last != "2000-0-3")) {
                $(e.data.that.id+".date__bottom input").attr('value', '{"full_date_first": "'+e.data.that.full_date_first+'", "full_date_last": "'+e.data.that.full_date_last+'"}')
                let first_name_month = e.data.that.createNameMonth(e.data.that.first_month, true),
                    second_name_month = e.data.that.createNameMonth(e.data.that.last_month, true);
                e.data.that.full_date_first = e.data.that.first_date + " " + first_name_month
                e.data.that.full_date_last = e.data.that.last_date + " " + second_name_month
                if ($(e.data.that.id).hasClass("date_two-fields")) {
                    if (e.data.that.full_date_first == e.data.that.full_date_last) {
                        let first_date = e.data.that.first_date;
                        let first_month = e.data.that.first_month+1;
                        let first_year = e.data.that.first_year;
                        if (first_date < 10) {first_date = "0"+first_date}
                        if (first_month < 10) {first_month = "0"+first_month}
                        $(e.data.that.id+".date__two-top p").text(first_date+"."+first_month+"."+first_year)
                    }
                    else {
                        let first_date = e.data.that.first_date;
                        let first_month = e.data.that.first_month+1;
                        let first_year = e.data.that.first_year;
                        let last_date = e.data.that.last_date;
                        let last_month = e.data.that.last_month+1;
                        let last_year = e.data.that.last_year;
                        if (first_date < 10) {first_date = "0"+first_date}
                        if (first_month < 10) {first_month = "0"+first_month}
                        if (last_date < 10) {last_date = "0"+last_date}
                        if (last_month < 10) {last_month = "0"+last_month}
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
                else {
                    $(e.data.that.id+".date__top p").text('ДД.ММ.ГГГГ')
                }
            }
        })
    }

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
            if (numMonth == 4) {
                name_month = "мая"
            }
            else {
                name_month = name_month.substring(0,3).toLowerCase()
            }
        }
        return name_month
    }

    addMonth(iter_date){
        let current = "";
        // Печать последних дат предыдущего года
        if (iter_date.getDay() != 1) {
            let prev_iter_date = new Date();
            prev_iter_date.setDate(1)
            prev_iter_date.setMonth(iter_date.getMonth())
            prev_iter_date.setFullYear(iter_date.getFullYear())
            prev_iter_date.setHours(0, 0, 0, 0);
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
        let index_1 = 0
        let index_2 = 0
        let add_flag = false
        while(iter_date.getMonth() != next_month){
            // Проверка: сегодняшняя ли дата (первая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = " date__number_current"
            }
            $(this.id+".date__cal").append("<div data-date='"+iter_date.getDate()+"' data-month='"+iter_date.getMonth()+"' data-year='"+iter_date.getFullYear()+"' class='date__cell'><div class='date__number"+current+"'><p>"+(iter_date.getDate())+"</p></div></div>");
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
                $(this.id+".date__cal").append("<div data-date='"+iter_date.getDate()+"' data-month='"+iter_date.getMonth()+"' data-year='"+iter_date.getFullYear()+"' class='date__cell'><div class='date__number"+current+"'><p>"+(iter_date.getDate())+"</p></div></div>");
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
            $(this.id+".date__cal").append("<div data-date='"+iter_date.getDate()+"' data-month='"+iter_date.getMonth()+"'  data-year='"+iter_date.getFullYear()+"' class='date__cell'><div class='date__number"+current+"'><p>"+(iter_date.getDate())+"</p></div></div>");
            // Проверка: сегодняшняя ли дата (вторая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = ""
            }
            iter_date.setDate(iter_date.getDate()+1);
        }


        // Узнать есть ли на странице первый check (флаг first_here_flag)
        this.first_here_flag = $(this.id+".date__cell[data-date='"+this.first_date+"'][data-month='"+this.first_month+"'][data-year='"+this.first_year+"']").hasClass('date__cell')
        // Узнать есть ли на странице второй check (флаг last_here_flag)
        this.last_here_flag = $(this.id+".date__cell[data-date='"+this.last_date+"'][data-month='"+this.last_month+"'][data-year='"+this.last_year+"']").hasClass('date__cell')

        if ((this.first_here_flag)&&(this.last_here_flag)&&(this.amount_checked_elements == 2)) {
            $(this.id+".date__cell[data-date='"+this.first_date+"'][data-month='"+this.first_month+"'][data-year='"+this.first_year+"']").children().addClass("date__number_checked")
            $(this.id+".date__cell[data-date='"+this.last_date+"'][data-month='"+this.last_month+"'][data-year='"+this.last_year+"']").children().addClass("date__number_checked")
            $(this.id+".date__number_checked:eq(0)").parent().addClass("date__cell_accent") 
            $(this.id+".date__number_checked:eq(0)").parent().nextAll(this.id+".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
            $(this.id+".date__number_checked:eq(1)").parent().nextAll(this.id+".date__cell_accent").removeClass("date__cell_accent") 
            $(this.id+".date__number_checked:eq(0)").parent().addClass("date__cell_accent-first")  
            $(this.id+".date__number_checked:eq(1)").parent().addClass("date__cell_accent-last") 
        }
        else if (this.first_here_flag) {
            $(this.id+".date__cell[data-date='"+this.first_date+"'][data-month='"+this.first_month+"'][data-year='"+this.first_year+"']").children().addClass("date__number_checked")
            if (this.amount_checked_elements == 2) {
                $(this.id+".date__number_checked").parent().addClass("date__cell_accent-first")  
                $(this.id+".date__number_checked").parent().nextAll(this.id+".date__cell").addClass("date__cell_accent")
            }
        }
        else if (this.last_here_flag) {
            $(this.id+".date__cell[data-date='"+this.last_date+"'][data-month='"+this.last_month+"'][data-year='"+this.last_year+"']").children().addClass("date__number_checked")
            $(this.id+".date__cell:eq(0)").addClass("date__cell_accent") 
            if (this.amount_checked_elements == 2) {
                $(this.id+".date__cell:eq(0)").nextAll(this.id+".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                $(this.id+".date__number_checked").parent().nextAll(this.id+".date__cell_accent").removeClass("date__cell_accent") 
                $(this.id+".date__number_checked").parent().addClass("date__cell_accent-last")
            }
        }
    }
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


