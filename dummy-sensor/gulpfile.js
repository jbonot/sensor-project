'use strict';
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('pre-test-coverage', function () {
  return gulp.src(['./lib/**/*.js'])
      .pipe(istanbul())
      .pipe(istanbul.hookRequire());
});

gulp.task('test-coverage', ['pre-test-coverage'], function () {
  return gulp.src(['./test/*.js'])
      .pipe(mocha({timeout: 5000}))
      .pipe(istanbul.writeReports())
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('test', () =>
  gulp
    .src('./test/DummySensorTest.js', {read: false})
    .pipe(mocha({reporter: 'spec', timeout: 5000}))
);

gulp.task('default', () =>
  gulp
    .src('./test/DummySensorTest.js', {read: false})
    .pipe(mocha({reporter: 'spec', timeout: 5000}))
);
