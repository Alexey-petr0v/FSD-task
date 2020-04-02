// Обработчик нажатия dropdown
var dropdown_top = '.dropdown__top',
    dropdown_bottom = $('.dropdown__bottom');

$(dropdown_top).click (function view(){
    //console.log("развернуть/свернуть");
    dropdown_bottom.slideToggle()
});

// Обработчик кнопки 'применить'
$('.dropdown-list__apply').click (function view(){
    //console.log("применить");
    dropdown_bottom.slideToggle();
});

// Обработчик кнопки 'отменить'
$('.dropdown-list__clear').click (function view(){
    //console.log("отменить");
});