
import {getID} from '../../pages/scripts/generate_ID.js'
let radnom_set = new Set();
let numberOfClasses = 0;

// Функция подсчета количества элементов с классом dropdown на странице
$('.range-slider').map(function sumOfClasses() {
  numberOfClasses++
  });


// Массив идентификатов всех элементов с классами range-slider
let uniqueIDTop = new Array(numberOfClasses);

// Установка случайных ID всем классам range-slider
let iteration = 0;
$('.range-slider').map(function() {
  uniqueIDTop[iteration] = getID(12, radnom_set);
  $(this).attr('id', uniqueIDTop[iteration]);

  let ID_left = uniqueIDTop[iteration]+'_left';
  $(this).find(".range-slider__limit_left").attr('id', ID_left);
  $(this).find(".range-slider__limit_left").children().attr('id', ID_left+"_point");
  dragElement(document.getElementById((ID_left)));

  let ID_right = uniqueIDTop[iteration]+'_right';
  $(this).find(".range-slider__limit_right").attr('id', ID_right);
  $(this).find(".range-slider__limit_right").children().attr('id', ID_right+"_point")
  dragElement(document.getElementById((ID_right)));

  let ID_accent = uniqueIDTop[iteration]+'_accent';
  $(this).find(".range-slider__accent").attr('id', ID_accent);

  iteration = iteration + 1;
});

