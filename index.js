const express = require('express');
const client = require('twilio')('AC3acba7b4a02e6f273b03c25dfc24a637', '45e31d023f8b08fefc55fd958d0bdb95');
const { MessagingResponse } = require('twilio').twiml;
const app = express();
const port = 5000;
// const router = express.Router();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

//for sending text message from twilio
const sendTextMessage = () => {
    client.messages
        .create({
            body: 'Hello, It is a Test Message!',
            from: '+18542030461',
            // to: '+8801611748866'
            to: '+8801630697009'
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err))
}

app.get('/', (req, res) => {
    sendTextMessage();

    res.json({ 'Message': 'Message Sent Successfully' })
})

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    // twiml.message('The Robots are coming! Head for the hills!');

    // res.type('text/xml').send(twiml.toString());

    // Add a text message.
    const msg = twiml.message('Check out this sweet owl!');

    // Add a picture message.
    msg.media('https://demo.twilio.com/owl.png');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

app.listen(port, () => {
    console.log(`Listening to ${port}`);
})