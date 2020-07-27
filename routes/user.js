const express = require('express');
const router  = express.Router();


<<<<<<< HEAD
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
=======
router.post("/login", (req, res) => {
  req.session.user_id = req.body.creator_email;
  res.render('index', { email: req.session.user_id})
})
>>>>>>> 64e8c9aac66fb26b3064a7c9b8995d1d76e4b802

router.post("/logout", (req, res) => {
  req.session = null;
  res.render('index', { email: null})
})

module.exports = router;
