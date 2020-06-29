// ------ Страница Search room/Filter ------

import Paginator from '../paginator/paginator.js'
// --- Импорт шаблона карточки номера
let pug = require("../hotel-card/hotel-card.pug");

// --- Формирование карточек номеров в массиве
let elements = new Array(25);
for (let i = 0; i < elements.length; i++){
    let name = 'Timothy'+i, number = i;
    elements[i] = pug({name:name,number:number});
}

// --- Переменные с интервалом первичного вывода элементов (пагинатор)
let id = "#element_24",
    amount_pages = 30,
    paginator = new Paginator(id, amount_pages, "#paginator-next");

paginator.addNumbers();
paginator.addButtons();

// -----------------------------------------