const router = require("express").Router();
const GenZ = require("../models/GenZ");

// Add GenZ
router.post("/", async (req, res) => {
  const genz = new GenZ(req.body);
  await genz.save();
  res.json(genz);
});

// Get all GenZ
router.get("/", async (req, res) => {
  const genzs = await GenZ.find();
  res.json(genzs);
});

// Update GenZ (edit info or toggle verified)
router.put("/:id", async (req, res) => {
  const updated = await GenZ.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete GenZ
router.delete("/:id", async (req, res) => {
  await GenZ.findByIdAndDelete(req.params.id);
  res.json({ message: "GenZ deleted" });
});

module.exports = router;
