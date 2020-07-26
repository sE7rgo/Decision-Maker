
// *********  All routes for Database are defined here **************

const express = require('express');
const router  = express.Router();

module.exports = (db) => {          // testing database with a complete pull of data
  router.get("/getTable", (req, res) => {
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
