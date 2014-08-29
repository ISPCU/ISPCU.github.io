var db = require('../services/db.js'),
    Volunteer = db.model('Volunteer');

module.exports = {
    make: function (req, res) {
        console.log(req.body);
        Volunteer.create({name: req.body.name, email: req.body.email, skill: req.body.skill}, function(err, tm) {
            if (err) res.send(500, err);
            console.log(tm);
            if (tm) {
                return res.json(201, {
                    message: 'Volunteer created!',
                    Volunteer: tm
                });
            }

        });
    },

    take: function (req, res) {
        Volunteer.find({})
            .exec(function(err, tms) {
                if (err) res.send(500, err);
                res.json(tms);
            });
    }
};
