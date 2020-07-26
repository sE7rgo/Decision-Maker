const express = require('express');
const router  = express.Router();

/* cookie_session for user login */
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['qwertasknxkcoiwokjsadkjhsad']
}));
const bodyParser = require("body-parser");

router.get("/login", (req, res) => {
  res.render("index", { email : null});
})

router.post("/login", (req, res) => {
  console.log(res.body)
  console.log(req.params)
  res.render("index", { email : null});
})

module.exports = router;


// app.get('/login', (req, res) => {
//   req.session.email = req.params.email;
//   let templateVars = {
//     email = req.session.email
//   }
//   res.render("index", templateVars);
// })

// app.post('/login', (req, res) => {
//   const email = req.body.email;
//   req.session.email = email;
//   console.log('this req', req.session)
//   console.log('this body', req.body)
//   return res.redirect('index', { email:null });
// }
