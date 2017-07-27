var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var cssGlobbing = require('gulp-css-globbing');
var notify = require("gulp-notify");
var babel = require('gulp-babel');

gulp.task('style', function () {
  return gulp.src('./scss/style.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Пока без бабеля
// gulp.task('script', function() {
//   return gulp.src('src/js/src/script.js')
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(gulp.dest('src/js/'));
// });

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

/////////////////////////////////////////////////
// Finalization tasks

gulp.task('watch', ['browserSync'], function() {
  // Watch .scss files
  gulp.watch('./scss/**/*.scss', ['style']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('./js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence(['style'], callback)
});

gulp.task('default', function(callback) {
  runSequence(['style','browserSync', 'watch'], callback)
});

/////////////////////////////////////////////////
// Utils

function onError(err) {
  console.log(err);
  this.emit('end');
}
