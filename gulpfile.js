/* eslint-disable */
var gulp = require('gulp');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var jeditor = require("gulp-json-editor");
var replace = require('gulp-replace');

gulp.task('start', function (cb) {
  return gulp.src('/')
    .pipe(shell('npm start'))
})

gulp.task('start-calabash-android', function(cb) {
  return gulp.src('/')
    .pipe(shell('npm run start-calabash-android'))
    .once('end', function () {
      process.exit();
    });
});

gulp.task('build-android', function(cb) {
  return gulp.src('/')
    .pipe(shell('npm run lint'))
    .pipe(shell('npm run build-android'))
});

gulp.task('test', function(cb) {
  return gulp.src('/')
    .pipe(shell('npm run test'))
});

gulp.task('testModeOn', function(cb) {
  return gulp.src('config.json')
    .pipe(jeditor({
      'testMode': 'true'
    }))
    .pipe(gulp.dest(""));
});

gulp.task('testModeOff', function(cb) {
  return gulp.src('config.json')
    .pipe(jeditor({
      'testMode': 'false'
    }))
    .pipe(gulp.dest(""));
});

gulp.task('test-android', function(callback) {
  runSequence('testModeOn', 'build-android',
              ['start', 'start-calabash-android'],
              callback);
});

gulp.task('android', function(cb) {
  return gulp.src('/')
    .pipe(shell('npm run lint'))
    .pipe(shell('npm run test'))
    .pipe(shell('react-native run-android'))
});

gulp.task('start-calabash-ios', function(cb) {
  return gulp.src('/')
    .pipe(shell('npm run start-calabash-ios'))
    .once('end', function () {
      process.exit();
    });
});

gulp.task('build-ios', function(cb) {
  return gulp.src('/')
    .pipe(shell('npm run lint'))
    .pipe(shell('npm run build-ios'))
});

gulp.task('test-ios', function(callback) {
  runSequence('testModeOn', 'build-ios',
              'start-calabash-ios',
              callback);
});

gulp.task('ios', function(cb) {
  return gulp.src('/')
    .pipe(shell('npm run lint'))
    .pipe(shell('npm run test'))
    .pipe(shell('react-native run-ios'))
});

gulp.task('fix-libs-versions', function(){
  var source = ['node_modules/react-native-contacts/android/build.gradle','node_modules/react-native-svg/android/build.gradle']
  gulp.src(source, {base: './'})
    .pipe(replace(/23.0.1/g,'25.0.0'))
    .pipe(gulp.dest('./'));
});
