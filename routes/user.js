const express = require('express');
const router  = express.Router();


router.post("/login", (req, res) => {
  req.session.user_id = req.body.creator_email;
  res.render('index', { email: req.session.user_id})
})

router.post("/logout", (req, res) => {
  req.session = null;
  res.render('index', { email: null})
})

module.exports = router;
