function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

let num_background = getRandomInt(3);

if (num_background == 0) {
    $(".landing-page").addClass("landing-page_background-1")
}
else if (num_background == 1) {
    $(".landing-page").addClass("landing-page_background-2")
}
else if (num_background == 2) {
    $(".landing-page").addClass("landing-page_background-3")
}