### Decision Maker

## User Stories

- As a user I want to make a straw poll , because I want a group decision.
- As a user I want to send this poll to my friends and myself.
- As a user I want to be able to be able to edit and delete my poll.
- As a user I want to post a number of choices for the poll question.
- As a user I want my friends to rank those choices individually and cast vote.
- As a user I want the app to collate the rankings and calulate #1 choice.
- As a user I want to see the final outcome.

## User Scenario

- As a user I will begin by entering my email, so I can get the results.
- I will then enter the question to be voted on by me and my friends.
- I will then enter at least 3 choices for my friends to rank.
- I will then enter the email addresses of all those whom I want to poll.
- Once all fields are complete, I will click the submit button to send out poll.
- All people on email list will recieve link with poll-code attached.
- All will enter code on webpage and then they will enter their rankings.
- After each submission, I will get an email update of the current vote outcome.

- STRETCH =====>>>>    I am able to add an extra email row 
- STRETCH =====>>>>    I can see detailed poll results
- STRETCH =====>>>>    Build user profiles with secure login
- STRETCH =====>>>>    See graphical representation of voting results

## ERD

- ------------------------  QUESTIONS_TABLE  ----------------------------------

- ||||| question_ID |||||  creator_email  ||||| question_text ||||| poll_code

- ------------------------  CHOICES_TABLE  ------------------------------------

- |||| choices_id |||| questions_ID |||| choice_text |||| borda_rank ||||


## Routes
# When creating a poll:
- R POST/poll_submit  - once creator has filled all fields he/she submits to DB

# When sending out a poll
- R GET/poll/:id  - send out the poll_code to voters 

# When voting on a poll
- R GET/poll_to_vote_on/:id  - when voter enters the poll_code to get poll
- R POST/vote_cast/:id - when voter submits their vote on the vote page
- R GET/poll_results - gets current borda_count and sends update email to creator
