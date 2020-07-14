// --------------- Пагинатор ---------------

class Date_cal {
    constructor(id, amount) {
        this.id = id;
        this.amount = amount;
        this.data_cal = 0;
        this.addButtons();
        // Сегодняшний день
        this.current_now_date = new Date();
        this.current_now_date.setHours(0, 0, 0, 0);
        this.first_date;
        this.second_date;
        this.first_click_flag = true
        this.amount_checked_elements = 2

        // Выделение по умолчанию        
        this.first_year = this.current_now_date.getFullYear()
        this.first_month = this.current_now_date.getMonth()
        this.first_date = 19
        this.last_year = this.current_now_date.getFullYear()
        this.last_month = this.current_now_date.getMonth()
        this.last_date = 23
        let full_date_1 = this.first_year+"-"+this.first_month+"-"+this.first_date
        let full_date_2 = this.last_year+"-"+this.last_month+"-"+this.last_date
        $(".date__bottom input").attr('value', '{"full_date_1": "'+full_date_1+'", "full_date_2": "'+full_date_2+'"}')

        // Первый день текущего месяца
        this.current_first_date = new Date();
        this.current_first_date.setDate(1);
        this.current_first_date.setHours(0, 0, 0, 0);

        let iter_date = new Date();
        iter_date.setHours(0, 0, 0, 0);
        iter_date.setDate(this.current_first_date.getDate());
        iter_date.setMonth(this.current_first_date.getMonth());
        iter_date.setFullYear(this.current_first_date.getFullYear());


        this.addMonth(iter_date)

        // $(".date__month").eq(14).trigger( "click" );
    }
    addButtons() {
        $('#date-but-next').click({that: this}, function(e){
            e.data.that.current_first_date.setMonth(e.data.that.current_first_date.getMonth()+1);
            let iter_date = new Date();
            iter_date.setHours(0, 0, 0, 0);
            iter_date.setDate(e.data.that.current_first_date.getDate());
            iter_date.setMonth(e.data.that.current_first_date.getMonth());
            iter_date.setFullYear(e.data.that.current_first_date.getFullYear());
            e.data.that.removeMonth();
            e.data.that.addMonth(iter_date)
        })
        $('#date-but-prev').click({that: this}, function(e){
            e.data.that.current_first_date.setMonth(e.data.that.current_first_date.getMonth()-1);
            let iter_date = new Date();
            iter_date.setHours(0, 0, 0, 0);
            iter_date.setDate(e.data.that.current_first_date.getDate());
            iter_date.setMonth(e.data.that.current_first_date.getMonth());
            iter_date.setFullYear(e.data.that.current_first_date.getFullYear());
            e.data.that.removeMonth();
            e.data.that.addMonth(iter_date)
        })
        $('.date__month').click({that: this}, function (e) {
            let num_week_text = $(this).text();
            if (num_week_text != "...") {
                let num_week = parseInt(num_week_text);
                e.data.that.data_cal = num_week-1;
                e.data.that.editdate(e.data.that, num_week)
            }
            else {}
        })
        // Add check
        $("body").on("click", '.date__number:not(.date__number_checked)', {that: this}, function(e){
            $(this).addClass("date__number_checked")
            console.log("CLICK")
            if (e.data.that.amount_checked_elements != 2) {
                e.data.that.amount_checked_elements++

                let val = $(".date__bottom input").val()
                let dates = $.parseJSON(val)
                let full_date_1 = dates.full_date_1;
                let full_date_2 = dates.full_date_2;

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
                    console.log("TWO")
                    let more_flag = false
                    // Сравнение что больше: checked или first
                    if ($(checked_0).data('year') > e.data.that.first_year){
                        more_flag = true
                        console.log("YEAR")
                    }
                    else if (($(checked_0).data('year') == e.data.that.first_year)&&
                            ($(checked_0).data('month') > e.data.that.first_month)){
                        more_flag = true
                        console.log("MONTH")
                    }
                    else if (($(checked_0).data('year') == e.data.that.first_year)&&
                            ($(checked_0).data('month') == e.data.that.first_month)&&
                            ($(checked_0).data('date') > e.data.that.first_date)){
                        more_flag = true
                        console.log("DATE")
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
                full_date_1 = e.data.that.first_year+"-"+e.data.that.first_month+"-"+e.data.that.first_date
                full_date_2 = e.data.that.last_year+"-"+e.data.that.last_month+"-"+e.data.that.last_date
                $(".date__bottom input").attr('value', '{"full_date_1": "'+full_date_1+'", "full_date_2": "'+full_date_2+'"}')
            }

            if (e.data.that.amount_checked_elements == 2){
                if ((($(this).parent().data("date") == e.data.that.first_date)&&
                ($(this).parent().data("month") == e.data.that.first_month)&&
                ($(this).parent().data("year") == e.data.that.first_year))||
                (($(this).parent().data("date") == e.data.that.last_date)&&
                ($(this).parent().data("month") == e.data.that.last_month)&&
                ($(this).parent().data("year") == e.data.that.last_year))) {
                    $(this).addClass("date__number_checked")
                    console.log("added")
                }
                $(".date__number_checked:eq(0)").parent().addClass("date__cell_accent-first")  
                $(".date__number_checked:eq(1)").parent().addClass("date__cell_accent-last") 
                $(".date__number_checked:eq(0)").parent().nextAll(".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                $(".date__number_checked:eq(1)").parent().nextAll(".date__cell_accent").removeClass("date__cell_accent") 
            }
            console.log(e.data.that.amount_checked_elements)
            // console.log("full_date_1: "+full_date_1)
            // console.log("full_date_2: "+full_date_2)
        })
        // Remove check
        $("body").on("click", '.date__number_checked', { that: this }, function(e){
            if (e.data.that.amount_checked_elements != 0) {
                e.data.that.amount_checked_elements--
                $(this).removeClass("date__number_checked")
                $(".date__cell_accent").removeClass("date__cell_accent")
                $(".date__cell_accent-first").removeClass("date__cell_accent-first")
                $(".date__cell_accent-last").removeClass("date__cell_accent-last")
                // console.log(3)
                if (e.data.that.amount_checked_elements == 0) {
                    e.data.that.first_year = "2000"
                    e.data.that.first_month = "0"
                    e.data.that.first_date = "1"
                    e.data.that.last_year = "2000"
                    e.data.that.last_month = "0"
                    e.data.that.last_date = "3"
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
                let full_date_1 = e.data.that.first_year+"-"+e.data.that.first_month+"-"+e.data.that.first_date
                let full_date_2 = e.data.that.last_year+"-"+e.data.that.last_month+"-"+e.data.that.last_date
                $(".date__bottom input").attr('value', '{"full_date_1": "'+full_date_1+'", "full_date_2": "'+full_date_2+'"}')
            }
            console.log(e.data.that.amount_checked_elements)
            // console.log("full_date_1: "+full_date_1)
            // console.log("full_date_2: "+full_date_2)
        })
    }
    addMonth(iter_date){
        this.first_click_flag = true

        let name_month;
        switch(iter_date.getMonth()) {
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
        $(".date__of-the-month").append("<div class='date__month'><h2>"+name_month+"</h2></div>");

        
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
                
                $(".date__cal").prepend("<div data-date='"+prev_iter_date.getDate()+"' data-month='"+prev_iter_date.getMonth()+"' data-year='"+prev_iter_date.getFullYear()+"' class='date__cell'><div class='date__number"+current+"'><p>"+(prev_iter_date.getDate())+"</p></div></div>");
                
                // Проверка: сегодняшняя ли дата (вторая проверка)
                if (prev_iter_date.getTime() == this.current_now_date.getTime()) {
                    current = ""
                }
                // Проверка: первое ли выделение (вторая проверка)
                let cell_class = '.date__cell[data-date="'+prev_iter_date.getDate()+'"][data-month="'+prev_iter_date.getMonth()+'"][data-year="'+prev_iter_date.getFullYear()+'"]';
                if ((prev_iter_date.getDate() == this.first_date)&&
                (prev_iter_date.getMonth() == this.first_month)&&
                (prev_iter_date.getFullYear() == this.first_year)) {
                    $(cell_class).addClass("date__cell_accent-first")
                    $(cell_class).nextAll(".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                    $(cell_class).children().addClass("date__number_checked")
                }
                else if ((prev_iter_date.getDate() == this.last_date)&&
                (prev_iter_date.getMonth() == this.last_month)&&
                (prev_iter_date.getFullYear() == this.last_year)) {
                    $(cell_class).addClass("date__cell_accent-first")
                    $(cell_class).nextAll(".date__cell_accent").removeClass("date__cell_accent") 
                    $(cell_class).children().addClass("date__number_checked")
                }
            }
        }
        else {}

        // Печать всех дат этого года
        let next_month = iter_date.getMonth()+1
        if (next_month == 12) {next_month = 0}
        while(iter_date.getMonth() != next_month){
            // Проверка: сегодняшняя ли дата (первая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = " date__number_current"
            }

            $(".date__cal").append("<div data-date='"+iter_date.getDate()+"' data-month='"+iter_date.getMonth()+"' data-year='"+iter_date.getFullYear()+"' class='date__cell'><div class='date__number"+current+"'><p>"+(iter_date.getDate())+"</p></div></div>");
            
            // Проверка: сегодняшняя ли дата (вторая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = ""
            }

            if ((iter_date.getDate() == this.first_date)&&
            (iter_date.getMonth() == this.first_month)&&
            (iter_date.getFullYear() == this.first_year)) {
                let cell_class = '.date__cell[data-date="'+iter_date.getDate()+'"][data-month="'+iter_date.getMonth()+'"][data-year="'+iter_date.getFullYear()+'"]';
                $(cell_class).addClass("date__cell_accent-first")
                $(cell_class).nextAll(".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                $(cell_class).children().addClass("date__number_checked")
            }
            else if ((iter_date.getDate() == this.last_date)&&
            (iter_date.getMonth() == this.last_month)&&
            (iter_date.getFullYear() == this.last_year)) {
                let cell_class = '.date__cell[data-date="'+iter_date.getDate()+'"][data-month="'+iter_date.getMonth()+'"][data-year="'+iter_date.getFullYear()+'"]';
                $(cell_class).addClass("date__cell_accent-last")
                $(cell_class).nextAll(".date__cell_accent").removeClass("date__cell_accent") 
                $(cell_class).children().addClass("date__number_checked")
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

                $(".date__cal").append("<div data-date='"+iter_date.getDate()+"' data-month='"+iter_date.getMonth()+"' data-year='"+iter_date.getFullYear()+"' class='date__cell'><div class='date__number"+current+"'><p>"+(iter_date.getDate())+"</p></div></div>");
                
                // Проверка: сегодняшняя ли дата (вторая проверка)
                if (iter_date.getTime() == this.current_now_date.getTime()) {
                    current = ""
                }
                // Проверка: первое ли выделение (вторая проверка)
                if ((iter_date.getDate() == this.first_date)&&
                (iter_date.getMonth() == this.first_month)&&
                (iter_date.getFullYear() == this.first_year)) {
                    let cell_class = '.date__cell[data-date="'+iter_date.getDate()+'"][data-month="'+iter_date.getMonth()+'"][data-year="'+iter_date.getFullYear()+'"]';
                    $(cell_class).addClass("date__cell_accent-first")
                    $(cell_class).nextAll(".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                    $(cell_class).children().addClass("date__number_checked")
                }
                else if ((iter_date.getDate() == this.last_date)&&
                (iter_date.getMonth() == this.last_month)&&
                (iter_date.getFullYear() == this.last_year)) {
                    let cell_class = '.date__cell[data-date="'+iter_date.getDate()+'"][data-month="'+iter_date.getMonth()+'"][data-year="'+iter_date.getFullYear()+'"]';
                    $(cell_class).addClass("date__cell_accent-last")
                    $(cell_class).nextAll(".date__cell_accent").removeClass("date__cell_accent") 
                    $(cell_class).children().addClass("date__number_checked")
                }
                iter_date.setDate(iter_date.getDate()+1)
            }
        }
        else {
            // Проверка: сегодняшняя ли дата (первая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = " date__number_current"
            }

            $(".date__cal").append("<div data-date='"+iter_date.getDate()+"' data-month='"+iter_date.getMonth()+"'  data-year='"+iter_date.getFullYear()+"' class='date__cell'><div class='date__number"+current+"'><p>"+(iter_date.getDate())+"</p></div></div>");
            // Проверка: сегодняшняя ли дата (вторая проверка)
            if (iter_date.getTime() == this.current_now_date.getTime()) {
                current = ""
            }
            // Проверка: первое ли выделение (вторая проверка)
            if ((iter_date.getDate() == this.first_date)&&
            (iter_date.getMonth() == this.first_month)&&
            (iter_date.getFullYear() == this.first_year)) {
                let cell_class = '.date__cell[data-date="'+iter_date.getDate()+'"][data-month="'+iter_date.getMonth()+'"][data-year="'+iter_date.getFullYear()+'"]';
                $(cell_class).addClass("date__cell_accent-first")
                $(cell_class).nextAll(".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                $(cell_class).children().addClass("date__number_checked")
            }
            else if ((iter_date.getDate() == this.last_date)&&
            (iter_date.getMonth() == this.last_month)&&
            (iter_date.getFullYear() == this.last_year)) {
                let cell_class = '.date__cell[data-date="'+iter_date.getDate()+'"][data-month="'+iter_date.getMonth()+'"][data-year="'+iter_date.getFullYear()+'"]';
                $(cell_class).addClass("date__cell_accent-last")
                $(cell_class).nextAll(".date__cell_accent").removeClass("date__cell_accent") 
                $(cell_class).children().addClass("date__number_checked")
            }
            iter_date.setDate(iter_date.getDate()+1);
        }
        console.log("{ addMonth")
        console.log(this.first_year)
        console.log(this.first_month)
        console.log(this.first_date)
        console.log(this.last_year)
        console.log(this.last_month)
        console.log(this.last_date)
        console.log(this.amount_checked_elements)
        console.log("}")
    }
    removeMonth() {
        $(".date__cell").remove()
        $(".date__month").remove()
    }
}

let id2 = "#element_200",
    amount_pages2 = 11,
    date = new Date_cal(id2, amount_pages2);



// let observer = new MutationObserver(mutationRecords => {
//     console.log(mutationRecords);
// });
  
// // наблюдать за всем, кроме атрибутов
// observer.observe(element_200, {
//     attributes: true,
//     characterDataOldValue: true
// });

  
// -----------------------------------------


