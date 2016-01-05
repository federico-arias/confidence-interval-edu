var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
//var Server = require('karma').Server;
 
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
gulp.task('scripts', function() {
    return browserify('./src/scripts/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('styles', function() {
    gulp.src('./src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['styles', 'scripts'], function() {
    // watch for JS changes
    gulp.watch('./src/scripts/*.js', function() {
    gulp.run('scripts');
    });

    // watch for CSS changes
    gulp.watch('./src/styles/*.scss', function() {
    gulp.run('styles');
    });
});

/*
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
*/
