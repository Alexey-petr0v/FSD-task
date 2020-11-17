// --------------- User_panel ---------------

class User_panel {
  constructor() {
    if ($(".user-panel__box").is("[data-logged='false']")) {
      $(".user-panel .dropdown__top .dropdown__title").text("Юлий Цезарь")
    }
  }
}

// Создание объекта User_panel
let user_panel = new User_panel();

// -----------------------------------------