function dragElement(elmnt) {
  let parent_id = $("#"+elmnt.id).parent().parent().attr("id");
  let left_id = "#"+parent_id+"_left";
  let right_id = "#"+parent_id+"_right";
  let accent_id = "#"+parent_id+"_accent";

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "_point")) {
    document.getElementById(elmnt.id + "_point").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let margin_left_elmnt = $("#"+elmnt.id).css("margin-left");
    if (typeof margin_left_elmnt !== 'undefined') {
      margin_left_elmnt = margin_left_elmnt.replace(/[\p\x]/g, '');
      margin_left_elmnt = parseInt(margin_left_elmnt);
    };

    // Если элемент расположен на линии
    let mydiv1_margin_left = $(left_id).css("margin-left");
    let mydiv2_margin_left = $(right_id).css("margin-left");

    if ((typeof mydiv1_margin_left !== 'undefined')&&(typeof mydiv2_margin_left !== 'undefined')) {
      mydiv1_margin_left = mydiv1_margin_left.replace(/[\p\x]/g, '');
      mydiv2_margin_left = mydiv2_margin_left.replace(/[\p\x]/g, '');
    };

    let mydiv_raznica = mydiv2_margin_left-mydiv1_margin_left;

    let width_elmnt = $("#"+elmnt.id).css("width").replace(/[\p\x]/g, '');

    // ЕСЛИ ТОЧКИ СТОЛКНУЛИСЬ
    if (mydiv_raznica <= width_elmnt){
      let margin_left = $(accent_id).css("margin-left");
          margin_left = margin_left.replace(/[\p\x]/g, '');
          margin_left = parseInt(margin_left);
      let width = $(accent_id).css("width");
          width = width.replace(/[\p\x]/g, '');
          width = parseInt(width);

      if ("#"+elmnt.id == right_id) {
        $("#"+elmnt.id).css("margin-left", margin_left_elmnt+1)
        $(accent_id).css("width", width+1);
      }
      else if ("#"+elmnt.id == left_id) {
        $("#"+elmnt.id).css("margin-left", margin_left_elmnt-1);
        $(accent_id).css("margin-left", margin_left-1);
        $(accent_id).css("width", width+1);
      }
    }
    // ЕСЛИ ТОЧКИ В ПРЕДЕЛАХ ЛИНИИ
    else if ((margin_left_elmnt > -1)&&(margin_left_elmnt < 255)){
      let mydiv_id_flag; //1 - false, 2 - true
      // Перемещение пунктов
        margin_left_elmnt -= pos1;
        $("#"+elmnt.id).css("margin-left", margin_left_elmnt)
      // Изменение маргина и ширины выделения
        if ("#"+elmnt.id == (right_id)) {
          let width = $(accent_id).css("width");
              width = width.replace(/[\p\x]/g, '');
              width = parseInt(width)-pos1;
          $(accent_id).css("width", width);
          mydiv_id_flag = true
        }
        else if ("#"+elmnt.id == (left_id)) {
          let width = $(accent_id).css("width");
              width = width.replace(/[\p\x]/g, '');
              width = parseInt(width)+pos1;
          let margin_left = $(accent_id).css("margin-left");
              margin_left = margin_left.replace(/[\p\x]/g, '');
              margin_left = parseInt(margin_left)-pos1;
          $(accent_id).css({
            "margin-left" : margin_left,
            "width" : width
          });
          mydiv_id_flag = false
        }
        let output1 = $("#"+parent_id).find(".range-slider__output_1");
        let output2 = $("#"+parent_id).find(".range-slider__output_2");
        let input = $("#"+parent_id).find("input");
        if      (margin_left_elmnt > 242) {setValues(input, mydiv_id_flag, output1, output2, "20 000")}
        else if (margin_left_elmnt > 234) {setValues(input, mydiv_id_flag, output1, output2, "19 000")}
        else if (margin_left_elmnt > 226) {setValues(input, mydiv_id_flag, output1, output2, "18 000")}
        else if (margin_left_elmnt > 218) {setValues(input, mydiv_id_flag, output1, output2, "17 000")}
        else if (margin_left_elmnt > 210) {setValues(input, mydiv_id_flag, output1, output2, "16 000")}
        else if (margin_left_elmnt > 201) {setValues(input, mydiv_id_flag, output1, output2, "15 000")}
        else if (margin_left_elmnt > 192) {setValues(input, mydiv_id_flag, output1, output2, "14 000")}
        else if (margin_left_elmnt > 183) {setValues(input, mydiv_id_flag, output1, output2, "13 000")}
        else if (margin_left_elmnt > 174) {setValues(input, mydiv_id_flag, output1, output2, "12 000")}
        else if (margin_left_elmnt > 165) {setValues(input, mydiv_id_flag, output1, output2, "11 000")}
        else if (margin_left_elmnt > 156) {setValues(input, mydiv_id_flag, output1, output2, "10 000")}
        else if (margin_left_elmnt > 139) {setValues(input, mydiv_id_flag, output1, output2, "9 000")}
        else if (margin_left_elmnt > 122) {setValues(input, mydiv_id_flag, output1, output2, "8 000")}
        else if (margin_left_elmnt > 105) {setValues(input, mydiv_id_flag, output1, output2, "7 000")}
        else if (margin_left_elmnt > 88)  {setValues(input, mydiv_id_flag, output1, output2, "6 000")}
        else if (margin_left_elmnt > 71)  {setValues(input, mydiv_id_flag, output1, output2, "5 000")}
        else if (margin_left_elmnt > 55)  {setValues(input, mydiv_id_flag, output1, output2, "4 000")}
        else if (margin_left_elmnt > 41)  {setValues(input, mydiv_id_flag, output1, output2, "3 000")}
        else if (margin_left_elmnt > 27)  {setValues(input, mydiv_id_flag, output1, output2, "2 000")}
        else if (margin_left_elmnt > 13)  {setValues(input, mydiv_id_flag, output1, output2, "1 000")}
        else                              {setValues(input, mydiv_id_flag, output1, output2, "0")}
    }

    // ЕСЛИ ТОЧКИ СЛЕВА ОТ ЛИНИИ
    else if (margin_left_elmnt <= -1){
      let width = $(accent_id).css("width");
          width = width.replace(/[\p\x]/g, '');
          width = parseInt(width)-1;
      let margin_left = $(accent_id).css("margin-left");
          margin_left = margin_left.replace(/[\p\x]/g, '');
          margin_left = parseInt(margin_left)+1;
      $(accent_id).css({
        "margin-left" : margin_left,
        "width" : width
      });
      $("#"+elmnt.id).css("margin-left", margin_left_elmnt+1)
    }

    // ЕСЛИ ТОЧКИ СПРАВА ОТ ЛИНИИ
    else if (margin_left_elmnt >= 255){
      let width = $(accent_id).css("width");
          width = width.replace(/[\p\x]/g, '');
          width = parseInt(width);
      $(accent_id).css("width", width);
      $("#"+elmnt.id).css("margin-left", margin_left_elmnt-1)
    }
  }

  // Установка результата в инпут
  function setValues(input, flag, out1, out2, val) {
    if (flag) {
      out2.text(val);
      $(input).attr("data-output2", val);
      let output1 = $(input).attr("data-output1");
      $(input).attr("value", "{output1: "+output1+", output2: "+val+"}")
    }
    else {
      out1.text(val);
      $(input).attr("data-output1", val);
      let output2 = $(input).attr("data-output2");
      $(input).attr("value", "{output1: "+val+", output2: "+output2+"}")
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


