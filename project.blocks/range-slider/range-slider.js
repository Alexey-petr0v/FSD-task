if ($(".range-slider").length) {
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

  $(".range-slider__limit.range-slider__limit_left").css("margin-left", "100px");
  $(".range-slider__limit.range-slider__limit_right").css("margin-left", "200px");

  ball.onmousedown = function(e) { // 1. отследить нажатие
    console.log('onmousedown');
    // подготовить к перемещению
    // 2. разместить на том же месте, но в абсолютных координатах
    // left.style.position = 'absolute';
    // right.style.position = 'absolute';
    moveAt(e);

    // console.log("left.offsetWidth: "+left.offsetWidth);
    // right.style.left = e.pageX - right.offsetWidth / 2 + 'px';
  
    // передвинуть мяч под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(e) {
      // left.style.left = e.pageX - left.offsetWidth / 2 + 'px';
      // var clientX = pageX - document.documentElement.scrollLeft;
    // let clientX = pageX - document.ball.scrollLeft;
    // console.log('clientX: '+clientX);
    console.log('e.left: '+(e.left));
    console.log('e.pageX: '+e.pageX);
      // $(".range-slider__limit.range-slider__limit_left").css("margin-left", e.pageX - clientX + 'px');
    }
  
    // 3, перемещать по экрану
    document.onmousemove = function(e) {
      moveAt(e);
    }
  
    // 4. отследить окончание переноса
    left.onmouseup = function() {
      document.onmousemove = null;
      left.onmouseup = null;
    }
  }



}