var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var path = require('path');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');


// Watching PHP, JS, and SCSS files
gulp.task('serve', ['sass', 'scripts'], function() {
    options = {};
    options.proxy = process.env.SITE_URL
    browserSync.init(options);
    gulp.watch("wp-content/themes/*/sass/*.scss", ['sass']);
    gulp.watch("wp-content/themes/*/js/src/*.js", ['scripts']).on('change', browserSync.reload);
    gulp.watch("wp-content/themes/**/*.php").on('change', browserSync.reload);
});

// JavaScripts
startingDirectory = '';
gulp.task('scripts', function() {
  return gulp.src('wp-content/themes/*/js/src/*.js')
      .pipe(sourcemaps.init())
      .pipe(rename(function(folder) {
        // Remembering our initial file paths, it gets lost since we are
        // creating sourcemaps and concats
        folder.dirname = path.join('themes', folder.dirname, '..', '..', 'js');
        startingDirectory = folder.dirname;
        return folder;
      }))
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(rename(function(folder) {
        folder.dirname = startingDirectory;
        return folder;
      }))
      .pipe(gulp.dest(function(file) {
          newPath = path.join(file.base, '..');
          console.log('JS PATH: ' + newPath);
          return newPath;
        }))
  });

// This compiles SASS and copies into css folder
gulp.task('sass', function () {
    gulp.src('wp-content/themes/*/sass/style.scss')
        .pipe(sass())
        .pipe(rename(function(folder) {
          folder.dirname = path.join('themes', folder.dirname, '..');
          console.log('CSS SRC PATH: ' + folder.dirname);
          return folder;
        }))
        .pipe(gulp.dest(function(file) {
          newPath = path.join(file.base, '..');
          console.log('CSS DEST PATH: ' + newPath);
          return newPath;
        }))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
