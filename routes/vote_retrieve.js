const express = require('express');
const router  = express.Router();
const {borda} = require('../helper_functions/borda');

module.exports = (db) => {

  //*********************  POST vote to DB  *********************************

  router.post("/vote/new", (req, res) => {
    const { options, poll_code, borda_rank } = req.body;
    let newRankings = [];
    let oldRankings = [];
    let updatedPoints = [];
    for (const rank of borda_rank) {  //compile new Rankings from page
      newRankings.push(rank);
    }
    let query = {
      text: `SELECT borda_rank
      FROM choices
      WHERE poll_code = $1`,
      values: [req.params.id]
    };
    db.query(query)               //initiate query to fetch old rankings fm DB
      .then(data => {
        for (const row of data.rows) {
          oldRankings.push(row.borda_rank);
        }
        updatedPoints = borda(oldRankings, newRankings); //call borda method

        const promises = options.map((option) => {  //conduct update of rankings in DB
          return db.query(`
          UPDATE choices
          SET borda_rank = $1
          WHERE poll_code = $2 AND choice_text = $3
          ;`, [updatedPoints, poll_code, option])
        })
        Promise.all(promises)         //() => res.send('successful update'));
        .then(()=> {  //****************spliced in fm questions.js *************
          let query = {
            text: `SELECT questions.creator_email, questions.poll_code, questions.question_text, choices.choice_text, choices.borda_rank
            FROM questions
            JOIN choices ON choices.poll_code = questions.poll_code
            WHERE questions.poll_code = $1`,
            values: [req.params.id]
          };
          //console.log(query);
          let bordaRank = [];
          let pollOptions = [];
          let resultsTally = [];
          db.query(query)
            .then(data => {
              const creatorEmail = data.rows[0].creator_email;
              const poll_id = data.rows[0].poll_code;
              const questionText = data.rows[0].question_text;
              for (const row of data.rows) {
                bordaRank.push(row.borda_rank);
                pollOptions.push(row.choice_text);
              }
              for (let j = 0; j < bordaRank.length; j++) {
                resultsTally.push(pollOptions[j]);
                resultsTally.push(bordaRank[j]);
              }
              let results = resultsTally.toString();
              //console.log(results);
              // Mailgun Sendout to Users and Creator  //re-install ${creatorEmail}
              const inputData = {
                from: 'Decision Maker<graham.l.tyler@gmail.com>',
                to: `lord_proton@yahoo.ca`,
                subject: 'Decision-Maker Poll',
                text: `Current Poll Results for Poll Code: ${poll_id} \n Given by: ${creatorEmail} \n Asked: ${questionText} \n Decision Maker results: ${results}`
              };

              mg.messages().send(inputData, function(err, body) {
                if (err) {
                  console.log("got an error: ", err);
                } else {
                  console.log(body);
                }
              });
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        })
      });
  })
  return router;
};
