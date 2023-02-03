require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/User");

//REGISTERING
router.post("/register", async (req, res) => {
  try {
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
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
      res.status(400).json();
    } else {
      if (!user.verified) {
        res.status(409).json();
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

//FORGOT PASSWORD
router.post("/forgotPassword", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json();
    } else {
      function generateRandomString(length) {
        let result = "";
        let characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }

      const newPass = generateRandomString(10);
      const salt = await bcrypt.genSalt(10);
      const newHashedPass = await bcrypt.hash(newPass, salt);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $set: { password: newHashedPass },
        },
        { new: true }
      );
      res
        .status(200)
        .json({
          updatedUser,
          newPass,
          username: user.username,
          email: user.email,
        });
    }
  } catch (err) {
    res.status(400);
  }
});

module.exports = router;
