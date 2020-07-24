### Decision Maker

## User Stories

- As a user I want to make a Poll, because I'm lazy to make decisions.
- As user I want to send this poll to my friends and myself.
- As user I want to be abble to edit/delete my POLL.
- As a user I want post a number of choices and have friends rank those choices individualy.
- As a user I want the program to take friend's rankings and apply Borda method on them.
- As a user I want to see the result decision.

## User Scenarios

- When I enter e-mail, I am abble to create the POLL.
- I am abble to logout.
- I can create a new custom poll with multiple choices.
- I can then enter my friends email address and send the link for this POLL.
- STRETCH =====>>>>    I am abble to add an extra email row 
- STRETCH =====>>>>    I can see all POLL results
- STRETCH =====>>>>    Set the date when posted

## ERD

- ||||ID |||||||QUESTION_ID||||||||CREATOR_EMAIL|||

- -- friends db with emails

- |||| ID ||||||QUESTION_ID |||||||FRIEND_EMAIL||||

- -- POLL db
- ------------DECI_TABLE--------------------------

- ||||| ID |||||| QUESTION  ||||||| 

- ------------CHOICE_TABLE---------------------------

- |||| ID ||||QUESTION_ID||| POLL_TEXT ||||||| POLL_RANK DEFAULT NULL|||||


## Routes
- login
- R POST/poll

- Create poll when logged_in
- R GET/poll
- R POST/poll

- Vote when have route
- R POST/poll/:id

- Modify or delete poll when have link
- R POST/poll/:another_id

- result page
- R GET/poll/:id/result
