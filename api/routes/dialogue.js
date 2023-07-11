const router = require("express").Router();
const DialogueMessages = require("../models/DialogueMessages");

//GET ALL DIALOGUE MESSAGES
router.get("/", async (req, res) => {
  try {
    const userMessages = await DialogueMessages.find();
    res.status(200).json(userMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET DIALOGUE MESSAGES FROM USER
router.get("/:userId", async (req, res) => {
  try {
    const userMessages = await DialogueMessages.find({ userId: req.params.userId });
    res.status(200).json(userMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//USER SEND DIALOGUE MESSAGE
router.post("/", async (req, res) => {
  try {
    const newDialogueMessages = new DialogueMessages({
      userId: req.body.userId,
      body: req.body.body,
      fromUser: req.body.fromUser,
    });

    const dialogueMessages = await newDialogueMessages.save();

    res.status(200).json(dialogueMessages);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
