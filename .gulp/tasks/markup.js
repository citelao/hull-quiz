var gulp = require('gulp');
var config = require('../config').markup;
var inlineStyle = require('gulp-inline-style');

gulp.task('markup', ['sass'], function() {
  return gulp.src(config.src)
              .pipe(inlineStyle(config.dest))
              .pipe(gulp.dest(config.dest));
});
