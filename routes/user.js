const express = require('express');
const router  = express.Router();
const app = express()

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
  console.log('this is body', req.body)
  console.log('this params', req.params.id)
  req.session.user_id = req.params.id;
  res.render('index', { email: req.session.user_id})
})

module.exports = router;


// app.get('/login', (req, res) => {
//   rn.email = req.params.email;
//   let templateq.sessioeVars = {
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
