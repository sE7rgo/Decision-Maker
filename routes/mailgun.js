/*
**** This code is directly from the mailgun website ******
It is only used for sending email to a restricted client list of 5 verifiable email
addresses.  Graham holds the registration for the user profile on mailgun.com. For demonstration purposes we can set up to 3 more recipients.

*****  this still requires some troubleshooting and further setup  *******

*/
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN_NAME;
const api_key = process.env.MAILGUN_API_KEY;
const mg = mailgun({apiKey: api_key, domain: DOMAIN});
const data = {
	from: 'Poll_Creator <graham.l.tyler@gmail.com>',  //registered mailgun user
	to: 'lord_proton@yahoo.ca, another@email.com, another@email.com, another@email.com',
	subject: 'Decision-Maker Poll',
	text: 'You need to vote on this Poll'
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});
module.exports = {mailgun};
