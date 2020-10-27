// --------------- Пагинатор ---------------

export default class Paginator {
    constructor(id, amount, id_but_next) {
        this.id = id;
        this.amount = amount;
        this.data_page = 0;
        this.id_but_next = id_but_next;
        this.addDataPage()
        this.addNumbers();
        this.addButtons();
    }
    addDataPage() { $(this.id).attr("data-pages", this.data_page) }
    addNumbers() {
        for (let i = 1; i <= this.amount; i++) {
            $(".paginator__numbers").append("<div class='paginator__number'>"+i+"</div>");
        }
        if (this.amount > 5) {
                $(".paginator__number:not(.paginator__number_invisible)").eq(-2).text("...");
            for (let i = 1; i < this.amount-4; i++) {
                $(".paginator__number:not(.paginator__number_invisible)").eq(-3).addClass("paginator__number_invisible");
            }
        }
        $(".paginator__number").eq(this.data_page).addClass("paginator__number_checked")
    }
    addButtons() {
        $("body").on("click", this.id_but_next, {that: this}, function(e){
            if (e.data.that.data_page < e.data.that.amount){
                e.data.that.data_page++
                e.data.that.editPaginator(e.data.that, e.data.that.data_page+1)
            }
        })
        $("body").on("click", '.paginator__number', {that: this}, function(e){
            let number_text = $(this).text();
            if (number_text != "...") {
                let number = parseInt(number_text);
                e.data.that.data_page = number-1;
                e.data.that.editPaginator(e.data.that, number)
            }
            else {}
        })
    }
    editPaginator(that, number) {
        if ($(".paginator__number").eq(number-1).text() != "") {
            that.addDataPage()
            $(".paginator__number").removeClass("paginator__number_checked")
            $(".paginator__number").eq(that.data_page).addClass("paginator__number_checked")
            // Если нажат первый номер
            if (number == 1) { that.edit(2, "...", 1, that.amount-4, -3) }
            // Если нажат второй номер
            else if (number == 2) { that.edit("", "...", 1, that.amount-4, -3) }
            // Если нажат третий номер
            else if (number == 3) { that.edit(2, "...", number, that.amount-4, -3) }
            // Если нажат один из 3-х последних
            else if (number > that.amount-3) { that.edit("...", $(".paginator__number").eq(-2).index()+1, 3, that.amount-3, 2) }
            // Если нажаты остальные
            else { that.edit("...", "...", 2, that.amount-2, "", number) }
            // Если нажат последний
            if (number == that.amount) { $("#paginator-next").css("display","none") }
        }
    }
    edit(two_number, penult_number, first_iter, last_iter, index, number) {
        if ($("#paginator-next").css("display") == "none") {
            $("#paginator-next").css("display","flex")
        }
        if (two_number != "") { $(".paginator__number").eq(1).text(two_number) }
        $(".paginator__number_invisible").removeClass("paginator__number_invisible");
        $(".paginator__number:not(.paginator__number_invisible)").eq(-2).text(penult_number);
        if (!(index == "")) {
            for (let i = first_iter; i < last_iter; i++) {
                $(".paginator__number:not(.paginator__number_invisible)").eq(index).addClass("paginator__number_invisible");
            }
        }
        else {
            for (let i = first_iter; i < last_iter; i++) {
                $(".paginator__number").eq(i).addClass("paginator__number_invisible")
            }
            for (let i = number-1; i <= number+1; i++) {
                $(".paginator__number").eq(i-1).removeClass("paginator__number_invisible")
            }
        }
    }
}

// -----------------------------------------


