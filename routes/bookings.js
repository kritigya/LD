const router = require("express").Router();
const Booking = require("../models/Booking");
const GenZ = require("../models/GenZ");
const multer = require("multer");
const path = require("path");

// ---------------- Multer Config ----------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // files go to uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) cb(null, true);
  else cb(new Error("File type not allowed"), false);
};

const upload = multer({ storage, fileFilter });

// ---------------- Routes ----------------

// Create booking with optional file upload
router.post("/", upload.single("happyMomentMedia"), async (req, res) => {
  try {
const {
  elder,
  genz,
  slot,
  date,
  status,
  hours,
  amount,
  story,
  review
} = req.body;
    const filePath = req.file ? req.file.path : ""; // store uploaded file path

    const booking = new Booking({
      elder,
      genz,
      slot,
      date,
      status,
      hours,
      amount,
      story,
      review,
      happyMomentMedia: filePath,
    });

    await booking.save();

    // Update GenZ total hours
    await GenZ.findByIdAndUpdate(genz, { $inc: { totalHoursWorked: Number(hours) } });

    // Populate elder and genz for response
    const fullBooking = await Booking.findById(booking._id)
      .populate("elder")
      .populate("genz");

    res.json(fullBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("elder")
      .populate("genz");

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.put("/:id", async (req, res) => {

  try {

    const booking = await Booking.findByIdAndUpdate(

      req.params.id,

      {
        status: req.body.status
      },

      { new: true }

    );

    res.json(booking);

  } catch (err) {

    res.status(500).json(err);

  }

});
module.exports = router;
