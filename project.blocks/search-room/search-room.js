import Paginator from '../paginator/paginator.js'

if ($(".search-room").length) {
    
    // --- Переменные с интервалом первичного вывода элементов (пагинатор)
    let id = "#search-room-numbers",
        amount_pages = 15,
        paginator = new Paginator(id, amount_pages, "#paginator-next"),
        child = ".number-card";

        for (let i = 0; i < $(child).length; i++) {
            $(child).css("display", "none")
        }

        for (let i = 0; i < 12; i++) {
            $(child).eq(i).css("display", "block")
        }

    $("body").on("click", '.search-room__paginator', {}, function(){
        let data_pages = $('#search-room-numbers').attr("data-pages");
        console.log(data_pages)
        let h = data_pages * 12;
        for (let i = 0; i < $(child).length; i++) {
            $(".number-card").eq(i).css("display", "none")
        }
        for (let i = 1+h; i < 13+h; i++) {
            $(child).eq(i-1).css("display", "block")
        }
    })
}