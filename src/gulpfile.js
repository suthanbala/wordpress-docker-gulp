const { src, dest, parallel, series, watch } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const path = require("path");
const rename = require("gulp-rename");
const appPaths = require("./gulp/paths");


const { removeThemePathFromFilePath } = require("./gulp/gulp-tasks/utils");

// Load the tasks
const js = require("./gulp/gulp-tasks/JsTask");
const jsPlugins = require("./gulp/gulp-tasks/JsPlugins");

const server = browserSync.create();

const siteUrl = process.env.SITE_URL;

function reload(done) {
  server.reload();
  done();
}

function stream(done) {
  console.log('Trying to stream the css');
  server.stream();
  done();
}

function serve(done) {
  server.init({
    proxy: "http://test.suthanbala.com"
  });
  done();
}

/**
 * The task to convert the SASS file into css
 */
function css() {
  let relativePath;
  return src(appPaths.sass, { sourcemaps: true })
    .pipe(sass())
    .pipe(
      rename((file) => {
        const result = removeThemePathFromFilePath(file, "../../../");
        relativePath = file.dirname;
        return result;
      })
    )
    .pipe(server.stream())
    .pipe(
      dest(
        (file) => {
          // We go two levels up (`src/sass`), to the root folder
          finalPath = path.resolve(file.base, relativePath, "../../");
          return finalPath;
        },
        { sourcemaps: true }
      )
    );
}


function watchTask() {
  watch(appPaths.jsPath, series(js, reload));
  watch(appPaths.jsPluginsPath, series(jsPlugins, reload));
  watch(appPaths.sass, css);
}

const dev = series(jsPlugins, js, serve, watchTask);

exports.js = js;
exports.jsPlugins = jsPlugins;
exports.css = css;
exports.dev = dev;
exports.default = parallel(css, js, jsPlugins, dev);
