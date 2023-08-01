const mongoose = require("mongoose");

const DialogueMessagesSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    fromUser: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DialogueMessages", DialogueMessagesSchema);
