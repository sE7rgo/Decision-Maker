/* listen for click events in a poll page */


let choice_rank = [];

$(document).ready(() => {
  $('.vote').click((event) => {

    //choice text
    const option = $(event.target).siblings('label').attr('for');
    //push options into array, smaller index => bigger rank
    choice_rank.push(option);
    // hide element once clicked
    $(event.target).parent().hide('slow');
  })

  // send req.body upon vote button
  // $('.vote_button').click((event) => {
  //   const poll_code = $('ul').attr('id');
  //   $.ajax({
  //     url: '/vote/new',
  //     type: 'POST',
  //     data: {
  //       poll_code: poll_code,
  //       options: choice_rank,
  //       borda_rank: choice_rank
  //     },
  //   })
  // });

  $('#pollForm').on('submit', function(e) {
    e.preventDefault();
    const poll_code = $(this).find('ul').attr('id');
    console.log('poll_code', poll_code);
    $.ajax({
      url: '/vote/new',
      type: 'POST',
      data: {
        poll_code: poll_code,
        options: choice_rank,
        borda_rank: choice_rank
      },
    }).then(
      (data, textStatus) => {
        // example json: results: [ { a: ..., b: ... }]
        // $('#someDiv').append(...)
        console.log('data', data);
        console.log('textstatus'. textStatus);

        window.location.href = `/pollResults/${poll_code}`;
      },
      (err) => console.error
    )
  })
});
