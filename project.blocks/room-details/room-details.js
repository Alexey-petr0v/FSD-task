

let r = 60;

let percent_1 = 25; // Green
let percent_2 = 25; // Purple
let percent_3 = 50; // Orange

let white_line_1_2 = false;
let white_line_2_2 = false;
let white_line_3_2 = false;


// first line
let percent_1_2 = 0;
let degree_1;
let degree_1_2 = 0;
if (percent_1 > 50) {
    percent_1_2 = percent_1-50;
    degree_1 = 50 / 5 * 18;
    degree_1_2 = percent_1_2 / 5 * 18+degree_1;
    white_line_1_2 = true
}
else {
    degree_1 = percent_1 / 5 * 18;
    degree_1_2 = degree_1;
}
let radian_1 = degree_1 * 0.01745;
let radian_1_2 = degree_1_2 * 0.01745;


// Second line
let percent_2_2 = 0;
let degree_2;
let degree_2_2 = 0;
if (percent_2 > 50) {
    percent_2_2 = percent_2-50;
    degree_2 = 50 / 5 * 18+degree_1_2;
    degree_2_2 = percent_2_2 / 5 * 18+degree_2;
    white_line_2_2 = true
}
else {
    degree_2 = percent_2 / 5 * 18+degree_1_2;
    degree_2_2 = degree_2;
}
let radian_2 = degree_2 * 0.01745;
let radian_2_2 = degree_2_2 * 0.01745;


// Third line
let percent_3_2 = 0;
let degree_3;
let degree_3_2 = 0;
if (percent_3 > 50) {
    percent_3_2 = percent_3-50;
    degree_3 = 50 / 5 * 18+degree_2_2;
    degree_3_2 = percent_3_2 / 5 * 18+degree_3;
    white_line_3_2 = true
}
else {
    degree_3 = percent_3 / 5 * 18+degree_2_2;
    degree_3_2 = degree_3;
}
let radian_3 = degree_3 * 0.01745;
let radian_3_2 = degree_3_2 * 0.01745;




let first_y = 60;
let first_x = 0;
let x_1 = Math.round(r*Math.sin(radian_1));
let y_1 = Math.round(r*Math.cos(radian_1));
let x_1_2 = Math.round(r*Math.sin(radian_1_2));
let y_1_2 = Math.round(r*Math.cos(radian_1_2));
let x_2 = Math.round(r*Math.sin(radian_2));
let y_2 = Math.round(r*Math.cos(radian_2));
let x_2_2 = Math.round(r*Math.sin(radian_2_2));
let y_2_2 = Math.round(r*Math.cos(radian_2_2));
let x_3 = Math.round(r*Math.sin(radian_3));
let y_3 = Math.round(r*Math.cos(radian_3));
let x_3_2 = Math.round(r*Math.sin(radian_3_2));
let y_3_2 = Math.round(r*Math.cos(radian_3_2));


let x_1_white, x_2_white, x_3_white,
    y_1_white, y_2_white, y_3_white;

if (white_line_1_2) {
    x_1_white = x_1_2+(x_1_2*0.035);
    y_1_white = y_1_2+(y_1_2*0.035);
}
else {
    x_1_white = x_1+(x_1*0.035);
    y_1_white = y_1+(y_1*0.035);
}

if (white_line_2_2) {
    x_2_white = x_2_2+(x_2_2*0.035);
    y_2_white = y_2_2+(y_2_2*0.035);
}
else {
    x_2_white = x_2+(x_2*0.035);
    y_2_white = y_2+(y_2*0.035);
}

if (white_line_3_2) {
    x_3_white = x_3_2+(x_3_2*0.035);
    y_3_white = y_3_2+(y_3_2*0.035);
}
else {
    x_3_white = x_3+(x_3*0.035);
    y_3_white = y_3+(y_3*0.035);
}


$(".room-details__ellipse-border").prepend('<svg viewBox="-62 -62 124 124" width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
'<circle cx="0" cy="0" r="60" fill="white"/>'+
'<defs>'+
'<linearGradient id="Gradient_1_1" x1="0" x2="0" y1="1" y2="0">'+
'<stop class="stop1" offset="0%"/>'+
'<stop class="stop2" offset="100%"/>'+
'</linearGradient>'+
'<linearGradient id="Gradient_1_2" x1="0" x2="0" y1="1" y2="0">'+
'<stop class="stop1" offset="0%"/>'+
'<stop class="stop2" offset="100%"/>'+
'</linearGradient>'+
'<linearGradient id="Gradient_2_1" x1="0" x2="0" y1="1" y2="0">'+
'<stop class="stop1" offset="0%"/>'+
'<stop class="stop2" offset="100%"/>'+
'</linearGradient>'+
'<linearGradient id="Gradient_2_2" x1="0" x2="0" y1="1" y2="0">'+
'<stop class="stop1" offset="0%"/>'+
'<stop class="stop2" offset="100%"/>'+
'</linearGradient>'+
'<linearGradient id="Gradient_3_1" x1="0" x2="0" y1="1" y2="0">'+
'<stop class="stop1" offset="0%"/>'+
'<stop class="stop2" offset="100%"/>'+
'</linearGradient>'+
'<linearGradient id="Gradient_3_2" x1="0" x2="0" y1="1" y2="0">'+
'<stop class="stop1" offset="0%"/>'+
'<stop class="stop2" offset="100%"/>'+
'</linearGradient>'+
'</defs>'+
'<path id="path_1_1" d="M'+first_x+','+first_y+' A60,60 0 0,0 '+x_1+','+y_1+'" fill="none" stroke="green" stroke-width="4"/>'+
'<path id="path_1_2" d="M'+x_1+','+y_1+' A60,60 0 0,0 '+x_1_2+','+y_1_2+'" fill="none" stroke="green" stroke-width="4"/>'+
'<path id="path_2_1" d="M'+x_1_2+','+y_1_2+' A60,60 0 0,0 '+x_2+','+y_2+'" fill="none" stroke="purple" stroke-width="4"/>'+
'<path id="path_2_2" d="M'+x_2+','+y_2+' A60,60 0 0,0 '+x_2_2+','+y_2_2+'" fill="none" stroke="purple" stroke-width="4"/>'+
'<path id="path_3_2" d="M'+x_2_2+','+y_2_2+' A60,60 0 0,0 '+x_3+','+y_3+'" fill="none" stroke="orange" stroke-width="4"/>'+
'<path id="path_3_2" d="M'+x_3+','+y_3+' A60,60 0 0,0 '+first_x+','+first_y+'" fill="none" stroke="orange" stroke-width="4"/>'+
'<path d="M'+0+','+0+' A0,0 0 0,0 '+x_1_white+','+y_1_white+'" fill="none" stroke="white" stroke-width="2"/>'+
'<path d="M'+0+','+0+' A0,0 0 0,0 '+x_2_white+','+y_2_white+'" fill="none" stroke="white" stroke-width="2"/>'+
'<path d="M'+0+','+0+' A0,0 0 0,0 '+x_3_white+','+y_3_white+'" fill="none" stroke="white" stroke-width="2"/>'+
'</svg>');

