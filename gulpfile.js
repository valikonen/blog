var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('styles', function () {
    return sass('src/sass/index.scss')
        .pipe(plumber())
        .on('error', sass.logError)
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dest/css'));
});


gulp.task('scripts', function () {
    return gulp.src(
        [
            'src/js/vendor/jquery-2.2.1.min.js',
            'src/js/custom/blog.js'
        ])
        .pipe(concat('all-js.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'))
        .pipe(gulp.dest('dest/js'));
});


gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['styles'])
    gulp.watch('src/js/**/*.js', ['scripts'])
});

gulp.task('default', ['styles', 'scripts', 'watch']);