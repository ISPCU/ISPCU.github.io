'use strict';

var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

gulp.task('styles', function() {
    return gulp.src('./assets/sass/**/*.{scss,sass}')
        .pipe(compass({
            style: 'expanded',
            css: './assets/css',
            sass: './assets/sass'
        }))
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(gulp.dest('./assets/css'))

        .pipe(notify({message: 'Styles task complete' }));
});

gulp.task('watch', ['client'], function() {
    var lr = require('gulp-livereload')();

    // Watch styles
    gulp.watch('./assets/sass/**/*.{scss,sass}', ['styles']);

    // Watch html
    gulp.watch([
        './**/*.{html,css}',
    ], function(file) {
        lr.changed(file.path);
    })
});


gulp.task('client', function() {
    gulp.start('styles');
});

// Build what we got
gulp.task('default', ['watch']);
