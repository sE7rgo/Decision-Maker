const express = require('express');
//const questions = require('./questions');
const router  = express.Router();

//************** GET: Retrieve poll results and display them *********************

module.exports = (db) => {

  router.get("/pollResults/:pollId", (req, res) => {  //each vote cast, sends an update
    console.log("GET /pollResults/pollId called");
    let query = {
      text: `SELECT questions.creator_email, questions.poll_code, questions.question_text, choices.choice_text, choices.borda_rank
      FROM questions
      JOIN choices ON choices.poll_code = questions.poll_code
      WHERE questions.poll_code = $1`,
      values: [req.params.pollId]
    };
    let resultsTally = [];
    db.query(query)
      .then(data => {
        const creatorEmail = data.rows[0].creator_email;
        const poll_id = data.rows[0].poll_code;
        const questionText = data.rows[0].question_text;

        const bordaRank = data.rows.map(({borda_rank}) => borda_rank);
        const pollOptions = data.rows.map(({choice_text}) => choice_text);

        let options = {};

        for (let j = 0; j < bordaRank.length; j++) {
          // resultsTally.push(pollOptions[j]);
          // resultsTally.push(bordaRank[j]);
          options[pollOptions[j]] = {rank: bordaRank[j]};
        }
        let results = resultsTally.toString();
        console.log(options);
        // // Mailgun Sendout to Users and Creator  //re-install ${creatorEmail}
        // const inputData = {
        //   from: 'Decision Maker<graham.l.tyler@gmail.com>',
        //   to: `lord_proton@yahoo.ca`,
        //   subject: 'Decision-Maker Poll',
        //   text: `Current Poll Results for Poll Code: ${poll_id} \n Given by: ${creatorEmail} \n Asked: ${questionText} \n Decision Maker results: ${results}`
        // };

        // mg.messages().send(inputData, function(err, body) {
        //   if (err) {
        //     console.log("got an error: ", err);
        //   } else {
        //     console.log(body);
        //   }
        // });
      let templateVars = {
        pollId: req.params.pollId,
        question: questionText,
        choices: options
      };
      res.render("poll_result", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
