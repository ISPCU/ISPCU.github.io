var db = require('../models/db.js'),
    TestModel = db.model('TestModel');

module.exports = {
    make: function (req, res) {
        TestModel.create({}, function(err, tm) {
            if (err) res.send(500, err);

            res.json(201, {
                message: 'TestModel created!',
                testModel: tm
            });

        });
    },

    take: function (req, res) {
        TestModel.find()
            .exec(function(err, tms) {
                if (err) res.send(500, err);
                res.json(tms);
            });
    },
};
