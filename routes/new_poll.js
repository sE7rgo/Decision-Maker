const express = require('express');
const router  = express.Router();

const { generateRandomString } = require('../public/scripts/helpers');


router.post("/poll/new", (req, res) => {
  const url = generateRandomString(6);

  res.redirect(`/${url}`);
});

module.exports = router;
