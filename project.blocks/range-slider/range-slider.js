
var ball = document.getElementsByClassName("range-slider__slider")[0];
var left = document.getElementsByClassName("range-slider__limit_left")[0];
var right = document.getElementsByClassName("range-slider__limit_right")[0];

var slider = $( ".range-slider__slider" );
var offset = slider.offset();
var sliderWidth = slider.width();

let valueMin = -100;
let valueMax = 100;
let value = 0;
let step = 10;


left.onmousedown = function(e) { // 1. отследить нажатие
  moveAt_l(e);
  function moveAt_l(e) {
    let marginRight = (e.clientX - offset.left)+"px";
    $(".range-slider__limit.range-slider__limit_left").css("margin-left", marginRight);
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
    let marginLeft = (sliderWidth-(e.clientX - offset.left))-5+"px";
    $(".range-slider__limit.range-slider__limit_right").css("margin-right", marginLeft);
  }

  // 3, перемещать по экрану
  ball.onmousemove = function(e) { moveAt_r(e); }

  // 3. отследить окончание переноса
  right.onmouseup = function() {
    ball.onmousemove = null;
    right.onmouseup = null;
  }
}