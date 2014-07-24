var gulp = require('gulp'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
  less = require('gulp-less'),
  coffee = require('gulp-coffee');

var concat = require('gulp-concat-sourcemap');


gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: ['www', '.tmp']
  });
});

gulp.task('livereload', function() {
  gulp.src(['.tmp/styles/*.css', '.tmp/scripts/*.js'])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('less', function() {
  gulp.src('styles/main.less')
    .pipe(less())
    .pipe(gulp.dest('.tmp/styles'));
});


gulp.task('js', function() {


  options = {};
  options.sourceRoot = '/js/';
  options.prefix = 2;

  gulp.src(['./www/js/config.js','./www/js/app.js','./www/js/**/*.js'])
    .pipe(concat('application.js', options))
    .pipe(gulp.dest('./www/jsout/'))
    .pipe(connect.reload());


});

gulp.task('watch', function() {
  gulp.watch('./www/js/**/*.js', ['js']);
})

gulp.task('default', ['js', 'webserver', 'livereload', 'watch']);