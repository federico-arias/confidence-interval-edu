
var gulp = require('gulp');
var browserify = require('browserify');
//var Server = require('karma').Server;
var source = require('vinyl-source-stream');
 
//build for testing
gulp.task('build-test', function() {
    //return browserify('./src/scripts/sampling.js', {standalone: 'sampling'})
    return browserify('./src/scripts/main-test.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/scripts/'));
});

//build for production (minify, etc.)
gulp.task('build', function() {
    return browserify('./src/scripts/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/scripts/'));
});

/*
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
*/
