import {getID} from '../../pages/scripts/generate_ID.js'
let radnom_set = new Set();

/* !!!!!!!!!!!!!!!!!!!!!! Старый list-counter !!!!!!!!!!!!!!!!!!!!! */

/* -------------- Переменные блока list-counter -------------- */

let block_class = '.list-counter',
  top_selector = '.list-counter__top',
  item_selector = '.list-counter__item',
  length_items = $(item_selector).length, // Количество элементов с классом .list-counter__item на всей странице
  length_top = $(top_selector).length, // Количество элементов с классом .list-counter__top на всей странице
  length_lists = new Array(length_top); // Список с количествами элементов с классом .list-counter__item в отдном классе .list-counter__bottom

// Генерация массива переменных на основе размера списка на странице
let list_ID = new Array(length_items);
for (let i = 0; i <= length_items; i++) {
  list_ID[i] = getID(12, radnom_set)
}

// Добавление пронумерованных классов к list-counter__item
let iter_item_a = 1;
$(item_selector).map(function(){
  $(this).addClass("list-counter__item_amount" + iter_item_a);
  iter_item_a++
});

// Добавление ID к list-counter
let iter_block = 1;
$(block_class).map(function(){
  $(this).attr("id", "NODROP_"+list_ID[iter_block-1]);
  length_lists[iter_block-1] = $(this).find(".list-counter__item").length;
  iter_block++
});

/* ------------------------------------------------------- */


/* -------------- Реализация блока list-counter -------------- */

// ---- MAIN ---- //

// Предварительный запуск изменения внежнего вида кнопок
editButtons();

// Обработчики нажатия list-counter
$("body").on("click", top_selector, {}, function(e){
  if(!$(this).hasClass("active")){
    $(this).addClass("active");
    return "add class active"
  }
  $(this).removeClass("active");
  apply ($(this));
  return "remove class active"
});

// Обработчики нажатия кнопок '-' и '+'
$("body").on("click", ".list-counter__minus", {}, function(e){
  minus ($(this))
});
$("body").on("click", ".list-counter__plus", {}, function(e){
  plus ($(this))
});

// Обработчики нажатия кнопок 'применить'
$("body").on("click", ".list-counter__apply", {}, function(e){
  let top = $(this).parents(".list-counter").find(".list-counter__top");
  if(!$(top).hasClass("active")){
    $(top).addClass("active");
    return "add class active"
  }
  $(top).removeClass("active");
  apply ($(this));
  return "remove class active"
});

// Обработчик нажатия кнопки 'отменить'
$("body").on("click", ".list-counter__clear", {}, function view(){
  clear($(this))
});


// ---- FUNCTIONS ---- //

// Функция изменения внежнего вида кнопок
function editButtons(){
  $(".list-counter__minus").map(function(){
    let value = parseInt($(this).parent().children("h3").text());
    if (value > 0) {
      if ($(this).hasClass('list-counter__circle_not-active')) {
        $(this).removeClass('list-counter__circle_not-active');
      }
    }
    else if (value == 0){ $(this).addClass('list-counter__circle_not-active') }
  });
}

// Функция реализации кнопки '-'
function minus (This) {
  let h3 = $(This).parent().children("h3"),
    value = parseInt($(h3).text());
  if (value > 1) {
    $(h3).text(function() {return value - 1});
    editButtons()
  }
  else if (value == 1){
    $(h3).text(function() {return value - 1});
    editButtons()
  }
  totalAmount(This)
}

// Функция реализации кнопки '+'
function plus (This) {
  let h3 = $(This).parent().children("h3"),
    value = parseInt($(h3).text());
  $(h3).text(function() {return value + 1});
    value = parseInt($(h3).text());
  editButtons();
  if ($(This).children(".list-counter__minus").hasClass("list-counter__circle_not-active")) {
    $(This).children(".list-counter__minus").removeClass('list-counter__circle_not-active')
  }
  totalAmount(This)
}

// Функция вывода общей суммы гостей (число + слово)
function totalAmount(This) {
  let block = searchBlock(This),
    ID = $(block).attr("id"),
    clear = block.find(".list-counter__clear");

  if ($(block).data("type_units") == "together") {
    let totalAmount = totalAmountNum(ID, clear);
    $('.list-counter[id="'+ID+'"] .list-counter__top').text(function() {
      let units = generateUnits(totalAmount, "the-guests");
      return totalAmount + units;
    })
  }
  else if ($(block).data("type_units") == "separately"){
    $('.list-counter[id="'+ID+'"] .list-counter__top').text(function() {
      let result = "";
      let i = 0;
      $(block).find(".list-counter__item").map(function() {
        let value = parseInt($(this).find(".list-counter__minusAndPlus").children("h3").text());
        if ((value > 0)&&(i < 2)) {
          if (i != 0) { result += ", " }
          let name = $(this).data("name");
          let unit = generateUnits(value, name);
          result += value + unit;
          i++
        }
      })
      if (result === "") { result = "Удобства" }
      console.log(result)
      return result
    })
  }
}

