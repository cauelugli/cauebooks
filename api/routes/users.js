const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.keyPattern.username === 1) {
      return res.status(403).json();
    }
    if (err.keyPattern.email === 1) {
      return res.status(409).json();
    } else {
      res.status(500).json(err);
    }
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER FAVORITES
router.get("/:id/favorites", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LIKE POST
router.put("/like/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { likesList: { name: req.body.likes, id: req.body.id } } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UNLIKE POST
router.put("/unlike/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { likesList: { name: req.body.likes, id: req.body.id } } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//FAVORITE POST
router.put("/favorite/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { favoritesList: { name: req.body.favorites, id: req.body.id } },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UNFAVORITE POST
router.put("/unfavorite/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { favoritesList: { name: req.body.favorites, id: req.body.id } },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
