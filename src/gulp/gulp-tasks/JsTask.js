const { src, dest } = require("gulp");
const path = require("path");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const babel = require("gulp-babel");

const appPaths = require("../paths");
const { removeThemePathFromFilePath } = require("./utils");

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
    .pipe(
      babel({
        presets: ["@babel/env"],
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

module.exports = js;
