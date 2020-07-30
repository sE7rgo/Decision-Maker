const express = require('express');
const router  = express.Router();
const {mg} = require('../helper_functions/mailgun');

const { generateRandomString } = require('../public/scripts/helpers');

module.exports = (db) => {
  router.post("/poll/new", (req, res) => {
    const pollId = generateRandomString(6);
    const creator_email = req.session.user_id;
    const { question, options, emails, comment } = req.body;
    const values = [creator_email, question, pollId];
                        console.log(req.body);
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
    return Promise.all(emails.map(user_email => {
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
    res.redirect(`/pollResults/${pollId}`);
  })
})
return router;
}
