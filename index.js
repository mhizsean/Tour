const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/form', (req, res) => {
    // console.log(req.body)
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h3>Conatch Details</h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Tel: ${req.body.tel}</li>
                <li>Email: ${req.body.email}</li>
            </ul>
            <h3>Subject</h3>
            <p>${req.body.subject}</p>
            <h3>Message</h3>
            <p>${req.body.message}</p>

        `

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: 'alexandro67@ethereal.email',
                pass: 'zHVnEC4mbmsM6yzW18'
            }
        })

        let mailOptions = {
            from: 'test@gmail.com',
            to: 'alexandro67@ethereal.email',
            replyTo: 'test@gmail.com',
            subject: 'New new',
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                return console.log(err);
            } 

            console.log('Message Sent: %s', info.message);
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })

    })
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)
})