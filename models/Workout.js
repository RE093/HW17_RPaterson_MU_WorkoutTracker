const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String
      },
      name: {
        type: String,
        required: "Enter an exercise name"
      },
      distance: {
        type: Number
      },
      duration: {
        type: Number,
        required: "Enter an exercise duration in minutes"
      },
      weight: {
        type: Number
      },
      sets: {
        type: Number
      },
      reps: {
        type: Number
      }
    }
  ]},
  {
  toJSON: {
    virtuals: true 
  }
});

WorkoutSchema.virtual("totalDuration").get(function() {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;