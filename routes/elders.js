const router = require("express").Router();
const Elder = require("../models/Elder");

// CREATE elder
router.post("/", async (req, res) => {
  const elder = new Elder(req.body);
  await elder.save();
  res.json(elder);
});

// GET all elders
router.get("/", async (req, res) => {
  const elders = await Elder.find();
  res.json(elders);
});

// UPDATE elder ⭐ ADD THIS
router.put("/:id", async (req, res) => {
  const updated = await Elder.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE elder ⭐ ADD THIS
router.delete("/:id", async (req, res) => {
  await Elder.findByIdAndDelete(req.params.id);
  res.json({ message: "Elder deleted" });
});

module.exports = router;