var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestModelSchema = new Schema({

    name: { type: String, default: 'test', trim: true }

});

mongoose.model('TestModel', TestModelSchema);
