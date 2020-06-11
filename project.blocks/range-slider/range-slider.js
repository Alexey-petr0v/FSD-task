

let offset_limit_1;
// let offset_limit_1_left;
// let offset_limit_1_right;
let offset_limit_2;
// let offset_limit_2_left;
// let offset_limit_2_right;
let center;

 sayHi();
 function sayHi() {
    offset_limit_1 = $("#limit_1").offset();
    // offset_limit_1_left = parseInt(offset_limit_1.left);
    // offset_limit_1_left = Math.round(offset_limit_1_left);
    offset_limit_2 = $("#limit_2").offset();
    // offset_limit_2 = parseInt(offset_limit_2);
    // offset_limit_2 = Math.round(offset_limit_2);
    //console.log( "left: " + offset.left + ", top: " + offset.top );
    //setTimeout(sayHi, 7000);
 }

let mouseStatus;
let slider_width = $( "#target" ).css("width");
    slider_width = slider_width.replace(/[\p\x]/g, '');
    slider_width = parseInt(slider_width);


$( "#target" ).mousedown(function() {
    sayHi();
    mouseStatus = true;
    $( "#target" ).mousemove(function( event ) {
        if (mouseStatus) {
            console.log(offset_limit_1.left)
            //center = offset_limit_1.left
            //if (event.pageX < )
        }
    });
});


$( "#target" ).mouseup(function(){
    mouseStatus = false;
})


// Всего у слайдера 3 элемента:
// 1) Контейнер-полоса
// 2) белый флекс прилипший слева
// 3) белый флекс прилипший справа
// у левого флекса меняется ширина
// у правого флекса меняется ширина



