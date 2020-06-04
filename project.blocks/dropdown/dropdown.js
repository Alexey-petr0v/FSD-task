import {getID} from '../../pages/scripts/generate_ID.js'
let radnom_set = new Set();

// Обработчик нажатия dropdown
let dropdown = '.dropdown',
    dropdown_top = '.dropdown__top',
    dropdown_bottom = '.dropdown__bottom',
    numberOfClasses = 0,
    subBlockButtonID = "#apply"; // ID кнопки вложенного блока для вызова slideToggle при нажатии на неё

// Функция подсчета количества элементов с классом dropdown на странице
$(dropdown).map(function sumOfClasses() {
    numberOfClasses++
    });

// Массив идентификатов всех элементов с классами dropdown__top, dropdown__bottom
let uniqueIDTop = new Array(numberOfClasses),
    uniqueIDBottom = new Array(numberOfClasses),
    pathToButtonID = new Array(numberOfClasses);

// Установка случайных ID всем классам dropdown__top
let iteration = 0;
$(dropdown_top).map(function() {
    uniqueIDTop[iteration] = getID(12, radnom_set);
    $(this).attr('id', uniqueIDTop[iteration]);
    iteration = iteration + 1;
});

// Установка случайных ID всем классам dropdown__bottom
iteration = 0;
$(dropdown_bottom).map(function() {
    uniqueIDBottom[iteration] = getID(12, radnom_set);
    $(this).attr('id', uniqueIDBottom[iteration]);
    iteration = iteration + 1;
});

// Генерация обработчиков всех кликабельных элементов блока dropdown
for (let x = 0; x < numberOfClasses; x++) {
    let topID = '#' + uniqueIDTop[x],
        bottomID = '#' + uniqueIDBottom[x];
    pathToButtonID[x] = bottomID + ' ' + subBlockButtonID; // Селектор (путь) кнопки дочернего класса

    // Обработчик нажатия кнопки дочернего класса
    $(pathToButtonID[x]).click({ bottom : bottomID}, function(e){
        $(e.data.bottom).slideToggle()
    });
    
    // Обработчик нажатия 'dropdown__top'
    $(topID).click({ bottom : bottomID}, function(e){
        $(e.data.bottom).slideToggle()
    });
}

// Установка визуальной стрелки на поле dropdown__top
$(".dropdown__top").map(function(){
    $(this).css('background', 'url("/images/expand_more.svg") calc(100% - 13px) 50% no-repeat #ffffff')
});

// Смена визуальной стрелки на стрелку вверх/вниз
$(".dropdown_no-border").children(".dropdown__top").click(function(){
    let height_bottom_px = $(this).parent(".dropdown_no-border").children(".dropdown__bottom").css("height"),
        height_bottom = height_bottom_px.replace(/[\p\x]/g, '');
    if (height_bottom > 1) {
        $(this).css('background', 'url("/images/expand_more.svg") calc(100% - 13px) 50% no-repeat #ffffff')
    }
    else {
        $(this).css('background', 'url("/images/to_close.svg") calc(100% - 13px) 50% no-repeat #ffffff')
    }
});