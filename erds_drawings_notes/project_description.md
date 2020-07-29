### Option 4: Decision Maker

A web app that helps groups of friends to vote on a preferred choice (using ranked voting), for example: "What movie should we see next Friday?".

## Requirements:

* A user can create a poll with multiple choices.
* Each choice can have a title and optional description the creator must enter an    email.
* When a poll is finished being created, the user is given two links: an administrative link (which lets them access the results) and a submission link (which the user sends to their friends).
* The links are also sent to the creator via email (using Mailgun).
when a user visits the submission link, they enter their name if required and see a list of the choices for that poll.
* The user can rank the choices (by drag and drop, or some other method) and then submits the poll.
* Each time a submission is received, the creator is notified with an email (which includes the administrative link and a link to the results).
* The results are ranked using the Borda Count method.
* Note: this app does not follow the typical user authentication process: voters don't need to register or log in and the only way to access the polls or see the results is via links.

## Stack Elements Used:

* Mailgun - transactional email api
* ES6 for server-side (NodeJS) code
* NodeJS
* Express
* RESTful routes
* One or more CSS or UI "framework"s:
* jQuery
* A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom
  properties and no CSS preprocessor
* PostgreSQL and pg (with promises) for DBMS
* github for version control





