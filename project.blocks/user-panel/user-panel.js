// --------------- User_panel ---------------

class User_panel {
    constructor() {
        if ($(".user-panel__box").is("[data-logged='false']")){
            $(".user-panel__box[data-logged='false']").append("<div class='user-panel__buttons'><div class='button'><div class='button__elem button__elem_opaque-border'><div class='button__content button__content_padding' style='min-width: 83px;'><h3 class='button__text'>Войти</h3></div></div></div><div class='button'><div class='button__elem button__elem_opaque-background' style='width: 196px;'><div class='button__content button__content_padding'><h3 class='button__text button__text_white'>Зарегистрироваться</h3></div></div></div></div>")
        }
        if ($(".user-panel__box").is("[data-logged='true']")){
            $(".user-panel__box[data-logged='true']").append("<div class='user-panel__line'></div><div class='user-panel__user-name'><div class='dropdown'><div class='dropdown__elem dropdown__elem_elastic dropdown__elem_no-border dropdown__elem_elastic'><div class='dropdown__top dropdown__top_no_arrow'><p>Юлий Цезарь</p></div><div class='dropdown__bottom' style='z-index: 2; display: none;'><p><a href='https://yandex.ru/' target='_blank'>Выход</a></p></div></div></div></div>")
        }
    }
}

// Создание объекта User_panel
let user_panel = new User_panel();

// -----------------------------------------



