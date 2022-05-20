require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");
const UserVerification = require("../models/UserVerification");

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
  const currentUrl = "http://localhost:3000/";
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verificação de Email",
    html: `
    <p>Verifique seu Email para Criar sua Conta</p>
    <p>${currentUrl + "user/verify/" + _id + "/" + uniqueString}</p>
    `,
  };

  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
      });

      newVerification
        .save()
        .then(() => {transporter.sendMail(mailOptions)})
        .catch((err) => {console.log(err)});
    })

    .catch((err) => {console.log(err)});
};

//EMAIL VERIFICATION
router.get("/verify/:userId/:uniqueString", async (req, res) => {
  let { userId, uniqueString } = req.params;

  await UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        // user exists
        const hashedUniqueString = result[0].uniqueString;
        bcrypt.compare(uniqueString, hashedUniqueString).then((result) => {
          if (result) {
            User.updateOne({ _id: userId }, { verified: true }).then(() => {
              UserVerification.deleteOne({ userId }).then(() => {
                res.redirect("/login");
              });
            });
          }
        });
      } else {
        console.log(result);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

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
