var db = require('../services/db.js'),
    Member = db.model('Member');

module.exports = {
    post: function (req, res) {
        console.log(req.body);//For debugging
        Member.create({name: req.body.name,       email: req.body.email,             ISP: req.body.ISP,
                       address: req.body.address, phoneNumber: req.body.phoneNumber, want: req.body.want
        }, function(err, tm) {
            if (err) res.send(500, err);

            res.json(201, {
                message: 'Member created!',
                Member: tm
            });

        });
    },

    get: function (req, res) {
        Member.find()
            .exec(function(err, tms) {
                if (err) res.send(500, err);
                res.json(tms);
            });
    }
};




