var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var TestModelSchema = new Schema({

    name: { type: String, default: 'test', trim: true }

});

mongoose.model('TestModel', TestModelSchema
