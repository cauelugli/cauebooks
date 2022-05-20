const mongoose = require("mongoose");

const UserVerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    uniqueString: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserVerification", UserVerificationSchema);
