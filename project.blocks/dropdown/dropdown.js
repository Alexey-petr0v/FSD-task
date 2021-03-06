import {getID} from '../../pages/scripts/generate_ID.js'
let radnom_set = new Set();

let dropdown = '.dropdown',
  dropdown_top = '.dropdown__top',
  dropdown_bottom = '.dropdown__bottom',
  dropdown_mod = '.dropdown__elem_toggle_arrow',
  numberOfClasses = 0,
  subBlockButtonID = ".dropdown__apply"; // ID кнопки вложенного блока для вызова slideToggle при нажатии на неё

// Функция подсчета количества элементов с классом dropdown на странице
$(dropdown).map(function sumOfClasses() { numberOfClasses++ });

// Массив идентификатов всех элементов с классами dropdown__top, dropdown__bottom
let uniqueID = new Array(numberOfClasses),
  button_selector = new Array(numberOfClasses);

// Установка случайных ID всем классам dropdown
let iteration = 0;
$(dropdown).map(function() {
  uniqueID[iteration] = getID(12, radnom_set);
  $(this).attr('id', uniqueID[iteration]);
  iteration = iteration + 1;
});

// Генерация обработчиков всех кликабельных элементов блока dropdown
for (let x = 0; x < numberOfClasses; x++) {
  let top_selector = "#"+uniqueID[x]+" "+dropdown_top,
    bottom_selector = "#"+uniqueID[x]+" "+dropdown_bottom;
  button_selector[x] = bottom_selector + ' ' + subBlockButtonID; // Селектор (путь) кнопки дочернего класса
  $(bottom_selector).css('z-index', numberOfClasses-x);

  // Обработчик нажатия кнопки дочернего класса
  $("body").on("click", button_selector[x], { bottom : bottom_selector}, function(e){
    $(e.data.bottom).slideToggle()
  });
  
  // Обработчик нажатия 'dropdown__top'
  $("body").on("click", top_selector, { bottom : bottom_selector}, function(e){
    $(e.data.bottom).slideToggle()
  });
}

// Смена визуальной стрелки на стрелку вверх/вниз
$("body").on("click", dropdown_mod + " " + dropdown_top, {}, function(e){
  let height_bottom_px = $(this).parents(dropdown_mod).find(dropdown_bottom).css("height"),
    height_bottom = height_bottom_px.replace(/[\p\x]/g, '');
  if (height_bottom > 1) {
    $(this).toggleClass("dropdown__top_arrow-up")
  }
  else {
    $(this).toggleClass("dropdown__top_arrow-up")
  }
})