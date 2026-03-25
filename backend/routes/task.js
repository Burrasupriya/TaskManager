const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

// CREATE
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: new mongoose.Types.ObjectId(req.user.id),
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET (FIXED OBJECTID BUG)
router.get("/", auth, async (req, res) => {
  try {
    const { status, priority, search, sort } = req.query;

    let q = {
      user: new mongoose.Types.ObjectId(req.user.id),
    };

    if (status) q.status = status;
    if (priority) q.priority = priority;
    if (search) q.title = { $regex: search, $options: "i" };

    let query = Task.find(q);

    if (sort === "dueDate") query = query.sort({ dueDate: 1 });
    else if (sort === "priority") query = query.sort({ priority: -1 });
    else query = query.sort({ createdAt: -1 });

    const tasks = await query;

    console.log("TASKS FOUND:", tasks); // debug

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      user: new mongoose.Types.ObjectId(req.user.id),
    },
    req.body,
    { new: true }
  );

  res.json(task);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: new mongoose.Types.ObjectId(req.user.id),
  });

  res.json({ msg: "Deleted" });
});

// STATS
router.get("/stats", auth, async (req, res) => {
  const user = new mongoose.Types.ObjectId(req.user.id);

  const total = await Task.countDocuments({ user });
  const completed = await Task.countDocuments({
    user,
    status: "Done",
  });

  res.json({
    total,
    completed,
    pending: total - completed,
    percentage: total
      ? ((completed / total) * 100).toFixed(1)
      : 0,
  });
});

module.exports = router;