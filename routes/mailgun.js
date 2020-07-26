/*
**** This code is directly from the mailgun website ******
* It is only used for sending email to a restricted client list of 5 verifiable email
addresses.
* Graham holds the registration for the user profile on mailgun.com. For demonstration purposes we can set up to 3 more recipients.
* This is tested and functioning.

*/
require('dotenv').config()
const mailgun = require('mailgun-js');
const domain = process.env.MG_DOMAIN_NAME;
const api_key = process.env.MG_API_KEY;
const mg = mailgun({apiKey: api_key, domain: domain});
const data = {
	from: 'Poll_Creator <graham.l.tyler@gmail.com>',
	to: 'lord_proton@yahoo.ca ',
	subject: 'Decision-Maker Poll',
	text: 'You need to vote on this Poll'
};
mg.messages().send(data, function (err, body) {
  if (err) {
    console.log("got an error: ", err);
} else {
  console.log(body);
}
});


//module.exports = {mailgun};
