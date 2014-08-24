var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VolunteerSchema = new Schema({
    name: { type: String, default: '', trim: true },
    email: { type: String, default: '', trim: true },
    skill: { type: String, default: '', trim: true }

});

VolunteerSchema
    .path('name')
    .validate(function(value) {
        return value.length > 0;
    }, 'Volunteer name cannot be blank')

    .path('email')
    .validate(function(value) {
        return value.length > 0;
    }, 'Volunteer email cannot be blank')

    .path('skill')
    .validate(function(value) {
        return value.length > 0;
    }, 'Volunteer skill cannot be blank');


mongoose.model('Volunteer', VolunteerSchema);