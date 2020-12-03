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

  let allUnits = Math.abs(valueMin) + Math.abs(valueMax);
  let allSteps = Math.trunc(allUnits / step);
  let unit = sliderWidth / allUnits;
  let stepPx = Math.round(step * unit);

  let bufValue = valueMin
  let i = 0;
  while (bufValue < valueMax) {
    if (i % 2 == 0) {
      $(".range-slider__numbers").append("<p class='range-slider__number' style='width: "+(stepPx+limitWidth)+"px'>"+bufValue+"</p>")
    }
    i++;
    bufValue += step;
  }
  if (i % 2 == 0) {
    $(".range-slider__numbers").append("<p class='range-slider__number' style='width: "+(stepPx+limitWidth)+"px'>"+bufValue+"</p>")
  }

  $(".range-slider__numbers").css({"width": sliderWidth+"px"})

  // - ok пофиксить выползание левого элемента за слайдер
  // - ok пофиксить выползание правого элемента за слайдер
  // - ok создать визуальные отметки значений под лимитом
  // - ok пофиксить: значения второго поинтера не меняется на максимальное
  // - ok пофиксить: значения на одних и тех же точках у лимитов разные
  // - ok сделать один onmousedown на слайдер вместо двух onmousedown на каждый поинтер
  // а уже в onmousedown слайдера проверить какой из поитеров ближе к слайдеру
  // - ok при клике на линию поинтер должен переместиться в место клика и установить value
  // - сделать слайдер рабочим на мобилках (сделать проверку на мобилку перед выводом результата)
  // - пофиксить левый лимит ломающий минимальный размер выделения
  // - пофиксить правый лимит ломающий минимальный размер выделения
  // - учесть то, что изначально может задано максимальное значение для второго элемента
  // из-за чего нужно будет автозаполнять концовку слайдера

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
  let Point2MarginRight = sliderWidth - Point2MarginLeft - limitWidth;
  $(".range-slider__limit.range-slider__limit_right").css("margin-right", Point2MarginRight+"px");

  ball.onmousedown = function(e) {
    let PointMarginLeft = (e.clientX - offset.left)-(limitWidth/2);
    let intervalPoints = Point2MarginLeft - Point1MarginLeft; // находим интервал между 1 и 2 поинтером
    let centerPoints = Point1MarginLeft + intervalPoints / 2; // находим центр маргин лефт между 1 и 2 поинтером
    // console.log('intervalPoints: '+intervalPoints)
    // console.log('(old)Point1MarginLeft: '+Point1MarginLeft)
    // console.log('(old)Point2MarginLeft: '+Point2MarginLeft)
    // console.log('(old)Point2MarginRight: '+Point2MarginRight)
    // console.log('centerPoints: '+centerPoints)
    if (PointMarginLeft < centerPoints) { //если новый маргин лефт < центра, то двигаем левый поинтер
      Point1MarginLeft = PointMarginLeft;
      // console.log('(new)Point1MarginLeft: '+Point1MarginLeft)
      function moveAt_l(e) {
        Point1MarginLeft = (e.clientX - offset.left)-(limitWidth/2);
        if (Point1MarginLeft < (stepPx / 2)) {
          $(".range-slider__limit.range-slider__limit_left").css("margin-left", "0px");
          value1 = valueMin;
          $(".range-slider__output_1").text(value1);
        }
        else if ((Point1MarginLeft > 0)&&(Point1MarginLeft < (Point2MarginLeft - stepPx))) {
          $(".range-slider__limit.range-slider__limit_left").css("margin-left", Point1MarginLeft+"px");
        }
        if ((Point1MarginLeft % stepPx) > (stepPx / 2)){
          value1 = Math.round((valueMin + Point1MarginLeft / stepPx * step)/step)*step;
          $(".range-slider__output_1").text(value1);
        }
      }
      ball.onmousemove = function(e) { moveAt_l(e) }
      left.onmouseup = function() {
        ball.onmousemove = null;
        left.onmouseup = null;
      }
      // console.log('left!')
    }
    else { //иначе двигаем правый поинтер
      Point2MarginLeft = PointMarginLeft;
      // console.log('(new)Point2MarginLeft: '+Point2MarginLeft)
      Point2MarginRight = sliderWidth - limitWidth - Point2MarginLeft
      // console.log('(new)Point2MarginRight: '+Point2MarginRight)
      function moveAt_r(e) {
        Point2MarginRight = (sliderWidth-(e.clientX - offset.left))-(limitWidth/2);
        Point2MarginLeft = sliderWidth - Point2MarginRight - limitWidth;
        if (value2 == valueMax) {
          $(".range-slider__limit.range-slider__limit_right").css("margin-right", "0px");
        }
        else if ((Point2MarginRight > 0)&&(Point1MarginLeft < (Point2MarginLeft - stepPx))) {
          $(".range-slider__limit.range-slider__limit_right").css("margin-right", Point2MarginRight+"px");
        }
        if ((Point2MarginLeft % stepPx) > (stepPx / 2)){
          value2 = Math.round((valueMin + Point2MarginLeft / stepPx * step)/step)*step;
          $(".range-slider__output_2").text(value2);
        }
      }
      ball.onmousemove = function(e) { moveAt_r(e) }
      right.onmouseup = function() {
        ball.onmousemove = null;
        right.onmouseup = null;
      }
      // console.log('right!')
    }
  }
}