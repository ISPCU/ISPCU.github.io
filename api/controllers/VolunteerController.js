var db = require('../services/db.js'),
    Volunteer = db.model('Volunteer');

module.exports = {
    make: function (req, res) {
        Volunteer.create({}, function(err, tm) {
            if (err) res.send(500, err);

            res.json(201, {
                message: 'Volunteer created!',
                Volunteer: tm
            });

        });
    },

    take: function (req, res) {
        Volunteer.find()
            .exec(function(err, tms) {
                if (err) res.send(500, err);
                res.json(tms);
            });
    }
};
