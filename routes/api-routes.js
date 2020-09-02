const db = require("../models");

// Getting all the workouts, aids the Last Workout render on the first page
module.exports = app => {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(workoutData => {
                res.json(workoutData);
            })
            .catch(err => {
                res.json(err);
            });
    });
    
    // Creating a new empty workout, which is followed by the update to add exercise data
    app.post("/api/workouts", (req, res) => {
        db.Workout.create({
            day: new Date(),
            exercises: []
        })
         .then(newWorkout => {
             res.json(newWorkout);
         })
    })

    // Finds the ID of the newly created workout and then decides whether that data is a
    // "cardio" or "resistance" workout and adds the exercise to the exercise array accordingly
    app.put('/api/workouts/:id', (req, res) => {
        const id = req.params.id;
        const body = req.body;
        let exerciseData;

        if (body.type === "cardio") {
            exerciseData = {
                type: body.type,
                name: body.name,
                duration: body.duration,
                distance: body.distance
            }
        }   

        if (body.type === "resistance") {
            exerciseData = {
                type: body.type,
                name: body.name,
                duration: body.duration,
                weight: body.weight,
                reps: body.reps,
                sets: body.sets
            }
        }

        // This is where the update occurs.
        db.Workout.updateOne ({ _id: id }, { $push: { exercises: exerciseData }})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
    });

    // This finds all the data required to render the graphs when you go to the "stats"
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .then(workoutData => {
            res.json(workoutData)
        })
        .catch(err => {
            res.json(err)
        })
    })
}
