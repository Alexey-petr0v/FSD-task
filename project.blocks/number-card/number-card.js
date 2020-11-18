$("body").on("click", ".number-card__arrow-left", {}, function() {
  let main_parent = $(this).parent().parent(),
      inputs = $(main_parent).children('input'),
      first_index = inputs.first().index(),
      last_index = inputs.last().index(),
      current_index = $(main_parent).children('input:checked').index();
  if (current_index == first_index) { $(inputs[last_index]).trigger("click") }
  else { $(inputs[current_index-1]).trigger("click") }
})
$("body").on("click", ".number-card__arrow-right", {}, function() {
  let main_parent = $(this).parent().parent(),
      inputs = $(main_parent).children('input'),
      first_index = inputs.first().index(),
      last_index = inputs.last().index(),
      current_index = $(main_parent).children('input:checked').index();
  if (current_index == last_index) { $(inputs[first_index]).trigger("click") }
  else { $(inputs[current_index+1]).trigger("click") }
})