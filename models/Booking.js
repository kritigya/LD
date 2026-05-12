const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
story: {
  type: String
},

review: {
  type: String
},

happyMomentMedia: {
  type: String
},
  elder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Elder"
  },

  genz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GenZ"
  },

  slot: {
    type: String
  },

  date: {
    type: Date
  },

  status: {
    type: String,
    default: "Pending"
  },

  hours: {
    type: Number,
    default: 1
  },

  amount: {
    type: Number,
    default: 299
  }


  
}, {
  timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);