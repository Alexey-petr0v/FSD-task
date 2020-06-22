// будем считать, что у нас на странице 9 элементов


// ------ Страница Search room/Filter

let elements = new Array(9);

let pug = require("../hotel-card/hotel-card.pug");


for (let i = 0; i < elements.length; i++){
    elements[i] = new Object();
    elements[i].name = 'Timothy'+i;
    elements[i].number = i;
    elements[i].code = pug({name:elements[i].name,number:elements[i].number});
}

paginator(3)



// ------ Пагинатор

function paginator(kolichestvo_elem) {
    let elem_class = ".hotel-card"; // Элементы для обоработки
    
    for (let i = 0; i < kolichestvo_elem; i++){
        $(".form-elements__element_24").append(elements[i].code)
    }
    
    console.log("aaa: "+kolichestvo_elem)

}


// OK На какой-либо странице есть масса всяких пронумерованных элементов
// Пагинатор.js просто:
// - принимает число, которое будет ограничивать количество выводимых элементов на одной странице 
// - возвращает определенные числа (например, от 1 до 12, до 13 до 24 и тд)