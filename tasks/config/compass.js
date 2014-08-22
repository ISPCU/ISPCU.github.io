/**
 * Compiles Compass SASS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-compass
 */
module.exports = function(grunt) {

    grunt.config.set('compass', {
        dev: {
            options: {
                require: [
                ],
                sassDir: 'assets/styles/',
                cssDir: '.tmp/public/styles/',
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
};
