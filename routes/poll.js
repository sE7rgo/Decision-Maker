const express = require('express');
const questions = require('./questions');
const router  = express.Router();

module.exports = (db) => {

  //***************************  GET the poll page **************************

  router.get("/poll/:pollId", (req, result) => {
  //  let question_text;
  //   let choices_text = [];
    db.query (`
      SELECT question_text, choice_text
      FROM questions
      JOIN choices ON choices.poll_code = questions.poll_code
      WHERE questions.poll_code = $1
      ;`, [req.params.pollId])
      .catch(err => {
        console.log(err);
        return null;
      })
      .then(res => {
        let question_text = res.rows[0].question_text;
        let choices_text = res.rows.map(({choice_text}) => choice_text);

        let templateVars = {
          question: question_text,
          pollId: req.params.pollId,
          choices: choices_text
        };
        result.render("poll_show", templateVars);
      })
  });

  return router;
}
