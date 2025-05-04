const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bcrypt = require("bcrypt");
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://root:password@db:27017/superapp_db?authSource=admin";

const taskSchema = mongoose.Schema({
  name: String,
  description: String,
  readiness: Boolean,
  created: Date,
  priority: Number,
  userId: mongoose.Schema.Types.ObjectId,
});

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  age: Number,
  country: String,
  gender: String,
  pfp: String,
  phone: String,
  isAdmin: Boolean,
});

const tempUserSchema = mongoose.Schema({
  username: String,
  loggedIn: Boolean,
  isAdmin: Boolean,
  userId: mongoose.Schema.Types.ObjectId,
  email: String,
});

const mainPageSchema = mongoose.Schema({
  image: String,
  name: String,
  nameOnRussian: String,
  description: String,
  descriptionOnRussian: String,
  created: Date,
});

const Task = new mongoose.model("tasks", taskSchema, "tasks");
const User = new mongoose.model("users", userSchema, "users");
const tempUser = new mongoose.model("tempUser", tempUserSchema, "tempUser");
const MainPage = new mongoose.model("main-page", mainPageSchema, "main-page");

try {
  mongoose.connect(url);
} catch (e) {
  console.error(e);
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
              userId: new mongoose.Types.ObjectId(req.query.id),
            }
          : {
              priority: req.query.priority,
              userId: new mongoose.Types.ObjectId(req.query.id),
            }
        : +req.query.isReady !== 0
        ? {
            readiness: +req.query.isReady === 1 ? true : false,
            userId: new mongoose.Types.ObjectId(req.query.id),
          }
        : {
            userId: new mongoose.Types.ObjectId(req.query.id),
          };
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
  const { firstName, lastName, email, username, password, pfp, isAdmin } =
    req.body;
  const salt = await bcrypt.genSalt(10);
  const body = new User({
    firstName,
    lastName,
    email,
    username,
    pfp,
    isAdmin,
    password: await bcrypt.hash(password, salt),
  });
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
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        pfp: req.body.pfp,
        gender: req.body.gender,
        country: req.body.country,
        phone: req.body.phone,
        age: req.body.age,
      },
      {
        new: true,
      }
    );
    res.status(201).json(user);
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
    });
    if (
      user.length === 1 &&
      (await bcrypt.compare(req.body.password, user[0].password))
    ) {
      const result = await tempUser.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          loggedIn: true,
          isAdmin: user[0].isAdmin,
          userId: user[0]._id,
          email: user[0].email,
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

app.put("/logoutTempUser/:id", async (req, res) => {
  try {
    const result = await tempUser.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      {
        username: "",
        loggedIn: false,
        isAdmin: req.body.isAdmin,
        userId: new mongoose.Types.ObjectId(),
      },
      { new: true }
    );
    res.status(201).json({ message: "You successfully log out", result });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

app.post("/sendEmail", async (req, res) => {
  const { user, pass, to, subject, text, filename, content, service } =
    req.body;
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: "smtp" + service,
    secure: false,
    port: 587,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: user,
    to,
    attachments: filename
      ? [
          {
            filename,
            content,
          },
        ]
      : null,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).send({
        message: "Something went wrong, check out inputs and try again!",
        error,
      });
    } else {
      res.status(200).send({ message: info.response });
    }
  });
});

app.get("/main-page", async (req, res) => {
  try {
    const result = await MainPage.find();
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json({ message: "Error" });
  }
});

app.post("/main-page", async (req, res) => {
  const body = new MainPage(req.body);
  try {
    const newMainPageItem = await body.save();
    res.status(201).json(newMainPageItem);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.delete("/main-page/:id", async (req, res) => {
  try {
    const home = await MainPage.findByIdAndDelete(req.params.id);
    res.status(201).json(home);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.put("/main-page/:id", async (req, res) => {
  try {
    const home = await MainPage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(home);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
