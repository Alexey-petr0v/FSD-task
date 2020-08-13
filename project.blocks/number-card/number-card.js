
$(".number-card__left p").click(function(){
    let main_parent = $(this).parent().parent().parent()
    let inputs = $(main_parent).children('input')
    let first_index = inputs.first().index()
    let last_index = inputs.last().index()
    let current_index = $(main_parent).children('input:checked').index()
    if (current_index == first_index) {
        $(inputs[last_index]).trigger("click")
    }
    else {
        $(inputs[current_index-1]).trigger("click")
    }
})
$(".number-card__right p").click(function(){
    let main_parent = $(this).parent().parent().parent()
    let inputs = $(main_parent).children('input')
    let first_index = inputs.first().index()
    let last_index = inputs.last().index()
    let current_index = $(main_parent).children('input:checked').index()
    if (current_index == last_index) {
        $(inputs[first_index]).trigger("click")
    }
    else {
        $(inputs[current_index+1]).trigger("click")
    }
})