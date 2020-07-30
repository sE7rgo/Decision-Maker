// load .env data into process.env

require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(cookieSession({
  name: 'session',
  keys: ['qwertasknxkcoiwokjsadkjhsad']
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


// Separated Routes for each Resource

const userRoutes = require("./routes/user");              //Routes for login/logout
const questionsRoutes = require("./routes/questions");    //Routes for DB queries
const newPollRoutes = require("./routes/new_poll");         //Routes for new polls
const pollRoutes = require("./routes/poll");
<<<<<<< HEAD
const voteRetrieve = require("./routes/vote_retrieve");
=======
const voteRetrieve = require("./routes/vote_retrieve")         //Routes for new polls
>>>>>>> gt_routeConns
// Mount all resource routes
app.use(userRoutes);
app.use(newPollRoutes(db));
app.use(pollRoutes(db));
app.use('/api', questionsRoutes(db));
app.use(voteRetrieve(db));


app.get("/", (req, res) => {               //landing page with/without user login
  console.log(Pool)
  return(req.session.user_id
   ? res.render("index", { email : req.session.user_id})
   : res.render("index", { email : null})
  );
});

// Server listen
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});
