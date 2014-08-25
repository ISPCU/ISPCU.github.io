var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
    name: { type: String, default: '', trim: true },
    email: { type: String, default: '', trim: true },//(they'll check a box on if they want general newsletters as well)
    ISP: { type: String, default: '', trim: true },  //which I think means I need to add a boolean for this model
    address: { type: String, default: '', trim: true },
    phoneNumber: { type: String, default: '', trim: true },
    want: { type: String, default: '', trim: true }//We need to probably have something that works with option/dropdowns
                                                   //more appropriately. like an enum or something
                                                   /* -Reliability
                                                    *  -Customer Service
                                                    *  -Price
                                                    *  -Speed
                                                    * */

});

MemberSchema
    .path('name')
    .validate(function(value) {
        return value.length > 0;
    }, 'Member name cannot be blank')

    .path('email')
    .validate(function(value) {
        return value.length > 0;
    }, 'Member email cannot be blank')

    .path('ISP')
    .validate(function(value) {
        return value.length > 0;
    }, 'Member ISP cannot be blank')

    .path('address')
    .validate(function(value) {
        return value.length > 0;
    }, 'Member address cannot be blank')

    .path('phoneNumber')
    .validate(function(value) {
        return value.length > 0;
    }, 'Member phone number cannot be blank')

    .path('want')
    .validate(function(value) {
        return value.length > 0;
    }, 'Member want cannot be blank');


mongoose.model('Member', MemberSchema);