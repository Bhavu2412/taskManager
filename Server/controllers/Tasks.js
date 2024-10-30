const User = require("../models/User");
const Tasks = require("../models/tasks");

// Get all tasks for a user
exports.getTasks = async (req, res, next) => {
  const userId = req.userId;
  console.log("Hey there");

  try {
    const tasks = await Tasks.find({ user: userId });
    console.log("Reached here!");
    return res.status(200).json({ message: "Tasks found!", tasks: tasks });
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: "Failed to retrieve tasks." });
  }
};

// Get a single task by ID
exports.getTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Tasks.findById(taskId)
    .then((result) => {
      if (!result) {
        const err = new Error("Task not found!");
        err.statusCode = 404;
        throw err;
      }
      res.json({ message: "Task found!", task: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Add a new task
exports.addTasks = (req, res, next) => {
  const { title, done, description, detailedDescription } = req.body;

  if (!title || !description || !detailedDescription) {
    const err = new Error(
      "Title, description, or detailed description missing."
    );
    err.statusCode = 400;
    throw err;
  }

  const task = new Tasks({
    title: title,
    done: done || false,
    user: req.userId,
    description: description,
    detailedDescription: detailedDescription,
  });

  task
    .save()
    .then((savedTask) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      if (!user) {
        const err = new Error("No user found! Please log in.");
        err.statusCode = 404;
        throw err;
      }
      user.Tasks.addToSet(task._id);
      return user.save();
    })
    .then((result) => {
      res.json({ message: "Task saved successfully!", task: task });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log("Error is", err);
      next(err);
    });
};

// Edit an existing task
exports.editTasks = (req, res, next) => {
  const taskId = req.params.taskId;
  const { title, done, description, detailedDescription } = req.body;

  Tasks.findById(taskId)
    .then((task) => {
      if (!task) {
        const err = new Error("No task found.");
        err.statusCode = 404;
        throw err;
      }

      if (title) task.title = title;
      if (description) task.description = description;
      if (detailedDescription) task.detailedDescription = detailedDescription;
      if (done !== undefined) task.done = done;

      return task.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Task updated successfully.", task: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Toggle task completion status
// In your taskController.js
exports.putTasks = async (req, res, next) => {
  const taskId = req.params.taskId;
  const { completed } = req.body;

  try {
    const task = await Tasks.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = completed;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Updating task failed", error });
  }
};

// Delete a task
// In your taskController.js
exports.deleteTasks = async (req, res, next) => {
  const taskId = req.params.taskId;

  try {
    const task = await Tasks.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.deleteOne(); // Deletes the task from the database
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Deleting task failed", error });
  }
};
