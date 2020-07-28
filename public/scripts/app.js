/* Create an option HTML */
const createOption = (() => {
  const option = `<div class="option"></div>
  <input type="text" name="options_1" placeholder="Add an Option"></input>
  </div>`
  return option;
});
/* Create an email HTML */

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
  let optionCounter = 4;
  $('.new-option').siblings('output')
  .val(`You can add ${optionCounter} more options`)
  $('.new-option').click((event) => {
    optionCounter--;
    $('.new-option').siblings('output')
    .val(`You can add ${optionCounter} more options`)
    event.preventDefault();
    appendOption();
  })

  $('.new-email').click((event) => {
    event.preventDefault();
    appendEmail();
  });
})
