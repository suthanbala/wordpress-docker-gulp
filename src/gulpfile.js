const { src, dest, parallel } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const path = require("path");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");

function concatFileName(file) {
  return file.dirname + "/" + file.basename + file.extname;
}

/**
 * Given the file object, we'll remove the src and the js/sass path removed. Then append the
 * `append` dirname to the path.
 * @param {object} file The file object with `dirname`, `basename` and `extension` properties
 * @param {string} levels How many levels to go up
 * @param {string} append The folder to append, once the `src` and the `folderName` removed
 */
function removeThemePathFromFilePath(file, levels = "../../", append = "") {
  const result = JSON.parse(JSON.stringify(file));
  result.dirname = path.relative(path.resolve(), path.resolve(result.dirname, levels, append));

  console.log("\n\n", concatFileName(file), concatFileName(result));
  return result;
}

/**
 * The command to serve the page
 */
function html() {
  return src("client/templates/*.pug").pipe(pug()).pipe(dest("build/html"));
}

/**
 * The task to convert the SASS file into css
 */
function css() {
  return src("themes/*/src/sass/*.scss")
    .pipe(sass())
    .pipe(rename((file) => removeThemePathFromFilePath(file, "../../", "css")))
    .pipe(dest('./css'));
}

/**
 * The task to convert the app js into minified and concat them together.
 */
function js() {
  return src("themes/*/src/js/*.js", { sourcemaps: true })
    .pipe(rename((file) => removeThemePathFromFilePath(file, "../../", "js")))
    .pipe(concat("main.min.js"))
    .pipe(dest("js", { sourcemaps: true }));
}

/**
 * The task to minify and concatenate the plugins
 */
function jsPlugins() {
  return src("themes/*/src/js/plugins/*.js", { sourcemaps: true })
    .pipe(rename((file) => removeThemePathFromFilePath(file, "../../../", "js")))
    .pipe(concat("plugins.min.js"))
    .pipe(dest("js", { sourcemaps: true }));
}

exports.js = js;
exports.jsPlugins = jsPlugins;
exports.css = css;
exports.html = html;
exports.default = parallel(css, js, jsPlugins);
