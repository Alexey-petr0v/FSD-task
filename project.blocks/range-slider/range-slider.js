

 let offset;

 sayHi();
 function sayHi() {
     offset = $("#content").offset();
     //console.log( "left: " + offset.left + ", top: " + offset.top );
     //setTimeout(sayHi, 7000);
 }

let mouseStatus;
let slider_width = $( "#target" ).css("width");
    slider_width = slider_width.replace(/[\p\x]/g, '');
    slider_width = parseInt(slider_width);

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
                    accent_margin_left = (accent_margin_left+raznica)+"px";
                    accent_width = (accent_width-raznica)+"px";
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
                    console.log("(L)event.pageX : "+event.pageX);
                    console.log("(L)offset.left: "+offset.left);
                    console.log("(L)offset.left+accent_width: "+(offset.left+accent_width));
                    console.log("(L)raznica: "+raznica);
                    console.log("(L)accent_width: "+accent_width);
                    accent_width = (accent_width-raznica)+"px";
                    console.log("(L)accent_margin_left: "+accent_margin_left);
                    console.log("(L)accent_width: "+accent_width);
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
                    console.log("(R)event.pageX : "+event.pageX);
                    console.log("(R)offset.left: "+offset.left);
                    console.log("(R)offset.left+accent_width: "+(offset.left+accent_width));
                    console.log("(R)raznica: "+raznica);
                    console.log("(R)accent_width: "+accent_width);
                    accent_width = (accent_width+raznica)+"px";
                    console.log("(R)accent_margin_left: "+accent_margin_left);
                    console.log("(R)accent_width: "+accent_width);
                    $("#content").css({
                        "margin-left" : accent_margin_left,
                        "width" : accent_width
                    })
                    msg += event.pageX + ", " + event.pageY;
                    //$( "#log" ).append( "<div>" + msg + "</div>" );
                }
            }

        // (L)event.pageX : 967
        // (L)offset.left: 910.3875122070312
        // (L)offset.left+accent_width: 998.3875122070312
        // (L)raznica: 31
        // (L)accent_width: 88
        // (L)accent_margin_left: 82
        // (L)accent_width: 57px

        // (R)event.pageX : 968
        // (R)offset.left: 910.3875122070312
        // (R)offset.left+accent_width: 967.3875122070312
        // (R)raznica: 115
        // (R)accent_width: 57
        // (R)accent_margin_left: 82
        // (R)accent_width: 172px

        // (L)event.pageX : 969
        // (L)offset.left: 968.3875122070312
        // (L)offset.left+accent_width: 1082.3875122070312
        // (L)raznica: 113
        // (L)accent_width: 114
        // (L)accent_margin_left: 140
        // (L)accent_width: 1px


        // (L)event.pageX : 967
        // (L)offset.left: 910.3875122070312
        // (L)offset.left+accent_width: 998.3875122070312
        // (L)raznica: 31
        // (L)accent_width: 88
        // (L)accent_margin_left: 82
        // (L)accent_width: 57px

        // (R)event.pageX : 968
        // (R)offset.left: 910.3875122070312
        // (R)offset.left+accent_width: 967.3875122070312
        // (R)raznica: 115
        // (R)accent_width: 57
        // (R)accent_margin_left: 82
        // (R)accent_width: 172px

        // (L)event.pageX : 969
        // (L)offset.left: 968.3875122070312
        // (L)offset.left+accent_width: 1082.3875122070312
        // (L)raznica: 113
        // (L)accent_width: 114
        // (L)accent_margin_left: 140
        // (L)accent_width: 1px

        }
    });
});

$( "#target" ).mouseup(function(){
    mouseStatus = false;
})