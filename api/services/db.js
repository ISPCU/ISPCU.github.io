// services/db.js

/**
 * We load mongoose
 */
var mongoose = require('mongoose');
 
if (sails.config.environment === 'produciton')
    mongoose.connect(sails.config.connection.ispcuMongo.url)
else
    mongoose.connect(sails.config.connection.ispcuMongoDev.url)
  
/**
 * We check if the connection is ok
 * If so we will continue to load everything ...
 */
var db = mongoose.connection;

console.log('Try to connect to MongoDB via Mongoose ...');

db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function callback() {
         
    console.log('Connected to MongoDB !');
          
});
 
/**
 * Let's make our Mongodb Schemas/Models
 */
module.exports = {

    // MyModel: require('../models/MyModel.js')(mongoose)

}
