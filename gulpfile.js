var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var livereload = require('gulp-livereload');

var paths = {
    sass: ['./scss/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./css/'))
        .on('end', done)
        .pipe(livereload());
});

gulp.task('html', function(done) {
    gulp.src('./*.html')
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.sass, ['sass']);
    gulp.watch('*.html', ['html']);
});