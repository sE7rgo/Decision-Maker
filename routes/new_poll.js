const express = require('express');
const router  = express.Router();
const {mg} = require('../helper_functions/mailgun');

const { generateRandomString } = require('../public/scripts/helpers');

module.exports = (db) => {

//***************  POST Newly Created Poll to DB and Email Users ***************

  router.post("/poll/new", (req, res) => {
    const pollId = generateRandomString(6);
    const creator_email = req.session.user_id;
    const { question, options, emails, comment } = req.body;
    const values = [creator_email, question, pollId];

    db.query(`
      INSERT INTO questions
      (creator_email, question_text, poll_code)
      VALUES ($1, $2, $3)
      RETURNING *
      ;`, values)
      .catch(err => {
        console.log(err);
        return null;
      })
      .then(res => {
        return res.rows;
      })
      .then(() => {
        return Promise.all(options.map(option => {
          return db.query(`
        INSERT INTO choices
        (poll_code,choice_text)
        VALUES ($1, $2)
        RETURNING *
        ;`, [pollId, option])
            .then(res => {
              console.log(res.rows);
              return res.rows;
            })
            .catch(err => {
              console.log(err);
              return null;
            });
        }));
      })
      .then(() => {
        return Promise.all(emails.map(user_email => {
          return db.query(`
          INSERT INTO voters
          (poll_code, voter_email)
          VALUES ($1, $2)
          RETURNING *
          ;`, [pollId, user_email])
            .catch(err => {
              console.log(err);
              return null;
            })
            .then(res => {
              return res.rows;
            });
        }));
      })
      .then(()=> {
        let query = {
          text: `SELECT questions.creator_email, questions.poll_code, voters.voter_email FROM questions
        JOIN voters ON voters.poll_code = questions.poll_code
        WHERE voters.poll_code = $1`,
          values: [pollId]
        };
        //console.log(query);
        let voterEmails = [];
        db.query(query)
          .then(data => {
            console.log({data});
            const poll_id = data.rows[0].poll_code;
            const creatorEmail = req.session.user_id;
            for (const row of data.rows) {
              voterEmails.push(row.voter_email);
            }
            let insertVoters = voterEmails.toString().replace(/,/g, ', ');

            // Mailgun Sendout to Users and Creator  ${creatorEmail}, ${insertVoters}
            const inputData = {
              from: 'Decision Maker<graham.l.tyler@gmail.com>',
              to: `${creatorEmail}, ${insertVoters}`,
              subject: 'Decision-Maker Poll',
              text: `Clicking this link will take you to Decision Maker where ${creatorEmail} has posted a poll that they want you vote on. \n http://localhost:8080/poll/${poll_id}`
            };

            mg.messages().send(inputData, function(err, body) {
              if (err) {
                console.log("got an error: ", err);
              } else {
                console.log(body);
                res.redirect(`/pollResults/${poll_id}`);
              }
            });
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      });


  });
  return router;
};
