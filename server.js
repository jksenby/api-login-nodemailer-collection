const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://localhost:27017/superapp_db";

const taskSchema = mongoose.Schema({
  name: String,
  description: String,
  readiness: Boolean,
  created: Date,
  priority: Number,
});

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  age: Number,
  Country: String,
  Gender: String,
  pfp: String,
});

const tempUserSchema = mongoose.Schema({
  username: String,
  loggedIn: Boolean,
});

const Task = new mongoose.model("tasks", taskSchema, "tasks");
const User = new mongoose.model("users", userSchema, "users");
const tempUser = new mongoose.model("tempUser", tempUserSchema, "tempUser");

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
  try {
    const result = await Task.find({ _id: req.params.id });
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
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

app.get("/users", async (req, res) => {
  try {
    const result = await Task.find();
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json({ message: "Error" });
  }
});

app.get("/users/:username", async (req, res) => {
  try {
    const result = await User.find({ username: req.params.username });
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json({ message: "Error" });
  }
});

app.post("/users", async (req, res) => {
  const body = new User(req.body);

  try {
    const check = await User.find({ username: req.body.username });
    if (check.length === 0) {
      const newUser = await body.save();
      res.status(201).json(newUser);
    } else {
      res.status(201).json({ check: "There is already such user" });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const newTask = {
    name: req.body.name,
    description: req.body.description,
    readiness: req.body.readiness,
    priority: req.body.priority,
  };
  try {
    const task = await Task.findByIdAndUpdate(req.params, newTask, {
      new: true,
    });
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.get("/tempUser", async (req, res) => {
  try {
    const result = await tempUser.find({ _id: "65d60450684da12832039223" });
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json({ message: "Error" });
  }
});

app.put("/tempUser/:id", async (req, res) => {
  try {
    const user = await User.find({
      username: req.body.username,
      password: req.body.password,
    });
    if (user.length === 1) {
      const result = await tempUser.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          loggedIn: true,
        },
        { new: true }
      );
      res.status(201).json({ message: "You successfully signed in", result });
    } else {
      res.status(401).json({ message: "The username or password is wrong" });
    }
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
