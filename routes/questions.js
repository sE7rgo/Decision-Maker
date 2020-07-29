
// *********  All routes for Database are defined here **************

// **********  These have only been roughed out, they are not complete ******

const express = require('express');
const router  = express.Router();
const {mg} = require('../helper_functions/mailgun');


module.exports = (db) => {

  // *****************  Retrieve Poll_code and Mail out to Voters  ***************

  router.get("/pollsSend/:id", (req, res) => {  //called by POST/poll_submit
    let query = {
      text: `SELECT creator_email, poll_code, voters.voter_email
             FROM questions
             JOIN voters ON voters.questions_id = questions.id
             WHERE poll_code = $1`,
      values: [req.params.id]
    };
    console.log(query);
    let voterEmails = [];         //THEN statement has loop to gather all voters
    db.query(query)               //and pushes that to the mailgun input
      .then(data => {
        const poll_id = data.rows[0].poll_code;
        const creatorEmail = data.rows[0].creator_email;
        for (const row of data.rows) {
          voterEmails.push(row.voter_email)
        }
          let insertVoters = voterEmails.toString().replace(/,/g, ', ' );

        // Mailgun Sendout to Users and Creator
        const inputData = {
          from: 'Decision Maker<graham.l.tyler@gmail.com>',
          to: `${creatorEmail}, ${insertVoters}, lord_proton@yahoo.ca`,
          subject: 'Decision-Maker Poll',
          text: `Copy this Polling Code ${poll_id} and click the following link http://localhost:8080/ to go to Decision Maker and vote.`
        };

        mg.messages().send(inputData, function(err, body) {
          if (err) {
            console.log("got an error: ", err);
          } else {
            console.log(body);
          }
        });
        //res.json({ poll_id });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // **********************  GET Results and Send to Creator ********************

  router.get("/pollResults/:id", (req, res) => {  //each vote cast, sends an update
    let query = {
      text: `SELECT questions.creator_email, questions.poll_code, questions.question_text, choices.choice_text, choices.borda_rank
      FROM questions
      JOIN choices ON choices.questions_id = questions.id
      WHERE poll_code = $1`,
      values: [req.params.id]
    };
    console.log(query);
    let bordaRank = [];
    let pollOptions = [];
    let resultsTally = [];
    db.query(query)
      .then(data => {
        const creatorEmail = data.rows[0].creator_email
        const poll_id = data.rows[0].poll_code;
        const questionText = data.rows[0].question_text;
        for (const row of data.rows) {
          bordaRank.push(row.borda_rank)
          pollOptions.push(row.choice_text)
        }
        for (let j = 0; j < bordaRank.length; j++) {
          resultsTally.push(pollOptions[j]);
          resultsTally.push(bordaRank[j]);
        }
        let results = resultsTally.toString();
        console.log(results);
        // Mailgun Sendout to Users and Creator  //${creatorEmail}
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
        res.json({ poll_id });  //feedback for webpage testing
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //************************** GET poll from DB for Voter *************************

  router.get("/poll_results", (req, res) => {
    let query = 'SELECT ......;';
    console.log(query);
    db.query(query)
      .then(data => {
        const poll_results = data.rows;  console.log(poll_results);
        res.json({ poll_results });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });






  //********************  Testing database connection from browswer  ******************


  router.get("/questions", (req, res) => {
    let query = 'SELECT * FROM questions;';
    console.log(query);
    db.query(query)
      .then(data => {
        const questions = data.rows;  console.log(questions);
        res.json({ questions });
      })
      .catch(err => {
        reslogin
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};



