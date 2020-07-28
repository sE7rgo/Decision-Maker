const express = require('express');
const router  = express.Router();


router.post("/login", (req, res) => {
  req.session.user_id = req.body.creator_email;
  res.redirect('/');
});

router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
