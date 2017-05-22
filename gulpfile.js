var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var cssGlobbing = require('gulp-css-globbing');
var notify = require("gulp-notify");
var babel = require('gulp-babel');

gulp.task('style', function () {
  return gulp.src('app/scss/style.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('script', function() {
  return gulp.src('app/js/src/script.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('app/js/'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('cssmin', function(){
  return gulp.src('app/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('scripts', function() {
  return gulp.src('app/js/**/*.js')
    //.pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))  
  .pipe(gulp.dest('dist/images'))
});

gulp.task('pictures', function(){
  return gulp.src('app/pictures/**/*.+(png|jpg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))  
  .pipe(gulp.dest('dist/pictures'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
});

/////////////////////////////////////////////////
// Finalization tasks

gulp.task('watch', ['browserSync'], function() {
  // Watch .scss files
  gulp.watch('app/scss/**/*.scss', ['style']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['style', 'html', 'cssmin', 'scripts', 'images', 'pictures', 'fonts'],
    callback
  )
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