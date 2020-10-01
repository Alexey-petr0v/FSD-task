// --------------- Header_nav ---------------

class Header_nav {
    constructor() {
        if ($(".header-nav").is("[data-logged='false']")){
            console.log("[data-logged='false']");
            $(".header-nav[data-logged='false']").find(".header-nav__user").append("<div class='header-nav__buttons'><div class='button'><div class='button__elem button__elem_opaque-border'><div class='button__content button__content_padding' style='min-width: 83px;'><h3 class='button__text'>Войти</h3></div></div></div><div class='button'><div class='button__elem button__elem_opaque-background' style='width: 196px;'><div class='button__content button__content_padding'><h3 class='button__text button__text_white'>Зарегистрироваться</h3></div></div></div></div>")
        }
        if ($(".header-nav").is("[data-logged='true']")){
            console.log("[data-logged='true']");
            $(".header-nav[data-logged='true']").find(".header-nav__user").append("<div class='header-nav__line'></div><div class='header-nav__user-name'><div class='dropdown'><div class='dropdown__elem dropdown__elem_elastic dropdown__elem_no-border dropdown__elem_elastic'><div class='dropdown__top dropdown__top_no_arrow'><p>Юлий Цезарь</p></div><div class='dropdown__bottom' style='z-index: 2; display: none;'><p><a href='https://yandex.ru/' target='_blank'>Выход</a></p></div></div></div></div>")
        }
    }
}

// Создание объекта Header_nav
let date = new Header_nav();

// -----------------------------------------



