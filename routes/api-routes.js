const db = require("../models");
console.log(db.Workout)

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
        db.Workout.find({})
            .then(exerciseData => {
                res.send(exerciseData);
            })
            .catch(err => {
                res.send(err);
            })
    })

    // PUT route for adding/updating the exercise in the workout collection
    app.put('/api/workouts/:id', async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        
        db.Workout.findById(id)
        .then(dbWorkout => {
            dbWorkout.exercises.push(data);
            return dbWorkout;
        })
        .then(dbWorkout => {
            db.Workout.findOneAndUpdate(
            { _id: id },
            { exercises: dbWorkout.exercises },
            { new: true }
            )
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
        })
        .catch(err => {
            res.json(err);
        });
    });
}
