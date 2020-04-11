const { src, dest, parallel, series, watch } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const path = require("path");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");

const { removeThemePathFromFilePath } = require("./helpers/utils");

const server = browserSync.create();

const siteUrl = process.env.SITE_URL;

const appPaths = {
  sass: "themes/*/src/sass/*.scss",
  jsPath: "themes/*/src/js/*.js",
  jsPluginsPath: "themes/*/src/js/plugins/*.js",
};

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    proxy: "wordpress",
    open: false,
    port: 3000
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

/**
 * The task to convert the app js into minified and concat them together.
 */
function js() {
  let relativePath;
  return src(appPaths.jsPath, { sourcemaps: true })
    .pipe(
      rename((file) => {
        const result = removeThemePathFromFilePath(file, "../../");
        relativePath = file.dirname;
        return result;
      })
    )
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(
      dest(
        (file) => {
          // We go two levels up (`src/js`), then into `js/`
          finalPath = path.resolve(file.base, relativePath, "../../", "js");
          return finalPath;
        },
        { sourcemaps: true }
      )
    );
}

/**
 * The task to minify and concatenate the plugins
 */
function jsPlugins() {
  let relativePath;
  return src(appPaths.jsPluginsPath, { sourcemaps: true })
    .pipe(
      rename((file) => {
        const result = removeThemePathFromFilePath(file, "../../");
        relativePath = file.dirname;
        return result;
      })
    )
    .pipe(concat("plugins.min.js"))
    .pipe(
      dest(
        (file) => {
          // We go three levels up (`src/js/plugins`), then into `js/`
          finalPath = path.resolve(file.base, relativePath, "../../../", "js");
          return finalPath;
        },
        { sourcemaps: true }
      )
    );
}

const watchTask = () => watch(appPaths.jsPath, series(js, reload));

const dev = series(jsPlugins, js, serve);

exports.js = js;
exports.jsPlugins = jsPlugins;
exports.css = css;
exports.dev = dev;
exports.default = parallel(css, js, jsPlugins, dev);
