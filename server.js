const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const elderRoutes = require("./routes/elders");
const genzRoutes = require("./routes/genz");
const bookingRoutes = require("./routes/bookings");
const authRoutes = require("./routes/auth");
// const app = express();


const app = express();

const cors = require("cors");

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("EldyKare Backend is Running 🚀");
});
app.use(express.json());
// app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/elders", require("./routes/elders"));
app.use("/api/genz", require("./routes/genz"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/elders", elderRoutes);
app.use("/api/genz", genzRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(5001, () => console.log("Server running on 5001"));
