const express = require('express');
const router  = express.Router();

const { generateRandomString } = require('../public/scripts/helpers');

module.exports = (db) => {
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
    .then(() => {
      return Promise.all(options.map(option => {
       return db.query(`
        INSERT INTO choices
        (poll_code,choice_text)
        VALUES ($1, $2)
        RETURNING *
        ;`, [pollId, option])
        .then(res => {
          return res.rows;
        })
        .catch(err => {
          console.log(err);
          return null;
        })
      }))
    })
    .then(() => {
      return Propmise.all(email.map(user_email => {
        return db.query (`
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
      }))
    })
    .then(()=> {
      res.redirect(`/poll/${pollId}`);
    })
  })
  return router;
}
