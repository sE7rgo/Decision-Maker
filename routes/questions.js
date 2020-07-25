/*
 *********  All routes for QUESTIONS are defined here **************
 * Since this file is loaded in server.js into api/questions
 *   these routes are mounted onto /questions

 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM questions;`)  //changed to questions GT
      .then(data => {
        const questions = data.rows;    //changed to questions GT
        res.json({ questions });        //changed to questions GT
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
