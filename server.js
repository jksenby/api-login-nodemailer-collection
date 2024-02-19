const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://localhost:27017/todolist_db";

const schema = mongoose.Schema({
  name: String,
  description: String,
  readiness: Boolean,
  created: Date,
  priority: Number,
});

const Task = new mongoose.model("tasks", schema, "tasks");

try {
  mongoose.connect(url);
} catch (e) {
  console.error(e);
  console.log(2);
}

app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const field =
      +req.query.priority !== 0
        ? +req.query.isReady !== 0
          ? {
              priority: req.query.priority,
              readiness: +req.query.isReady === 1 ? true : false,
            }
          : { priority: req.query.priority }
        : +req.query.isReady !== 0
        ? { readiness: +req.query.isReady === 1 ? true : false }
        : {};
    const result = await Task.find(field);
    return res.status(201).json(result);
  } catch (e) {
    console.log(e);
  }
});

app.get("/tasks/:id", async (req, res) => {
  const result = await Task.find({ _id: req.params.id });
  res.status(201).json(result);
});

app.post("/tasks", async (req, res) => {
  const body = new Task(req.body);

  try {
    const newTask = await body.save();
    res.status(201).json(newTask);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.put("/tasks", async (req, res) => {
  const newTask = {
    name: req.body.name,
    description: req.body.description,
    readiness: req.body.readiness,
    priority: req.body.priority,
  };
  try {
    const task = await Task.findByIdAndUpdate(req.body.id, newTask, {
      new: true,
    });
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
