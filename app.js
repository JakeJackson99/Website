// Credit to Vicortia Lo for tutorial on Nodemailer

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

transporter.verify((error, success) => {
  if (error) console.log(error);
  else console.log("Server is ready to take our messages.");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};

  form.parse(req, function (err, fields) {
    console.log(fields);

    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    console.log(data);
    const mail = {
      sender: `${data.name} <${data.email}>`,
      to: process.env.EMAIL, // receiver email,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.redirect('/')
      }
    });
    
  });
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
