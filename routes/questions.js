const express = require('express');
const router  = express.Router();
const {mg} = require('../helper_functions/mailgun');


module.exports = (db) => {
/*
  // *****************  Retrieve Poll_code and Mail out to Voters  ***************

  // *** This is has all been put into the new_poll page, so that it acts primarily as a function which is called by .then statement and acts as another query in the chain and enables the POST function to then redirect the user to the voting page.


  router.get("/pollSend/:id", (req, res) => {  //called by POST/poll_submit
    let query = {
      text: `SELECT questions.creator_email, questions.poll_code, voters.voter_email FROM questions
      JOIN voters ON voters.poll_code = questions.poll_code
      WHERE voters.poll_code = $1`,
      values: [req.params.id]
    };
    //console.log(query);
    let voterEmails = [];         //THEN statement has loop to gather all voters
    db.query(query)               //and pushes that to the mailgun input
      .then(data => {
        const poll_id = data.rows[0].poll_code;
        const creatorEmail = data.rows[0].creator_email;
        for (const row of data.rows) {
          voterEmails.push(row.voter_email);
        }
        let insertVoters = voterEmails.toString().replace(/,/g, ', ');

        // Mailgun Sendout to Users and Creator  ${creatorEmail}, ${insertVoters}
        const inputData = {
          from: 'Decision Maker<graham.l.tyler@gmail.com>',
          to: `lord_proton@yahoo.ca`,
          subject: 'Decision-Maker Poll',
          text: `Clicking this link will take you to Decision Maker where ${creatorEmail} has posted a poll that they want you vote on. \n http://localhost:8080/poll/${poll_id}`
        };

        mg.messages().send(inputData, function(err, body) {
          if (err) {
            console.log("got an error: ", err);
          } else {
            console.log(body);
          }
        });
        //res.json({ poll_id });  //just for testing
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
*/
  // **********************  GET Results and Send to Creator ********************
/*
  router.get("/pollResults/:id", (req, res) => {  //each vote cast, sends an update
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
  });
*/
  //************************** GET poll from DB for Voter *************************

  /*router.get("/pollRetrieve/:id", (req, res) => {
    let query = {
      text: `SELECT questions.poll_code, questions.question_text, choices.choice_text
      FROM questions
      JOIN choices ON choices.poll_code = questions.poll_code
      WHERE poll_code = $1`,
      values: [req.params.id]
    };
    //console.log(query);
    let choices = [];
    db.query(query)
      .then(data => {
        const poll_code = data.rows[0].poll_code;  //data for poll_page
        const question = data.rows[0].question_text;
        for (const row of data.rows) {
          choices.push(row.choice_text); //this is an array with all rankings
        }
        let templateVars = {email: null, pollId: req.params.pollId, question, choices};
        res.render("poll_show", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
*/
  //********************  Testing database connection from browswer  ******************


  router.get("/questions", (req, res) => {
    let query = 'SELECT * FROM questions;';
    //console.log(query);
    db.query(query)
      .then(data => {
        const questions = data.rows;
        res.json({ questions });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};



