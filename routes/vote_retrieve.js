const express = require('express');
const router  = express.Router();
const {borda} = require('../helper_functions/borda');

module.exports = (db) => {

  //*********************  POST vote to DB  *********************************

  router.post("/vote/new", (req, res) => {
    const { options, poll_code, borda_rank } = req.body;
    let newRankings = [];
    let oldRankings = [];
    let updatedPoints = [];
    for (const rank of borda_rank) {
      newRankings.push(rank);
    }
    let query = {              //retrieve old rankings for choices from DB
      text: `SELECT borda_rank
      FROM choices
      WHERE poll_code = $1`,
      values: [req.params.id]
    };
    db.query(query)
      .then(data => {
        for (const row of data.rows) {
          oldRankings.push(row.borda_rank);
        }
        updatedPoints = borda(oldRankings, newRankings);

        const promises = options.map((option) => {
          return db.query(`
          UPDATE choices
          SET borda_rank = $1
          WHERE poll_code = $2 AND choice_text = $3
          ;`, [updatedPoints, poll_code, option])
        })
        Promise.all(promises)
        .then(() => res.send('successful update'));
     });
  });
  return router;
};
