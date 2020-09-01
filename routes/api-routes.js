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
        const data = req.body;
        console.log(id)
        console.log(typeof(data))

        db.Workout.update({ _id: id }, {$push: { exercises: data }})
        .then(exerciseData => {
            res.json(exerciseData)
        })
        .catch(err => {
            res.json(err);
        })
    });
}
