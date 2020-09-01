const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// To distinguish the information being passed in as exercises between cardio and resistance.
let resistance = true;
let cardio = false;

let exerciseSchema;

if (resistance) {
  exerciseSchema = {
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number
  };
} else if (cardio) {
  exerciseSchema = {
    type: String,
    name: String,
    duration: Number,
    distance: Number
  }
}

const WorkoutSchema = new Schema({
  day: Date,
  exercises: 
    [ 
      exerciseSchema
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;