
// *********  All routes for Database are defined here **************

// **********  These have only been roughed out, they are not complete ******

const express = require('express');
const router  = express.Router();
const {mg} = require('../helper_functions/mailgun');


//************************  POST completed poll to Database *****************

module.exports = (db) => {

  router.post("/poll_submit", (req, res) => {
    let query = 'INSERT INTO...;'
    console.log(query);
    db.query(query)
      .then(data => {
        const poll_submit = data.rows;  console.log(poll_submit);
        res.json({ poll_submit });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


//  ************************** POST Voter's Rankings to DB *********************


  router.post("/vote_cast/:id", (req, res) => {
    let query = 'INSERT INTO....;'
    console.log(query);
    db.query(query)
      .then(data => {
        const vote = data.rows;  console.log(vote);
        res.json({ vote });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


// *****************  Retrieve Poll_code and Mail out to Voters  ***************


  router.get("/polls/:id", (req, res) => {
    let query = {
      text: `SELECT creator_email, poll_code, voters.voter_email
             FROM questions
             JOIN voters ON voters.questions_id = questions.id
             WHERE poll_code = $1`,
      values: [req.params.id]
    }
    console.log(query);
    db.query(query)
      .then(data => {
        const poll_id = data.rows[0].poll_code;
        const creatorEmail = data.rows[0].creator_email;
        const voterEmail = data.rows[0].voter_email;

        // Mailgun Sendout to Users and Creator
        const inputData = {              //${voterEmail} has to allow more than 1 email (usually 3 at least)?????????????????
          from: 'Decision Maker<graham.l.tyler@gmail.com>',
          to: `${creatorEmail}, ${voterEmail}, lord_proton@yahoo.ca`,
          subject: 'Decision-Maker Poll',
          text: `Copy this Polling Code ${poll_id} and click the following link http://localhost:8080/ to go to Decision Maker and vote.`

        };  console.log(inputData);

        mg.messages().send(inputData, function (err, body) {
          if (err) {
            console.log("got an error: ", err);
        } else {
          console.log(body);
        }
        });


        res.json({ poll_id });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


// **********************  GET Results and Send to Creator ********************


  router.get("/poll_results", (req, res) => {
    let query = 'SELECT ......;'
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
    let query = 'SELECT * FROM questions;'
    console.log(query);
    db.query(query)
      .then(data => {
        const questions = data.rows;  console.log(questions);
        res.json({ questions });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


// ***********************   GET main page in Browswer  *********************

router.get("/", (req, res) => {
  let templateVars = {
    email: null
  };
    res.render("index", templateVars);
});
  return router;
};