// Функция поиска элемента с классом list-counter
function searchBlock(That){
  return $(That).parents(".list-counter")
}

// Функция подсчета общей суммы гостей (только число)
function totalAmountNum(ID, clear) {
  let totalAmount = 0, value = 0;

  let adfg = $(".list-counter[id='"+ID+"']").find(".list-counter__minusAndPlus").children("h3");
  $(adfg).map(function(){
    value = parseInt($(this).text());
    totalAmount += value
  });
  
  visibleClearButton(totalAmount, clear)
  return totalAmount
}

// Функция вывода слов: "гость", "гостя" и "гостей"
function generateUnits(totalAmount, name_units) {
  let variant_1, variant_2, variant_3;

  // ПЕРЕМЕСТИТЬ variant_1,2,3 в data-атрибуты
  if (name_units == "the-guests") {
    variant_1 = " гость"; variant_2 = " гостя"; variant_3 = " гостей";
  }
  else if (name_units == "babies") {
    variant_1 = " младенец"; variant_2 = " младенца"; variant_3 = " младенцев";
  }
  else if (name_units == "bedrooms") {
    variant_1 = " спальня"; variant_2 = " спальни"; variant_3 = " спален";
  }
  else if (name_units == "the-beds") {
    variant_1 = " кровать"; variant_2 = " кровати"; variant_3 = " кроватей";
  }
  else if (name_units == "bathrooms") {
    variant_1 = " ванная"; variant_2 = " ванные"; variant_3 = " ванных";
  }

  let units, lastDigits = totalAmount - (Math.trunc((totalAmount/100)) * 100);
  switch (lastDigits){
    case 1: case 21: case 31: case 41: case 51: case 61: case 71: case 81: case 91:
      units = variant_1;
      break;
    case 2: case 22: case 32: case 42: case 52: case 62: case 72: case 82: case 92:
    case 3: case 23: case 33: case 43: case 53: case 63: case 73: case 83: case 93:
    case 4: case 24: case 34: case 44: case 54: case 64: case 74: case 84: case 94:
      units = variant_2;
      break;
    default:
      units = variant_3;
      break;
  }
  return units
}

// Реализация кнопки 'применить'
function apply (This) {
  let block = searchBlock(This),
    ID = $(block).attr("id"),
    clear = block.find(".list-counter__clear");

  let h3 = $(block).find(".list-counter__item").eq(0).find(".list-counter__minusAndPlus").children("h3");

  let out = new Array (2);
    out[0] = totalAmountNum(ID, clear);
    out[1] = outItems(block);
  if (out[0] == 0) {$('#'+ID+" #total-amount").attr("value", '')}
  else {
    $('#'+ID+" #total-amount").attr("value", out.toString());
  }
  console.log(out)
  totalAmount(This)
  // Поля массива out:
  //  1) поле [общая сумма списка]
  //  2) список с присваиваниями { [пункт1 [заголовок пункта1], [сумма пункта1]],  [пункт2 [заголовок пункта2], [сумма пункта2]] }
  return out
}
function outItems(block) {
  let outItems = new Array(length_items), i = 0;
  $($(block).find(item_selector)).map(function(){
    outItems[i] = new Object ();
    outItems[i].title = $(this).children("h3").text();
    outItems[i].amount = $(this).find(".list-counter__minusAndPlus").children("h3").text();
    i++
  });
  return outItems
}

// Реализация кнопки 'отменить'
function clear(This) {
  let block = searchBlock(This);
    $(block).find(".list-counter__minusAndPlus").find("h3").text(0);
  $("#total-amount").attr("value", '');

  let h3 = $(block).find(".list-counter__item").eq(0).find(".list-counter__minusAndPlus").children("h3"),
    value = parseInt($(h3).text());

  totalAmount(This)
  editButtons()
}

// Функция вывода кнопки "очистить"
function visibleClearButton(totalAmount, clear) {
  if (totalAmount == 0) {$(clear).css("visibility", "hidden")}
  else {$(clear).css("visibility", "visible")}
}

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */