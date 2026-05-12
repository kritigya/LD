const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Elder = require("../models/Elder");
const GenZ = require("../models/GenZ");


// ================= REGISTER =================

router.post("/register", async (req, res) => {

  try {

    const {
      role,
      name,
      email,
      password,
      phone,
      age,
      college,
      skills
    } = req.body;

    // CHECK EXISTING USER

    const existingElder =
      await Elder.findOne({ email });

    const existingGenz =
      await GenZ.findOne({ email });

    if (existingElder || existingGenz) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    let user;

    // CREATE ELDER

    if (role === "elder") {

      user = new Elder({

        name,
        email,
        password: hashedPassword,
        phone,
        age,
        role

      });

    }

    // CREATE GENZ

    else if (role === "genz") {

      user = new GenZ({

        name,
        email,
        password: hashedPassword,
        phone,
        college,
        skills,
        role

      });

    }

    else {

      return res.status(400).json({
        message: "Invalid role"
      });

    }

    await user.save();

    res.json({
      message: "Registered Successfully"
    });

  } catch (err) {

  console.log("FULL ERROR:");
  console.log(err);

  res.status(500).json({
    message: err.message,
    error: err
  });

}

});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // FIND USER

    let user =
      await Elder.findOne({ email });

    let role = "elder";

    if (!user) {

      user =
        await GenZ.findOne({ email });

      role = "genz";

    }

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      });

    }

    // TOKEN

    const token =
      jwt.sign(

        {
          id: user._id,
          role
        },

        "grandbuddysecret",

        {
          expiresIn: "7d"
        }

      );

    res.json({

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role
      }

    });

  } catch (err) {

  console.log("FULL ERROR:");
  console.log(err);

  res.status(500).json({
    message: err.message,
    error: err
  });

}

});

module.exports = router;