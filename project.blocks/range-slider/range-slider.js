
var ball = document.getElementsByClassName("range-slider__slider")[0];
var left = document.getElementsByClassName("range-slider__limit_left")[0];
var right = document.getElementsByClassName("range-slider__limit_right")[0];

var slider = $( ".range-slider__slider" );
var offset = slider.offset();
var sliderWidth = slider.width();
var limitWidth = $(".range-slider__limit").width();

let valueMin = -100;
let valueMax = 100;
let value1 = 10;
let value2 = 60;
let step = 10;

let allUnits = Math.abs(valueMin) + Math.abs(valueMax);
let allSteps = Math.trunc(allUnits / step);
let unit = sliderWidth / allUnits;
let stepPx = Math.round(step * unit);


// делятся на 13 без остатка
// 78
// 91

// приближены к числам делимым на 13 без остатка
// 81
// 89

// отдалены от чисел делимых на 13 без остатка
// 84
// 86

console.log("делятся на 13 без остатка")
console.log("78 % 13: "+(78 % 13))
console.log("91 % 13: "+(91 % 13))
console.log("приближены к числам делимым на 13 без остатка")
console.log("81 % 13: "+(81 % 13))
console.log("90 % 13: "+(90 % 13))
console.log("отдалены от чисел делимых на 13 без остатка")
console.log("84 % 13: "+(84 % 13))
console.log("86 % 13: "+(86 % 13))



function calcNumStep (value, valueMin, step) {
  let i = 0;
  let bufValue = valueMin;
  while (bufValue != value) {
    bufValue += step;
    i++ 
  }
  return i
}

let numStep1 = calcNumStep (value1, valueMin, step);
$(".range-slider__output_1").text(value1);
let Point1MarginLeft = numStep1*stepPx;
$(".range-slider__limit.range-slider__limit_left").css("margin-left", Point1MarginLeft+"px");

let numStep2 = calcNumStep (value2, valueMin, step);
$(".range-slider__output_2").text(value2);
let Point2MarginLeft = numStep2*stepPx;
let Point2MarginRight = sliderWidth - Point2MarginLeft;
$(".range-slider__limit.range-slider__limit_right").css("margin-right", Point2MarginRight+"px");

left.onmousedown = function(e) { // отследить нажатие
  moveAt_l(e);
  function moveAt_l(e) {
    Point1MarginLeft = (e.clientX - offset.left)-(limitWidth/2);
    if ((Point1MarginLeft % stepPx) < (stepPx / 2)) {
      value1 = Math.trunc((valueMin + Point1MarginLeft / stepPx * step)/step)*step;
      $(".range-slider__output_1").text(value1);
    }
    if (Point1MarginLeft < (Point2MarginLeft - stepPx - 12 - 5)) {
      $(".range-slider__limit.range-slider__limit_left").css("margin-left", Point1MarginLeft+"px");
    }
  }
  // перемещать по экрану
  ball.onmousemove = function(e) { moveAt_l(e); }
  // отследить окончание переноса
  left.onmouseup = function() {
    ball.onmousemove = null;
    left.onmouseup = null;
  }
}

right.onmousedown = function(e) { // отследить нажатие
  moveAt_r(e);
  function moveAt_r(e) {
    Point2MarginRight = (sliderWidth-(e.clientX - offset.left))-(limitWidth/2);
    Point2MarginLeft = sliderWidth - Point2MarginRight;
    if (value2 == valueMax) {
      $(".range-slider__limit.range-slider__limit_right").css("margin-right", "0px");
    }
    else if ((Point2MarginRight != 0)&&(Point1MarginLeft < (Point2MarginLeft - stepPx - 12 - 5))) {
      $(".range-slider__limit.range-slider__limit_right").css("margin-right", Point2MarginRight+"px");
    }
    if ((Point2MarginLeft % stepPx) < (stepPx / 2)){
      value2 = Math.trunc((valueMin + Point2MarginLeft / stepPx * step)/step)*step;
      $(".range-slider__output_2").text(value2);
    }
  }
  // перемещать по экрану
  ball.onmousemove = function(e) { moveAt_r(e); }
  // отследить окончание переноса
  right.onmouseup = function() {
    ball.onmousemove = null;
    right.onmouseup = null;
  }
}