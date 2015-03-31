var gulp = require('gulp');
var config = require('../config').locales;

gulp.task('locales', function() {
  return gulp.src(config.src).pipe(gulp.dest(config.dest));
});
