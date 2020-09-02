const db = require("../models");
console.log(db)

module.exports = app => {
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
        db.Workout.create({
            day: new Date(),
            exercises: []
         })
         .then(data => {
             res.json(data);
         })
    })

    app.put('/api/workouts/:id', (req, res) => {
        const id = req.params.id;
        const body = req.body;
        let exData;

        if (body.type === "cardio") {
            exData = {
                type: body.type,
                name: body.name,
                duration: body.duration,
                distance: body.distance
            }
        }   

        if (body.type === "resistance") {
            exData = {
                type: body.type,
                name: body.name,
                duration: body.duration,
                weight: body.weight,
                reps: body.reps,
                sets: body.sets
            }
        }

        db.Workout.updateOne ({ _id: id }, { $push: { exercises: exData }}, (err, success) => {
            if (err) {
                res.json(err)
            }
            else {
                console.log(success)
                res.json(success)
            }
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
