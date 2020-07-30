const express = require('express');
const router  = express.Router();
const {borda} = require('../helper_functions/borda');

module.exports = (db) => {

  //*********************  POST vote to DB  *********************************

  router.post("/vote/new", (req, res) => {
    console.log('this is reqbody.........',req.body)
    const { options, poll_code, borda_rank } = req.body;
    let newRankings = [];
    let oldRankings = [];
    let updatedPoints = [];
    for (const rank of borda_rank) {  //compile new Rankings from page
      newRankings.push(rank);
    }
    let query = {
      text: `SELECT borda_rank
      FROM choices
      WHERE poll_code = $1`,
      values: [req.params.id]
    };
    db.query(query)               //initiate query to fetch old rankings fm DB
      .then(data => {
        for (const row of data.rows) {
          oldRankings.push(row.borda_rank);
        }
        updatedPoints = borda(oldRankings, newRankings); //call borda method

        const promises = options.map((option) => {  //conduct update of rankings in DB
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
