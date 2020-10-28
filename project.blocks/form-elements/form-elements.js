// ------ Страница Form Elements ------

import Paginator from '../paginator/paginator.js'


if ($(".form-elements").length) {
    
    // --- Переменные с интервалом первичного вывода элементов (пагинатор)
    let id = "#element_24",
        amount_pages = 15,
        paginator = new Paginator(id, amount_pages, "#paginator-next");
    
    // Text Field
    $( ".text-field__elem" ).eq(1).attr( "id", "text-filled" );
    if (document.getElementById('text-filled')){
        document.getElementById('text-filled').value = "This is pretty awesome"
    }
    $( ".text-field__elem" ).eq(1).trigger( "focus" );
    
    // dropdown
    $( ".list-counter__top" ).eq(1).trigger( "click" );
    $( ".list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(0).trigger( "click" );
    $( ".list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(0).trigger( "click" );
    $( ".list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(1).trigger( "click" );
    $( ".list-counter__bottom" ).eq(1).find(".list-counter__plus").eq(1).trigger( "click" );
    $( ".list-counter__top" ).eq(1).trigger( "click" );
    
    // dropdown
    $( ".list-counter__top" ).eq(2).trigger( "click" );
    $( ".list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(0).trigger( "click" );
    $( ".list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(0).trigger( "click" );
    $( ".list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(1).trigger( "click" );
    $( ".list-counter__bottom" ).eq(2).find(".list-counter__plus").eq(1).trigger( "click" );
    
    // expandable checkbox list
    $('.dropdown__elem_no-border .dropdown__top').eq(3).trigger( "click" );
    $('.dropdown__elem_no-border .dropdown__top').eq(3).css('background', 'url("images/to_close.svg") calc(100% - 13px) 50% no-repeat #ffffff');
    
    // Dropdown
    $( ".list-counter__top" ).eq(3).trigger( "click" );
    
    // Dropdown
    $( ".list-counter__top" ).eq(4).trigger( "click" );
    $( ".list-counter__bottom" ).eq(4).find(".list-counter__plus").eq(0).trigger( "click" );
    $( ".list-counter__bottom" ).eq(4).find(".list-counter__plus").eq(0).trigger( "click" );
    $( ".list-counter__bottom" ).eq(4).find(".list-counter__plus").eq(1).trigger( "click" );
    
    // -----------------------------------------

}