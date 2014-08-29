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
        // you must do a check to see if a value exists before calling functions to it,
        console.log(value);
        if(value)return value.length > 0;
    }, 'Volunteer name cannot be blank');
VolunteerSchema
    .path('email')
    .validate(function(value) {
        if(value)return value.length > 0;
    }, 'Volunteer email cannot be blank');
VolunteerSchema
    .path('skill')
    .validate(function(value) {
        if(value)return value.length > 0;
    }, 'Volunteer skill cannot be blank');


mongoose.model('Volunteer', VolunteerSchema);