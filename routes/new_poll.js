const express = require('express');
const router  = express.Router();

const { generateRandomString } = require('../public/scripts/helpers');
const { query } = require('express');

module.exports = (db) => {
//***************************  GET the poll page **************************

//>>>>>>>>>>>>> Sergii, you can delete this one <<<<<<<<<<<<<<<
//>>>>>>>>>>>  Look in questions routes and you'll see it <<<<<<<
//>>>>>>>>>>>  In the html it will require a for loop to populate the choices <<

  router.get("/poll/:pollId", (req, res) => {
    let templateVars = {
      email: null,
      pollId: req.params.pollId
    };
    res.render("poll_show", templateVars);
  });

//***************************  POST new poll ************************************

  router.post("/poll/new", (req, res) => {
    const pollId = generateRandomString(6);
    const creator_email = req.session.user_id;
    const { question, options, email, comment } = req.body;

    const values = [creator_email, question, pollId];
    db.query (`
      INSERT INTO questions
      (creator_email, question_text, poll_code)
      VALUES ($1, $2, $3)
      RETURNING *
      ;`, values)
    .catch(err => {
      console.log(err);
      return null;
    })
    .then(res => {
      return res.rows;
    })
    .then(
      options.forEach(option => {
        db.query (`
          INSERT INTO choices
          (poll_code,choice_text)
          VALUES ($1, $2)
          RETURNING *
          ;`, [pollId, option])
        .catch(err => {
          console.log(err);
          return null;
        })
        .then(res => {
          return res.rows;
        })
      })
    )
    .then(
      email.forEach(user_email => {
        db.query (`
        INSERT INTO voters
        (poll_code, voter_email)
        VALUES ($1, $2)
        RETURNING *
        ;`, [pollId, user_email])
        .catch(err => {
          console.log(err);
          return null;
        })
        .then(res => {
          return res.rows;
        })
      })
    )
    res.redirect(`/poll/${pollId}`);
  });

  return router;
}
