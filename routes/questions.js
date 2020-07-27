
// *********  All routes for Database are defined here **************

// **********  These have only been roughed out, they are not complete ******

const express = require('express');
const router  = express.Router();

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


// *****************  Retrieve Poll_code to Mail out to Voters  ***************


  router.get("/poll/:id", (req, res) => {
    let query = 'SELECT ......;'
    console.log(query);
    db.query(query)
      .then(data => {
        const poll_id = data.rows;  console.log(poll_id);
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
  return router;
};

// ***********************   Testing Database from Browswer  *********************
