const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
          default: Date.now
  },
  exercises: 
    [ 
      {
        type: {
          type: String
        },
        name: {
          type: String,
          trim: true,
          required: "Please enter an exercise name"
        },
        duration: {
          type: Number,
          required: "Please enter the duration of the exercise in minutes"
        },
        distance: {
          type: Number
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number
        } 
      }
    ],
    totalDuration: {
      type: Number
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;