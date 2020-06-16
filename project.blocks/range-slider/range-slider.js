//Make the DIV element draggagle:
dragElement(document.getElementById(("mydiv1")));
dragElement(document.getElementById(("mydiv2")));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    let set_pos1 = elmnt.offsetLeft - pos1;
    let set_pos2 = elmnt.offsetTop - pos2;

    // set the element's new position:
    //elmnt.style.top = set_pos2 + "px";
    // console.log("top: "+elmnt.style.top);
    let margin_left_elmnt = $("#"+elmnt.id).css("margin-left");
        margin_left_elmnt = margin_left_elmnt.replace(/[\p\x]/g, '');
        margin_left_elmnt = parseInt(margin_left_elmnt);

    // Если элемент расположен на линии
    let mydiv1_margin_left = $("#mydiv1").css("margin-left").replace(/[\p\x]/g, '');
    let mydiv2_margin_left = $("#mydiv2").css("margin-left").replace(/[\p\x]/g, '');
    let mydiv_raznica = mydiv2_margin_left-mydiv1_margin_left;

    // ЕСЛИ ТОЧКИ СТОЛКНУЛИСЬ
    if (mydiv_raznica <= ($("#mydiv1").css("width").replace(/[\p\x]/g, ''))){
      let margin_left = $("#content").css("margin-left");
          margin_left = margin_left.replace(/[\p\x]/g, '');
          margin_left = parseInt(margin_left);
      let width = $("#content").css("width");
          width = width.replace(/[\p\x]/g, '');
          width = parseInt(width);

      if (elmnt.id == "mydiv2") {
        $("#"+elmnt.id).css("margin-left", margin_left_elmnt+1)
        $("#content").css("width", width+1);
      }
      else if (elmnt.id == "mydiv1") {
        $("#"+elmnt.id).css("margin-left", margin_left_elmnt-1);
        $("#content").css("margin-left", margin_left-1);
        $("#content").css("width", width+1);
      }
    }
    // ЕСЛИ ТОЧКИ В ПРЕДЕЛАХ ЛИНИИ
    else if ((margin_left_elmnt > -1)&&(margin_left_elmnt < 255)){
      let mydiv_id_flag; //1 - false, 2 - true
      // Перемещение пунктов
        margin_left_elmnt -= pos1;
        $("#"+elmnt.id).css("margin-left", margin_left_elmnt)
      // Изменение маргина и ширины выделения
        if (elmnt.id == "mydiv2") {
          let width = $("#content").css("width");
              width = width.replace(/[\p\x]/g, '');
              width = parseInt(width)-pos1;
          $("#content").css("width", width);
          mydiv_id_flag = true
        }
        else if (elmnt.id == "mydiv1") {
          let width = $("#content").css("width");
              width = width.replace(/[\p\x]/g, '');
              width = parseInt(width)+pos1;
          let margin_left = $("#content").css("margin-left");
              margin_left = margin_left.replace(/[\p\x]/g, '');
              margin_left = parseInt(margin_left)-pos1;
          $("#content").css({
            "margin-left" : margin_left,
            "width" : width
          });
          mydiv_id_flag = false
        }
        let $value1 = $("#range-slider-value1");
        let $value2 = $("#range-slider-value2");
        if (margin_left_elmnt > 242) {if (mydiv_id_flag){$value2.text("20 000")}else{$value1.text("20 000")}}
        else if (margin_left_elmnt > 234) {if (mydiv_id_flag){$value2.text("19 000")}else{$value1.text("19 000")}}
        else if (margin_left_elmnt > 226) {if (mydiv_id_flag){$value2.text("18 000")}else{$value1.text("18 000")}}
        else if (margin_left_elmnt > 218) {if (mydiv_id_flag){$value2.text("17 000")}else{$value1.text("17 000")}}
        else if (margin_left_elmnt > 210) {if (mydiv_id_flag){$value2.text("16 000")}else{$value1.text("16 000")}}
        else if (margin_left_elmnt > 201) {if (mydiv_id_flag){$value2.text("15 000")}else{$value1.text("15 000")}}
        else if (margin_left_elmnt > 192) {if (mydiv_id_flag){$value2.text("14 000")}else{$value1.text("14 000")}}
        else if (margin_left_elmnt > 183) {if (mydiv_id_flag){$value2.text("13 000")}else{$value1.text("13 000")}}
        else if (margin_left_elmnt > 174) {if (mydiv_id_flag){$value2.text("12 000")}else{$value1.text("12 000")}}
        else if (margin_left_elmnt > 165) {if (mydiv_id_flag){$value2.text("11 000")}else{$value1.text("11 000")}}
        else if (margin_left_elmnt > 156) {if (mydiv_id_flag){$value2.text("10 000")}else{$value1.text("10 000")}}
        else if (margin_left_elmnt > 139) {if (mydiv_id_flag){$value2.text("9 000")}else{$value1.text("9 000")}}
        else if (margin_left_elmnt > 122) {if (mydiv_id_flag){$value2.text("8 000")}else{$value1.text("8 000")}}
        else if (margin_left_elmnt > 105) {if (mydiv_id_flag){$value2.text("7 000")}else{$value1.text("7 000")}}
        else if (margin_left_elmnt > 88) {if (mydiv_id_flag){$value2.text("6 000")}else{$value1.text("6 000")}}
        else if (margin_left_elmnt > 71) {if (mydiv_id_flag){$value2.text("5 000")}else{$value1.text("5 000")}}
        else if (margin_left_elmnt > 55) {if (mydiv_id_flag){$value2.text("4 000")}else{$value1.text("4 000")}}
        else if (margin_left_elmnt > 41) {if (mydiv_id_flag){$value2.text("3 000")}else{$value1.text("3 000")}}
        else if (margin_left_elmnt > 27) {if (mydiv_id_flag){$value2.text("2 000")}else{$value1.text("2 000")}}
        else if (margin_left_elmnt > 13) {if (mydiv_id_flag){$value2.text("1 000")}else{$value1.text("1 000")}}
        else {if (mydiv_id_flag){$value2.text("0")}else{$value1.text("0")}}
    }

    // ЕСЛИ ТОЧКИ СЛЕВА ОТ ЛИНИИ
    else if (margin_left_elmnt <= -1){
      let width = $("#content").css("width");
          width = width.replace(/[\p\x]/g, '');
          width = parseInt(width)-1;
      let margin_left = $("#content").css("margin-left");
          margin_left = margin_left.replace(/[\p\x]/g, '');
          margin_left = parseInt(margin_left)+1;
      $("#content").css({
        "margin-left" : margin_left,
        "width" : width
      });
      $("#"+elmnt.id).css("margin-left", margin_left_elmnt+1)
    }

    // ЕСЛИ ТОЧКИ СПРАВА ОТ ЛИНИИ
    else if (margin_left_elmnt >= 255){
      let width = $("#content").css("width");
          width = width.replace(/[\p\x]/g, '');
          width = parseInt(width);
      $("#content").css("width", width);
      $("#"+elmnt.id).css("margin-left", margin_left_elmnt-1)
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


