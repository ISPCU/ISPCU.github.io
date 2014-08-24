// services/db.js

/**
 * We load mongoose
 */
var mongoose = require('mongoose'),
    fs = require('fs');
 
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
 * Run through models and load Schemas
 */
var models_path = '../models';
(function loadModels(path) {
    fs.readdirSync(models_path).forEach(function(file) {

        var newPath = models_path + '/' + file,
            stat = fs.statSync(newPath);

        // Require model files
        if (stat.isFile() && /.*\.(js|coffee)$/.test(file)) {
            require(newPath);
        } else if (stat.isDirectory()) {
            loadModels(newPath);
        }
    });
        
})(models_path);
 
module.exports = mongoose;
