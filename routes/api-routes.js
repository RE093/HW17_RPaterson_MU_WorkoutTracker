const db = require("../models");
console.log(db)

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
    
    app.post("/api/workouts", (req, res) => {
        db.Workout.create({
            day: new Date(),
            exercises: [],
            totalDuration: 0
         })
         .then(newWorkout => {
             res.json(newWorkout);
         })
    })

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

        db.Workout.updateOne ({ _id: id }, { $push: { exercises: exerciseData }})
        .then(result => {
            db.Workout.findOne ({ _id: id }, (err, data) => {
                if (err) {
                    res.json(err)
                }
                else {
                    let currentDuration = data.totalDuration
                    db.Workout.updateOne({ _id: id }, { $set: { totalDuration: (exerciseData.duration + currentDuration)}}, (err, success) => {
                        if (err) {
                            res.json(err)
                        }
                        else {
                            console.log(success)
                            res.json(success)
                        }
                    })

                }
            })
        })
    });

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
