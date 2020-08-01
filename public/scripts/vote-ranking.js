/* listen for click events in a poll page */


let choice_rank = [];

$(document).ready(() => {
  const $form = $("#pollForm")
    $('.vote').click((event) => {

    //choice text
    const option = $(event.target).siblings('label').attr('for');
    //push options into array, smaller index => bigger rank
    choice_rank.push(option);
    // hide element once clicked
    $(event.target).parent().hide('slow');
  })
  $form.on("submit", function(submitEvent) {
    const poll_code = $('ul').attr('id');
      console.log(poll_code, choice_rank)
      $.ajax({
        url: $(event.target).attr('action'),
        type: 'POST',
        data: {
          poll_code: poll_code,
          options: choice_rank,
          borda_rank: choice_rank
        },

      })
      .then((choice_data)=>
      //.append fill container holding results display similar to render tweets
    //submitEvent.preventDefault();
    return false;
  })
});


