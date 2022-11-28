const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Version: {
    type: String,
    required: false,
  },
  Artist: {
    type: String,
    required: false,
  },
  ISRC: {
    type: String,
    required: false,
  },
  P_Line: {
    type: String,
    required: false,
  },
  Aliases: {
    type: Array,
    required: false,
  },
  Contract_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
  },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = { Track };
