const express = require("express");
const router = express.Router();
const zod = require("zod");
const authMiddleware = require("../middlewares/auth");
const Task = require("../models/task.model");

const createTaskBodySchema = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const updateTaskBodySchema = zod.object({
  title: zod.string().optional(),
  description: zod.string().optional(),
});

// Get TODO
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const tasks = await Task.find(
      {
        userId: req.userId,
        title: {
          $regex: filter,
          $options: "i",
        },
      },
      "title description createdAt updatedAt"
    );

    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting all tasks",
      error: err.message,
    });
  }
});

// Create TODO
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { success } = createTaskBodySchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Invalid Input Data",
      });
    }

    const newTask = await Task.create({
      userId: req.userId,
      title: req.body.title,
      description: req.body.description,
    });

    return res.status(201).json({
      message: "Task created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating task",
      error: err.message,
    });
  }
});

// Update TODO
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const { success, data } = updateTaskBodySchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Invalid Inputs",
      });
    }

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: id,
        userId: req.userId,
      },
      {
        ...data,
        updatedAt: Date.now(),
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task Updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating task",
      error: err.message,
    });
  }
});

// Delete a particular TODO
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTask = await Task.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });
    if (!deleteTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting a task",
      error: err.message,
    });
  }
});

// Delete all TODO
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const result = await Task.deleteMany({ userId: req.userId });

    return res.status(200).json({
      message: "All task deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting all todo",
    });
  }
});
module.exports = router;
