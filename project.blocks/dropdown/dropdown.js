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
    uniqueIDTop[iteration] = randomString(1);
    $(this).attr('id', uniqueIDTop[iteration]);
    iteration = iteration + 1;
});

// Установка случайных ID всем классам dropdown__bottom
iteration = 0;
$(dropdown_bottom).map(function() {
    uniqueIDBottom[iteration] = randomString(1);
    $(this).attr('id', uniqueIDBottom[iteration]);
    iteration = iteration + 1;
});

// Случайная генерация ID
function randomString(i) {
    let rnd = '';
    while (rnd.length < i) 
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

// Генерация обработчиков всех кликабельных элементов блока dropdown
for (x = 0; x < numberOfClasses; x++) {
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