/*
$( "#target" ).mousedown(function() {
    mouseStatus = true;
    $( "#target" ).mousemove(function( event ) {
        if (mouseStatus) {
            var msg = "Handler for .mousemove() called at ";
            let raznica;
            let accent_margin_left = $("#content").css("margin-left");
                accent_margin_left = accent_margin_left.replace(/[\p\x]/g, '');
                accent_margin_left = parseInt(accent_margin_left);

            let accent_width = $("#content").css("width");
                accent_width = accent_width.replace(/[\p\x]/g, '');
                accent_width = parseInt(accent_width);
                
            if ((event.pageX < offset.left)){
                sayHi();
                raznica = offset.left - event.pageX;
                raznica = Math.round(raznica);
                if (raznica > 30){
                    accent_margin_left = (accent_margin_left-raznica)+"px";
                    accent_width = (accent_width+raznica)+"px";
                    console.log("(L1)event.pageX : "+event.pageX);
                    console.log("(L1)offset.left: "+offset.left);
                    console.log("(L1)offset.left+accent_width: "+(offset.left+accent_width));
                    console.log("(L1)raznica: "+raznica);
                    console.log("(L1)accent_width: "+accent_width);
                    console.log("(L1)accent_margin_left: "+accent_margin_left);
                    sayHi();
                    console.log("(L1)accent_margin_left: "+accent_margin_left);
                    console.log("(L1)accent_width: "+accent_width);
                    $("#content").css({
                        "margin-left" : accent_margin_left,
                        "width" : accent_width
                    })
                    msg += event.pageX + ", " + event.pageY;
                    //$( "#log" ).append( "<div>" + msg + "</div>" );
                }
            }
            else if ((event.pageX > offset.left)&&(event.pageX <= (offset.left+(accent_width/2)))&&(accent_width > (slider_width / 4))) {
                sayHi();
                raznica = event.pageX - offset.left;
                raznica = Math.round(raznica);
                if (raznica > 30) {
                    console.log("(R1)event.pageX : "+event.pageX);
                    console.log("(R1)offset.left: "+offset.left);
                    console.log("(R1)offset.left+accent_width: "+(offset.left+accent_width));
                    console.log("(R1)raznica: "+raznica);
                    console.log("(R1)accent_width: "+accent_width);
                    console.log("(R1)accent_margin_left: "+accent_margin_left);
                    accent_margin_left = (accent_margin_left+raznica)+"px";
                    accent_width = (accent_width-raznica)+"px";
                    sayHi();
                    console.log("(R1)accent_margin_left: "+accent_margin_left);
                    console.log("(R1)accent_width: "+accent_width);
                    $("#content").css({
                        "margin-left" : accent_margin_left,
                        "width" : accent_width
                    })
                    msg += event.pageX + ", " + event.pageY;
                    //$( "#log" ).append( "<div>" + msg + "</div>" );
                }
            }
            else if ((event.pageX > (offset.left+(accent_width/2)))&&(event.pageX < (offset.left+accent_width))&&(accent_width > (slider_width / 4))) {
                sayHi();
                raznica = offset.left+accent_width - event.pageX;
                raznica = Math.round(raznica);
                if (raznica > 30) {
                    console.log("(L2)event.pageX : "+event.pageX);
                    console.log("(L2)offset.left: "+offset.left);
                    console.log("(L2)offset.left+accent_width: "+(offset.left+accent_width));
                    console.log("(L2)raznica: "+raznica);
                    console.log("(L2)accent_width: "+accent_width);
                    accent_width = (accent_width-raznica)+"px";
                    sayHi();
                    console.log("(L2)accent_margin_left: "+accent_margin_left);
                    console.log("(L2)accent_width: "+accent_width);
                    $("#content").css({
                        "margin-left" : accent_margin_left,
                        "width" : accent_width
                    })
                    msg += event.pageX + ", " + event.pageY;
                    //$( "#log" ).append( "<div>" + msg + "</div>" );
                }
            }
            else if (event.pageX > (offset.left+accent_width)) {
                sayHi();
                raznica = event.pageX - offset.left+accent_width;
                raznica = Math.round(raznica);
                if (raznica > 30) {
                    console.log("(R2)event.pageX : "+event.pageX);
                    console.log("(R2)offset.left: "+offset.left);
                    console.log("(R2)offset.left+accent_width: "+(offset.left+accent_width));
                    console.log("(R2)raznica: "+raznica);
                    console.log("(R2)accent_width: "+accent_width);
                    accent_width = (accent_width+raznica)+"px";
                    sayHi();
                    console.log("(R2)accent_margin_left: "+accent_margin_left);
                    console.log("(R2)accent_width: "+accent_width);
                    $("#content").css({
                        "margin-left" : accent_margin_left,
                        "width" : accent_width
                    })
                    msg += event.pageX + ", " + event.pageY;
                    //$( "#log" ).append( "<div>" + msg + "</div>" );
                }
            }
        }
    });
});
*/

// (L2)event.pageX : 967
// (L2)offset.left: 910.3875122070312
// (L2)offset.left+accent_width: 998.3875122070312
// (L2)raznica: 31
// (L2)accent_width: 88
// (L2)accent_margin_left: 82
// (L2)accent_width: 57px

// (R2)event.pageX : 968
// (R2)offset.left: 910.3875122070312
// (R2)offset.left+accent_width: 967.3875122070312
// (R2)raznica: 115
// (R2)accent_width: 57
// (R2)accent_margin_left: 82
// (R2)accent_width: 172px

// (R1)event.pageX : 968
// (R1)offset.left: 910.3875122070312
// (R1)offset.left+accent_width: 1082.3875122070312
// (R1)raznica: 58
// (R1)accent_width: 172
// (R1)accent_margin_left: 82
// (R1)accent_margin_left: 140px
// (R1)accent_width: 114px

// (L2)event.pageX : 969
// (L2)offset.left: 968.3875122070312
// (L2)offset.left+accent_width: 1082.3875122070312
// (L2)raznica: 113
// (L2)accent_width: 114
// (L2)accent_margin_left: 140
// (L2)accent_width: 1px