/*
 *************  All routes for CHOICES are defined here **************

 * Since this file is loaded in server.js into api/choices
 *   these routes are mounted onto /choices
 *
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM choices;`)  //changed from users to 'choices' GT
      .then(data => {
        const choices = data.rows;  //changed to choices GT
        res.json({ choices });     //changed to choices GT
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
