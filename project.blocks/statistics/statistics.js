let r = 60;

let st = $(".statistics__vote").data();
let length = 3;

let vote = new Object();

vote.percent = new Array(length)
vote.percent[0] = st.percent_items[0].percent_1; // Green (хорошо)
vote.percent[1] = st.percent_items[1].percent_2; // Purple (удовлетворительно)
vote.percent[2] = st.percent_items[2].percent_3; // Orange (великолепно)

vote.white_line_2 = new Array(length)
vote.white_line_2[0] = false;
vote.white_line_2[1] = false;
vote.white_line_2[2] = false;

vote.percent_2 = new Array(length)

vote.degree = new Array(length)
vote.degree_2 = new Array(length)

vote.radian = new Array(length)
vote.radian_2 = new Array(length)

vote.first_y = 60;
vote.first_x = 0;

vote.x = new Array(length)
vote.x_2 = new Array(length)

vote.y = new Array(length)
vote.y_2 = new Array(length)

vote.x_white = new Array(length)
vote.y_white = new Array(length)

vote.svg_defs = ""
vote.svg_paths = ""

let one_x, one_y;
let two_x, two_y;
let three_x, three_y;

for (let x = 0; x < length; x++) {
    let degree;
    if (x == 0) { degree = 0}
    else { degree = vote.degree[x-1] }
    vote.percent_2[x] = 0;
    vote.degree_2[x] = 0;
    if (vote.percent[x] > 50) {
        vote.percent_2[x] = vote.percent[x]-50;
        vote.degree[x] = 50 / 5 * 18 + degree;
        vote.degree_2[x] = vote.percent_2[x] / 5 * 18+vote.degree[x];
        vote.white_line_2[x] = true
    }
    else {
        vote.degree[x] = vote.percent[x] / 5 * 18 + degree;
        vote.degree_2[x] = vote.degree[x];
    }
    vote.radian[x] = vote.degree[x] * 0.01745;
    vote.radian_2[x] = vote.degree_2[x] * 0.01745;
    vote.x[x] = Math.round(r*Math.sin(vote.radian[x]));
    vote.y[x] = Math.round(r*Math.cos(vote.radian[x]));
    vote.x_2[x] = Math.round(r*Math.sin(vote.radian_2[x]));
    vote.y_2[x] = Math.round(r*Math.cos(vote.radian_2[x]));

    if (vote.white_line_2[x]) {
        vote.x_white[x] = vote.x_2[x]+(vote.x_2[x]*0.035);
        vote.y_white[x] = vote.y_2[x]+(vote.y_2[x]*0.035);
    }
    else {
        vote.x_white[x] = vote.x[x]+(vote.x[x]*0.035);
        vote.y_white[x] = vote.y[x]+(vote.y[x]*0.035);
    }
    $(".statistics").prepend("<style>"+
    ".statistics__list li:nth-child("+(x+1)+"):before { background: linear-gradient("+st.percent_items[x].color_1+", "+st.percent_items[x].color_2+") </style>");
    vote.svg_defs = vote.svg_defs + 
    '<linearGradient id="Gradient_'+x+'_0" x1="0" x2="0" y1="1" y2="0">'+
    '<stop class="stop1" offset="0%"/>'+
    '<stop class="stop2" offset="100%"/>'+
    '</linearGradient>'+
    '<linearGradient id="Gradient_'+x+'_1" x1="0" x2="0" y1="1" y2="0">'+
    '<stop class="stop1" offset="0%"/>'+
    '<stop class="stop2" offset="100%"/>'+
    '</linearGradient>';
    
    // Если сейчас выводится первый элемент
    if (x == 0) {
        one_x = vote.first_x; one_y = vote.first_y;
        three_x = vote.x_2[x]; three_y = vote.y_2[x];
    }
    // Если сейчас выводится последний элемент
    else if (x == length-1) {
        one_x = vote.x_2[x-1]; one_y = vote.y_2[x-1];
        three_x = vote.first_x; three_y = vote.first_y;
    }
    else {
        one_x = vote.x_2[x-1]; one_y = vote.y_2[x-1];
        three_x = vote.x_2[x]; three_y = vote.y_2[x];
    }
    two_x = vote.x[x]; two_y = vote.y[x];

    

    vote.svg_paths = vote.svg_paths + '<path id="path_'+x+'_0" d="M'+one_x+','+one_y+' A60,60 0 0,0 '+two_x+','+two_y+'" fill="none" stroke="orange" stroke-width="4"/>';

    vote.svg_paths = vote.svg_paths + '<path id="path_'+x+'_1" d="M'+two_x+','+two_y+' A60,60 0 0,0 '+three_x+','+three_y+'" fill="none" stroke="orange" stroke-width="4"/>';

}


$('<svg viewBox="-62 -62 124 124" width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
'<circle cx="0" cy="0" r="60" fill="white"/>'+
'<defs>'+vote.svg_defs+'</defs>'+
vote.svg_paths+
'<path d="M'+0+','+0+' A0,0 0 0,0 '+vote.x_white[0]+','+vote.y_white[0]+'" fill="none" stroke="white" stroke-width="2"/>'+
'<path d="M'+0+','+0+' A0,0 0 0,0 '+vote.x_white[1]+','+vote.y_white[1]+'" fill="none" stroke="white" stroke-width="2"/>'+
'<path d="M'+0+','+0+' A0,0 0 0,0 '+vote.x_white[2]+','+vote.y_white[2]+'" fill="none" stroke="white" stroke-width="2"/>'+
'</svg>').insertBefore(".statistics__ellipse-background");