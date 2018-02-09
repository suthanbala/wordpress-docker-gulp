var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    options = {};
    options.proxy = process.env.SITE_URL
    browserSync.init(options);
    gulp.watch("wp-content/themes/**/*.scss", ['sass']);
    gulp.watch("wp-content/themes/**/*.php").on('change', browserSync.reload);
});


gulp.task('sass', function () {
    gulp.src('wp-content/themes/**/*.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest(function(file) {
          return '../css/' + file.base;
        }))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
