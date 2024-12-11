const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.static(path.join(__dirname, 'src')))

app.use(express.json())

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "src", "/index.html"));

})



app.post("/login_forgot.html", (req, res) => {

    console.log(req.body);

    const transpoter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: "c384061950e25c",
            pass: "b88f69ef904179"
        }
    });


    const mailOptions = {
        from: 'info@blockvote.chain',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message
    }


    transpoter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    });


})

app.get("/admin_login", (req, res) => {
    req.session.user = user;
    req.session.save();
    return res.sendFile(path.join(__dirname, "src", "/dashboard.html"));;
});

app.post("/admin_login_forgot.html", (req, res) => {

    console.log(req.body);

    const transpoter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: "c384061950e25c",
            pass: "b88f69ef904179"
        }
    });


    const mailOptions = {
        from: 'info@blockvote.chain',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message
    }


    transpoter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    });


})

const server = app.listen(5000);

const portNumber = server.address().port;

console.log(`port is open on ${portNumber}`);

