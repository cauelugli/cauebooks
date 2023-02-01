require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");

//REGISTERING
router.post("/register", async (req, res) => {
  try {
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(403).json();
    }

    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(409).json();
    }

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

    const sendMail = (to, subject, message) => {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const options = {
        from: process.env.EMAIL_SENDER,
        to: req.body.email,
        subject,
        text: message,
      };

      transporter.sendMail(options, (error, info) => {
        if (error) console.log(error);
        else console.log(info);
      });
    };

    // sendMail(req.body.email, "subject", "Is this the real life?");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json()
    } else {
      if (!user.verified) {
        res.status(409).json()
      }
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(401).json();

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(400);
  }
});

module.exports = router;
