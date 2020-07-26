//********************** user routes for login/logout  **********************

const express = require('express');
const router  = express.Router()

module.exports = (db) => {              //simple login functionality no security
  router.get("/login", (req, res) => {
    db.query(`INSERT INTO questions () ;`)
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
