$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"   //this address needs to change
  }).done((users) => {  //need to change this
    for(user of users) {   //needs to change to 'question of questions'
      $("<div>").text(user.name).appendTo($("body"));  //question
    }
  });;
});

const createOption = (() => {
  const option = `<div class="option"></div>
  <input type="text" name="options_1" placeholder="Add an Option"></input>
  </div>`
  return option;
});

const appendOption = (() => {
  console.log('renderOption')
  const newOption = createOption();
  console.log(newOption)
  $( 'options' ).empty();
  $('.options').append(createOption());
})

$(document).ready(() => {

  $('.new-question').click((event) => {
    console.log('submit button')
    event.preventDefault();
    appendOption();
  //   $.ajax({
  //     type: 'GET',
  //     url: "/",
  //   })
  //     .then(() => {
  //       console.log('hola')
  //       renderOption();
  //     });
  })
})
