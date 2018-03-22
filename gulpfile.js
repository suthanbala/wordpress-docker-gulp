var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var path = require('path');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sourcemaps = require('gulp-sourcemaps');


// Paths
var paths = {
  sass: {
    src: "wp-content/themes/*/sass/*.scss",
    srcFile: "wp-content/themes/*/sass/style.scss"
  },
  scripts: {
    src: "wp-content/themes/*/js/src/*.js",
    concatFileName: "main.js"
  },
  phpFiles: {
    src: "wp-content/themes/**/*.php"
  }
};


var paths2 = {
  sass: {
    src: "src/themes/*/sass/*.scss"
  },
  scripts: {
    src: "src/themes/*/js/src/*.js",
    concatFileName: "main.js"
  },
  phpFiles: {
    src: "src/themes/**/*.php"
  }
};

// Compile the sass into css
gulp.task(function compileSass(done) {
  console.log('SASS File changed', paths.sass.src);
  return watch(paths.sass.src, function() {
    gulp.src(paths.sass.src)
      .pipe(sass())
      .pipe(rename(function(folder) {
        folder.dirname = path.join('themes', folder.dirname, '..');
        return folder;
      }))
      .pipe(gulp.dest(function(file) {
        newPath = path.join(file.base, '..');
        done();
        return newPath;
      }))
      .pipe(browserSync.stream());
  });
});

// Concat and uglify the JavaScript
gulp.task(function compileScripts(done) {
  console.log('Scripts File changed', paths.scripts.src);
  var startingDirectory = '';
  
  return watch(paths.scripts.src, function() {
    gulp.src(paths.scripts.src)
      .pipe(sourcemaps.init())
      .pipe(rename(function(folder) {
        // Remembering our initial file paths, it gets lost since we are
        // creating sourcemaps and concats
        folder.dirname = path.join('themes', folder.dirname, '..', '..', 'js');
        startingDirectory = folder.dirname;
        return folder;
      }))
      .pipe(concat(paths.scripts.concatFileName))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(rename(function(folder) {
        folder.dirname = startingDirectory;
        return folder;
      }))
      .pipe(gulp.dest(function(file) {
        // newPath = path.join(file.base, '..');
        console.log('JS PATH: ' + newPath);
        done();
        return newPath;
      }));
    });
});

// BrowserSync
gulp.task(function browserSyncify(done) {
  options = {};
  options.proxy = process.env.SITE_URL
  browserSync.init(options);
  // Reload the page on script change
  watch(paths.scripts.src, function() {
    console.log('Reloading for script changes');
    browserSync.reload();
  });

  // Reload the page on PHP file change
  watch(paths.phpFiles.src, function() {
    console.log('Reloading for PHP changes');
    browserSync.reload();
  });
  done();
});

// Watching PHP, JS, and SCSS files
// watch = gulp.series(sassify, gulp.parallel(browserSyncify, scriptify));

// gulp.task('watch', watch)

gulp.task('default', gulp.parallel('browserSyncify', 'compileScripts', 'compileSass'));
