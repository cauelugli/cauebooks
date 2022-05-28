require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready for email sending?", success);
  }
});

//REGISTERING
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashedPass,
      verified: false,
    });

    const user = await newUser.save();

    sendVerificationEmail(user);
    
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const sendVerificationEmail = ({ _id, email }) => {
  const saltRounds = 10;
  const uniqueString = uuidv4() + _id;
  bcrypt.hash(uniqueString, saltRounds)
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verificação de Email",
    html: `
    <p>Obrigado por registrar-se em cauebooks!</p>
    <p>Clique no link abaixo para validar sua conta!</p>
    <p>${"http://localhost:3000/user/verify/" + _id + "/" + uniqueString}</p>
    `,
  };

  transporter.sendMail(mailOptions)
};

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user || !user.verified && res.status(400).json();

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json();

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(400);
  }
});

module.exports = router;
