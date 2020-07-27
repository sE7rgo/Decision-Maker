//********************** user routes for login/logout  **********************

// ***************  this is not needed ***************************

const express = require('express');
const router  = express.Router()

module.exports = (db) => {              //simple login functionality no security
  router.get("/login", (req, res) => {
    db.query(`INSERT INTO questions () ;`) //we may need to simply include the login
      .then(data => {                     //as just another field like straw poll so
        const questions = data.rows;      //that the user gets both admin and user
        res.json({ questions });          //emails.  There's no reason to log in?
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};


