const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// To distinguish the information being passed in as exercises between cardio and resistance.
let resistance = true;
let cardio = false;

const exerciseSchema = new mongoose.Schema;

if (resistance) {
  exerciseSchema.add({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number
  });
} else if (cardio) {
  exerciseSchema.add({
    type: String,
    name: String,
    duration: Number,
    distance: Number
  })
}

// const resistanceSchema = new mongoose.Schema({
//   type: String,
//   name: String,
//   duration: Number,
//   weight: Number,
//   reps: Number,
//   sets: Number,
// });

// const cardioSchema = new mongoose.Schema({
//   type: String,
//   name: String,
//   duration: Number,
//   distance: Number,
// });

const WorkoutSchema = new Schema({
  day: Date,
  exercises: 
    [ 
      exerciseSchema
      // resistanceSchema,
      // cardioSchema
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;