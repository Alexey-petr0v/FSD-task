// --------------- Header_nav ---------------

class Header_nav {
    constructor() {
        if ($(".header-nav").is("[data-logged='false']")){
            console.log("[data-logged='false']");
            $(".header-nav[data-logged='false']").find(".header-nav__user").append("<div class='button'>1</div><div class='button'>2</div>")
        }
        if ($(".header-nav").is("[data-logged='true']")){
            console.log("[data-logged='true']");
            $(".header-nav[data-logged='true']").find(".header-nav__user").append("<div class='header-nav__line'>3</div>")
        }
    }
}

// Создание объекта Header_nav
let date = new Header_nav();

// -----------------------------------------