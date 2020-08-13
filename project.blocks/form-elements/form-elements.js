// ------ Страница Form Elements ------

import Paginator from '../paginator/paginator.js'

// --- Переменные с интервалом первичного вывода элементов (пагинатор)
let id = "#element_24",
    amount_pages = 15,
    paginator = new Paginator(id, amount_pages, "#paginator-next");

// Text Field
$( ".form-elements .text-field__elem" ).eq(1).attr( "id", "text-filled" );
if (document.getElementById('text-filled')){
    document.getElementById('text-filled').value = "This is pretty awesome"
}
$( ".form-elements .text-field__elem" ).eq(1).trigger( "focus" );

// dropdown
$( ".form-elements .list-counter__top" ).eq(1).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(1).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(1).trigger( "click" );
$( ".form-elements .list-counter__top" ).eq(1).trigger( "click" );

// dropdown
$( ".form-elements .list-counter__top" ).eq(2).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(1).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(1).trigger( "click" );

// expandable checkbox list
$('.form-elements .dropdown__elem_no-border .dropdown__top').eq(3).trigger( "click" );
$('.form-elements .dropdown__elem_no-border .dropdown__top').eq(3).css('background', 'url("/images/to_close.svg") calc(100% - 13px) 50% no-repeat #ffffff');

// Dropdown
$( ".form-elements .list-counter__top" ).eq(3).trigger( "click" );

// Dropdown
$( ".form-elements .list-counter__top" ).eq(4).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(4).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(4).find(".list-counter__plus").eq(0).trigger( "click" );
$( ".form-elements .list-counter__bottom" ).eq(4).find(".list-counter__plus").eq(1).trigger( "click" );

// -----------------------------------------