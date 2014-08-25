var db = require('../services/db.js'),
    Member = db.model('Member');

module.exports = {
    make: function (req, res) {
        Member.create({}, function(err, tm) {
            if (err) res.send(500, err);

            res.json(201, {
                message: 'Member created!',
                Member: tm
            });

        });
    },

    take: function (req, res) {
        Member.find()
            .exec(function(err, tms) {
                if (err) res.send(500, err);
                res.json(tms);
            });
    }
};




