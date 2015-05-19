var gulp = require('gulp');
var config = require('../config').markup;
var Critical = require('critical');
var through2 = require('through2');
var _ = require('underscore');

 function critical(opts) {
    opts = opts || {};

    // parse options
    var command = opts.inline === false ? 'generate' : 'generateInline';

    if (!opts.base) {
        throw new PluginError('critical', 'A valid base path is required.');
    }

    // return stream
    return through2.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return this.emit('error', new PluginError('critical', 'Streaming not supported'));
        }

        var options = _.assign(opts, {
            html: file.contents.toString()
        });

        Critical[command](options, function (err, data) {
            if (err) {
                return new PluginError('critical', err.message);
            }

            // rename file if not inlined
            if (opts.inline === false) {
                file.path = replaceExtension(file.path, '.css');
            }

            file.contents = new Buffer(data);
            cb(err, file);
        });
    });
};

gulp.task('markup', function() {
  return gulp.src(config.src)
              .pipe(critical({ base: 'dist/', css: ['dist/assets/css/app.css'] }))
              .pipe(gulp.dest(config.dest));
});
