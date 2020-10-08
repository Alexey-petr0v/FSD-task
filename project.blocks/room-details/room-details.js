

let r = 60;

let percent_1 = 25;
let percent_2 = 25;
let percent_3 = 50;

let degree_1 = percent_1 / 5 * 18;
let degree_2 = percent_2 / 5 * 18+degree_1;
let degree_3 = percent_3 / 5 * 18+degree_2;

let radian_1 = degree_1 * 0.01745;
let radian_2 = degree_2 * 0.01745;
let radian_3 = degree_3 * 0.01745;


let first_x = 0;
let first_y = 60;
let x_1 = Math.round(r*Math.cos(radian_1));
let y_1 = Math.round(r*Math.sin(radian_1));
let x_2 = Math.round(r*Math.cos(radian_2));
let y_2 = Math.round(r*Math.sin(radian_2));
let x_3 = Math.round(r*Math.cos(radian_3));
let y_3 = Math.round(r*Math.sin(radian_3));

console.log("Math.cos(radian_1): "+Math.cos(radian_1))
console.log("Math.sin(radian_1): "+Math.sin(radian_1))

console.log("degree_1: "+degree_1)
console.log("degree_2: "+degree_2)
console.log("degree_3: "+degree_3)

console.log("x_1: "+x_1)
console.log("y_1: "+y_1)
console.log("x_2: "+x_2)
console.log("y_2: "+y_2)
console.log("x_3: "+x_3)
console.log("y_3: "+y_3)



$(".room-details__ellipse-border").append('<svg viewBox="-62 -62 124 124" width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
'<path d="M'+first_x+','+first_y+' A60,60 0 0,0 '+x_1+','+y_1+'" fill="none" stroke="green" stroke-width="4"/>'+
'<path d="M'+x_1+','+y_1+' A60,60 0 0,0 '+x_2+','+y_2+'" fill="none" stroke="orange" stroke-width="4"/>'+
'<path d="M'+x_2+','+y_2+' A60,60 0 0,0 '+x_3+','+y_3+'" fill="none" stroke="purple" stroke-width="4"/>'+
'</svg>');



// '<path d="M0,60 A60,60 0 0,0 60,0" fill="none" stroke="green" stroke-width="4"/>'+
// '<path d="M60,0 A60,60 0 0,0 0,60" fill="none" stroke="orange" stroke-width="4"/>'+
// '<path d="M60,0 A60,60 0 0,0 0,-60" fill="none" stroke="purple" stroke-width="4"/>'+
