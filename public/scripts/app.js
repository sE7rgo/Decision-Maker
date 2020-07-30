/* Create an option HTML */
const createOption = (() => {
  const option = `<div class="option"></div>
  <input type="text" name="options[]" placeholder="another option"></input>
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
      if (optionCounter < 0) {
        $('.error').text(`❌ That's it, only 6 options 😀`);
        $('.error').css('border', '3px solid red');
        $('.error').slideDown(1000);
      } else {
      $('.new-option').siblings('output')
      .val(`You can add ${optionCounter} more options`).css('color red');
      event.preventDefault();
      appendOption();
      }
    });

    let emailCounter = 3;
    $('.new-email').siblings('output')
    .val(`You can add ${emailCounter} more emails`)
  $('.new-email').click((event) => {
    emailCounter--;
    if(emailCounter < 0) {
      $('.error').text(`❌ That's it, only 5 emails 😀`);
      $('.error').css('border', '3px solid red');
      $('.error').slideDown(1000);
    } else {
      $('.new-email').siblings('output')
      .val(`You can add ${emailCounter} more emails`)
      event.preventDefault();
      appendEmail();
    }
  });
})
