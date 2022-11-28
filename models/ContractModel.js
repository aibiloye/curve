const mongoose = require("mongoose");

const contractSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
});

const Contract = mongoose.model("Contract", contractSchema);

module.exports = { Contract };
