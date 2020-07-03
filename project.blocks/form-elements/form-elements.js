// ------ Страница Form Elements ------

import Paginator from '../paginator/paginator.js'

// --- Переменные с интервалом первичного вывода элементов (пагинатор)
let id = "#element_24",
    amount_pages = 15,
    paginator = new Paginator(id, amount_pages, "#paginator-next");

paginator.addNumbers();
paginator.addButtons();


$( ".text-field__elem" ).eq(0).trigger( "focus" );

$( ".list-counter__top" ).eq(1).trigger( "click" );
$( ".list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(1).trigger( "click" );
$( ".list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(1).trigger( "click" );
$( ".list-counter__top" ).eq(1).trigger( "click" );

$( ".list-counter__top" ).eq(2).trigger( "click" );
$( ".list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(1).trigger( "click" );
$( ".list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(1).trigger( "click" );

$( ".dropdown__top" ).eq(6).trigger( "click" );

$( ".list-counter__top" ).eq(3).trigger( "click" );

$( ".list-counter__top" ).eq(4).trigger( "click" );
$( ".list-counter__bottom" ).eq(4).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".list-counter__bottom" ).eq(4).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".list-counter__bottom" ).eq(4).find(".list-counter__plus").eq(1).trigger( "click" );

// -----------------------------------------