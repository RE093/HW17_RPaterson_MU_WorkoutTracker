const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

// const Workout = require("./models/Workouts");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// load exercise page
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
})

// create a new workout
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(workdb => {
            res.json(workdb);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/api/workouts", (req, res) => {
    console.log(req.body);
})

app.put("/api/workouts/:id", (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

