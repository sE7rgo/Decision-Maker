const express = require('express');
const router  = express.Router();
//const {borda} = require('../helper_functions/borda');
const {mg} = require('../helper_functions/mailgun');

module.exports = (db) => {

  //*********************  POST the Rankings to the DB  ***************************

  router.post("/vote/new", (req, result) => {
    const { poll_code } = req.body;
    let newChoices = req.body.borda_rank;
    let oldRankings = [];

    let query = {
      text: `SELECT borda_rank, choice_text
      FROM choices
      WHERE poll_code = $1`,
      values: [poll_code]
    }; //console.log("Row 20 says:", poll_code);

    console.log('poll_code', poll_code )
    db.query(query)
      .then(data => {
        //console.log(poll_code, 'row 23 says:<<<<<<<<<<<<<');
        for (const row of data.rows) {
          oldRankings.push({choice_text: row.choice_text,
            borda_rank: row.borda_rank});
        }
        //console.log("Row 28 says:>>>>>>", poll_code);
        for (const index in newChoices) {
          const x = oldRankings.find(item => item.choice_text === newChoices[index]);
          x.borda_rank = x.borda_rank + (newChoices.length - index);
        }
        //console.log("row 33 says : >>>>>", poll_code);
        const promises = oldRankings.map((option) => {
          return db.query(`
          UPDATE choices
          SET borda_rank = $1
          WHERE poll_code = $2 AND choice_text = $3
          ;`, [option.borda_rank, poll_code, option.choice_text]);
        });

        //console.log("Row 39 says: >>>>>>>>", poll_code);

        Promise.all(promises)
          .then((data)=> {
            //console.log(data, `line 44 said: `);
            let bordaRank = [];
            let pollOptions = [];
            let resultsTally = [];
            db.query(`
              SELECT questions.creator_email, questions.poll_code, questions.question_text, choices.choice_text, choices.borda_rank
              FROM questions
              JOIN choices ON choices.poll_code = questions.poll_code
              WHERE questions.poll_code = $1
              ;`, [poll_code])
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

                // Mailgun Sendout to Users and Creator  //re-install ${creatorEmail}
                const inputData = {
                  from: 'Decision Maker<graham.l.tyler@gmail.com>',
                  to: `${creatorEmail}`,
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
          })
          .then(() => {
            console.log('it works!!!!!!!!!!!!!!!!!!!!!!!', poll_code);
            result.redirect(`/pollResults/${poll_code}`);
          })
        });

  });
  return router;
};
