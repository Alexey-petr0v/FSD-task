if ($(".statistics").length) {
  let r = 60;
  let st = $(".statistics__vote").data();
  let length = st.percent_items.length;
  let vote = new Object();
  vote.percent = new Array(length)
  vote.percent_2 = new Array(length)
  vote.white_line = new Array(length)
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
  vote.svg_paths_white = ""
  vote.added_bonus = 0;
  
  for (let x = 0; x < length; x++) {
    $(".statistics").prepend("<style>"+
    "li[data-num='"+x+"']:before { background: linear-gradient("+st.percent_items[x].color_1+", "+st.percent_items[x].color_2+") }"+
    " #statistics_path_"+x+"_0 { stroke: url(#statistics_gradient_"+x+"_0) }"+
    " #statistics_gradient_"+x+"_0 .statistics__color_1 { stop-color: "+st.percent_items[x].color_1+" }"+
    " #statistics_gradient_"+x+"_0 .statistics__color_2 { stop-color: "+st.percent_items[x].color_2+" }"+
    " #statistics_path_"+x+"_1 { stroke: url(#statistics_gradient_"+x+"_1) }"+
    " #statistics_gradient_"+x+"_1 .statistics__color_1 { stop-color: "+st.percent_items[x].color_1+" }"+
    " #statistics_gradient_"+x+"_1 .statistics__color_2 { stop-color: "+st.percent_items[x].color_2+" }"+
    "</style>");
    vote.svg_defs = vote.svg_defs + 
    '<linearGradient id="statistics_gradient_'+x+'_0" x1="0" x2="0" y1="1" y2="0">'+
    '<stop class="statistics__color_1" offset="0%"/>'+
    '<stop class="statistics__color_2" offset="100%"/>'+
    '</linearGradient>'+
    '<linearGradient id="statistics_gradient_'+x+'_1" x1="0" x2="0" y1="1" y2="0">'+
    '<stop class="statistics__color_1" offset="0%"/>'+
    '<stop class="statistics__color_2" offset="100%"/>'+
    '</linearGradient>';
  
    vote.percent[x] = st.percent_items[x].percent; // Color
    let degree;
    if (x == 0) { degree = 0}
    else { degree = vote.degree[x-1] }
    vote.percent_2[x] = 0;
    vote.degree_2[x] = 0;
    if (vote.percent[x] > 50) {
      vote.percent_2[x] = vote.percent[x]-50;
      vote.degree[x] = 50 / 5 * 18 + degree + vote.added_bonus; console.log("vote.degree[x]: "+vote.degree[x])
      vote.degree_2[x] = vote.percent_2[x] / 5 * 18+vote.degree[x]; console.log("vote.degree_2[x]: "+vote.degree_2[x])
      vote.white_line[x] = "two";
    }
    else {
      vote.degree[x] = vote.percent[x] / 5 * 18 + degree + vote.added_bonus;
      vote.degree_2[x] = vote.degree[x];
      vote.white_line[x] = "one";
    }
    vote.radian[x] = vote.degree[x] * 0.01745;
    vote.radian_2[x] = vote.degree_2[x] * 0.01745;
  
    vote.x_2[x] = Math.round(r*Math.sin(vote.radian_2[x]));
    vote.y_2[x] = Math.round(r*Math.cos(vote.radian_2[x]));
    vote.x[x] = Math.round(r*Math.sin(vote.radian[x]));
    vote.y[x] = Math.round(r*Math.cos(vote.radian[x]));
    
    if (x != 0) {
      vote.svg_paths = vote.svg_paths + '<path id="statistics_path_'+x+'_0" d="M'+vote.first_x+','+vote.first_y+' A60,60 0 0,0 '+vote.x[x]+','+vote.y[x]+'" fill="none" stroke="'+st.percent_items[x].name_color+'" stroke-width="4"/>';
    }
    else {
      vote.svg_paths = vote.svg_paths + '<path id="statistics_path_'+x+'_0" d="M'+vote.first_x+','+vote.first_y+' A60,60 0 0,0 '+vote.x[x]+','+vote.y[x]+'" fill="none" stroke="'+st.percent_items[x].name_color+'" stroke-width="4"/>';
    }
    vote.first_x = vote.x[x]
    vote.first_y = vote.y[x]
  
    if (vote.percent[x] > 50) {
      vote.svg_paths = vote.svg_paths + '<path id="statistics_path_'+x+'_0" d="M'+vote.first_x+','+vote.first_y+' A60,60 0 0,0 '+vote.x_2[x]+','+vote.y_2[x]+'" fill="none" stroke="'+st.percent_items[x].name_color+'" stroke-width="4"/>';
      vote.added_bonus = vote.degree_2[x]-vote.degree[x]
      vote.first_x = vote.x_2[x]
      vote.first_y = vote.y_2[x]
    }
    else { vote.added_bonus = 0 }
    vote.x_white[x] = vote.first_x+(vote.first_x*0.035);
    vote.y_white[x] = vote.first_y+(vote.first_y*0.035);
    vote.svg_paths_white = vote.svg_paths_white + '<path d="M'+0+','+0+' A0,0 0 0,0 '+vote.x_white[x]+','+vote.y_white[x]+'" fill="none" stroke="white" stroke-width="2"/>'
  }
  
  $('<svg class="statistics__svg" viewBox="-62 -62 124 124" width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
  '<circle cx="0" cy="0" r="60" fill="white"/>'+
  '<defs>'+vote.svg_defs+'</defs>'+
  vote.svg_paths+
  vote.svg_paths_white+
  '</svg>').insertBefore(".statistics__ellipse-background");
}