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

        // Выделение по умолчанию
        this.checked_first = {date: 19, month: this.current_now_date.getMonth(), year: this.current_now_date.getFullYear()};
        this.checked_last = {date: 23, month: this.current_now_date.getMonth(), year: this.current_now_date.getFullYear()};
        
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

        $(".date__month").eq(14).trigger( "click" );
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
        $("body").on("click", '.date__number:not(.date__number_checked)', function(e){
            if ($(".date__number_checked").length != 2) {
                $(this).addClass("date__number_checked")
            }
            if ($(".date__number_checked").length == 2){
                $(".date__number_checked").parent().addClass("date__cell_accent") 
                $(".date__number_checked:eq(0)").parent().addClass("date__cell_accent-first")  
                $(".date__number_checked:eq(1)").parent().addClass("date__cell_accent-last") 
                $(".date__number_checked:eq(0)").parent().nextAll(".date__cell:not(.date__cell_accent)").addClass("date__cell_accent") 
                $(".date__number_checked:eq(1)").parent().nextAll(".date__cell_accent").removeClass("date__cell_accent") 
            }
        })
        $("body").on("click", '.date__number_checked', function(e){
            $(this).removeClass("date__number_checked")
            if ($(".date__number_checked").length != 2){
                $(".date__cell_accent").removeClass("date__cell_accent")
                $(".date__cell_accent-first").removeClass("date__cell_accent-first")
                $(".date__cell_accent-last").removeClass("date__cell_accent-last")
            }
        })
    }
    addMonth(iter_date){

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
        $(".date__of-the-month").append("<div class='date__month'>"+name_month+"</div>");

        
        let current = "";
        let checked = "";
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
                if (((prev_iter_date.getDate() == this.checked_first.date)&&
                (prev_iter_date.getMonth() == this.checked_first.month)&&
                (prev_iter_date.getFullYear() == this.checked_first.year))||
                ((prev_iter_date.getDate() == this.checked_last.date)&&
                (prev_iter_date.getMonth() == this.checked_last.month)&&
                (prev_iter_date.getFullYear() == this.checked_last.year))) {
                    $(".date__number:eq(-1)").trigger("click")
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
            // Проверка: первое ли выделение (вторая проверка)
            if (((iter_date.getDate() == this.checked_first.date)&&
            (iter_date.getMonth() == this.checked_first.month)&&
            (iter_date.getFullYear() == this.checked_first.year))||
            ((iter_date.getDate() == this.checked_last.date)&&
            (iter_date.getMonth() == this.checked_last.month)&&
            (iter_date.getFullYear() == this.checked_last.year))) {
                $(".date__number:eq(-1)").trigger("click")
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
                if (((iter_date.getDate() == this.checked_first.date)&&
                (iter_date.getMonth() == this.checked_first.month)&&
                (iter_date.getFullYear() == this.checked_first.year))||
                ((iter_date.getDate() == this.checked_last.date)&&
                (iter_date.getMonth() == this.checked_last.month)&&
                (iter_date.getFullYear() == this.checked_last.year))) {
                    $(".date__number:eq(-1)").trigger("click")
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
            if (((iter_date.getDate() == this.checked_first.date)&&
            (iter_date.getMonth() == this.checked_first.month)&&
            (iter_date.getFullYear() == this.checked_first.year))||
            ((iter_date.getDate() == this.checked_last.date)&&
            (iter_date.getMonth() == this.checked_last.month)&&
            (iter_date.getFullYear() == this.checked_last.year))) {
                $(".date__number:eq(-1)").trigger("click")
            }
            iter_date.setDate(iter_date.getDate()+1);
        }
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


