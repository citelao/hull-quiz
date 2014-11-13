var gulp          = require('gulp'),
    config        = require('../config').templates,
    streamqueue   = require("streamqueue"),
    templateCache = require("gulp-angular-templatecache"),
    minifyhtml    = require("gulp-minify-html"),
    concat        = require("gulp-concat"),
    plumber       = require("gulp-plumber");

var minifyhtmlOptions = { empty: true, spare: true, quotes: true };

gulp.task('templates', ['translate'], function() {
  var stream = streamqueue({ objectMode: true });

  var schemaFormTemplates = gulp.src(config.schemaForm.src)
    .pipe(plumber())
    .pipe(minifyhtml(minifyhtmlOptions))
    .pipe(templateCache({ module: 'schemaForm' }))

  var appTemplates = gulp.src(config.ship.src)
    .pipe(plumber())
    .pipe(minifyhtml(minifyhtmlOptions))
    .pipe(templateCache({ module: config.ship.module }))

  var ret = stream
    .queue(schemaFormTemplates)
    .queue(appTemplates)
    .done();


  ret.pipe(concat("templates.js")).pipe(gulp.dest(config.dest));

});
