
// *********  All routes for Database are defined here **************

const express = require('express');
const router  = express.Router();

module.exports = (db) => {          // testing database with a complete pull of data
  router.get('/getTable', (req, res) => {
    db.query(`SELECT * FROM questions;`)
      .then(data => {
        const questions = data.rows;  console.log(questions);
        res.json({ questions });       // res.json({ questions });res.send(questions);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
