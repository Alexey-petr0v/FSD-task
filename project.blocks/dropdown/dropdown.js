var btn = '.field__input_dropdown',
    dropdown = $('.field__input_dropdown-list');

$(btn).click (function view(){
    var click = parseInt($(dropdown).attr("clickStatus")),
        clickOn = 0,
        clickOff = 0;

    if (click == 0){
        clickOn = click;
        clickOn++;
        $(dropdown).attr("clickStatus", clickOn);
        dropdown.fadeIn();
    }
    if (click == 1){
        clickOff = click;
        clickOff--;
        $(dropdown).attr("clickStatus", clickOff);
        dropdown.fadeOut();
    }
});