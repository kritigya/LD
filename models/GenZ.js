const mongoose = require("mongoose");

const genzSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  college: String,

  skills: String,

  phone: String,
gender: {
  type: String,
  enum: ["male", "female"],
  default: "male"
},
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
    default: "genz"
  },

  verified: {
    type: Boolean,
    default: false
  },

  totalHoursWorked: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("GenZ", genzSchema);