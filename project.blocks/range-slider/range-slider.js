
var ball = document.getElementsByClassName("range-slider__slider")[0];
var left = document.getElementsByClassName("range-slider__limit_left")[0];
var right = document.getElementsByClassName("range-slider__limit_right")[0];

var slider = $( ".range-slider__slider" );
var offset = slider.offset();
var sliderWidth = slider.width();
//var lineWidth = $(".range-slider__line").width();

let valueMin = -100;
let valueMax = 100;
let value = 0;
let step = 10;


let allUnits = Math.abs(valueMin) + Math.abs(valueMax);
console.log("allUnits: "+allUnits);

let unit = sliderWidth / allUnits;
console.log("unit: "+unit);
let stepPx = Math.round(step * unit);
console.log("stepPx: "+stepPx);

// ok 1. Определить сколько пикселей в одной единице
// ok 2. Определить размер шага в пикселях
// 3. Заменить проверку вывода "Point1MarginLeft % stepPx == 0" на уравнение:
// (Point1MarginLeft / 13).беру-целое
// нахожу половину от 13
// если (Point1MarginLeft / 13) < (половины от 13)
// переместить на Point1MarginLeft
/// иначе ереместить на Point1MarginLeft+13
// ..
// сделать остановку захвата поинтера при клике на весь слайдер?


let Point1MarginLeft = $(".range-slider__limit.range-slider__limit_left").css("margin-left").replace(/px/i, '');
console.log("Point1MarginLeft: "+Point1MarginLeft)

let Point2MarginRight = $(".range-slider__limit.range-slider__limit_right").css("margin-right").replace(/px/i, '');
console.log("Point2MarginRight: "+Point2MarginRight)
let Point2MarginLeft = sliderWidth - Point2MarginRight;
console.log("Point2MarginLeft: "+Point2MarginLeft)

left.onmousedown = function(e) { // 1. отследить нажатие
  moveAt_l(e);
  function moveAt_l(e) {
    Point1MarginLeft = (e.clientX - offset.left);
    if ((Point1MarginLeft % stepPx == 0)&&(Point1MarginLeft < (Point2MarginLeft - stepPx - 12 - 5))){
      //lineWidth = $(".range-slider__accent").width();
      //console.log("lineWidth: "+lineWidth, "Point1MarginLeft: "+Point1MarginLeft, ", Point2MarginLeft: "+Point2MarginLeft);
      $(".range-slider__limit.range-slider__limit_left").css("margin-left", Point1MarginLeft+"px");
    }
  }

  // 3, перемещать по экрану
  ball.onmousemove = function(e) { moveAt_l(e); }

  // 3. отследить окончание переноса
  left.onmouseup = function() {
    ball.onmousemove = null;
    left.onmouseup = null;
  }
}


right.onmousedown = function(e) { // 1. отследить нажатие
  moveAt_r(e);
  function moveAt_r(e) {
    Point2MarginRight = (sliderWidth-(e.clientX - offset.left))-5;
    Point2MarginLeft = sliderWidth - Point2MarginRight;
    if (Point2MarginLeft % stepPx == 0){
      //lineWidth = $(".range-slider__accent").width();
      //console.log("lineWidth: "+lineWidth, "Point2MarginRight: "+Point2MarginRight, ", Point2MarginLeft: "+Point2MarginLeft);
      $(".range-slider__limit.range-slider__limit_right").css("margin-right", Point2MarginRight+"px");
    }
  }

  // 3, перемещать по экрану
  ball.onmousemove = function(e) { moveAt_r(e); }

  // 3. отследить окончание переноса
  right.onmouseup = function() {
    ball.onmousemove = null;
    right.onmouseup = null;
  }
}