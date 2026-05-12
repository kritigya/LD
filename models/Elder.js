const mongoose = require("mongoose");

const elderSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  age: Number,

  phone: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "elder"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Elder", elderSchema);