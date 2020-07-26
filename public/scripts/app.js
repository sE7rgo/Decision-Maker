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
