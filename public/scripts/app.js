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

const createEmail = (() => {
  const email = `<div class="email">
  <input type="text" name="email" placeholder="Add an email"></input>
  </div>`
  return email
})

const appendOption = (() => {
  $( 'options' ).empty();
  $('.options').append(createOption());
});

const appendEmail = (() => {
  $('.emails').append(createEmail());
 });


$(document).ready(() => {

  $('.new-question').click((event) => {
    event.preventDefault();
    appendOption();
  })

  $('.new-email').click((event) => {
    event.preventDefault();
    appendEmail();
  });
})
