const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 4001;

// Allow cross-origin requests
app.use(cors());

// Middware for parsing request bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('tiny'));

// nodemailer transport object
let transport = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: //e-mail,
    pass: // password
  }
};

app.post('/send-email', (req, res) => {

    let transporter = nodemailer.createTransport(transport);

    //let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    console.log(email);
    console.log(message);

    let mail = {
      from: //author
      to:  //Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: `${email} writes: ${message}`
    }

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })

  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
