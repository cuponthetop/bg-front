var gulp = require('gulp');
var tsc = require('gulp-typescript');
var runSequence = require('run-sequence');
var del = require('del');


gulp.task('build', function (callback) {
  runSequence('build-clean', 'tsc', callback);
});

gulp.task('build-clean', function () {
  return del('build');
});

gulp.task('tsc', function () {
  var tsProject = tsc.createProject('config/tsconfig.json', { noImplicitAny: true });
  var tsResult = gulp.src("src/**/*.ts") // or tsProject.src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('build'));
});