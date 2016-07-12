var gulp = require('gulp');
var uglify       = require('gulp-uglify');
var sourcemaps   = require('gulp-sourcemaps');
var webpack      = require('gulp-webpack');

var config = require('./webpack.config');

gulp.task('bundle:js', function() {
  return gulp.src('./src/index.js')
    .pipe(sourcemaps.init())
    .pipe(webpack(config))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});


gulp.task('build', ['bundle:js']);
