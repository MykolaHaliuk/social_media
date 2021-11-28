const mongoose = require("mongoose");

const MassageSchema = new mongoose.Schema(
  {
    converstationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Massage", MassageSchema);
