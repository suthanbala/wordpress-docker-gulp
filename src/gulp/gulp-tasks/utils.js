const path = require('path');

/**
 * Given the filename, we prepare the fullpath
 * @param {Vynil Object} file Gulp Vynil object
 */
function concatFileName(file) {
  return file.dirname + "/" + file.basename + file.extname;
}

/**
 * Given the file object, we'll remove the src and the js or sass path removed. Then append the
 * `append` dirname to the path.
 * @param {object} file The file object with `dirname`, `basename` and `extension` properties
 * @param {string} levels How many levels to go up
 * @param {string} append The folder to append, once the `src` and the `folderName` removed
 */
function removeThemePathFromFilePath(file, levels = "../../", append = "") {
  const result = JSON.parse(JSON.stringify(file));
  result.dirname = path.relative(
    path.resolve(),
    path.resolve(result.dirname, levels, append)
  );

  // console.log("\n\n", concatFileName(file), concatFileName(result));
  return result;
}

module.exports = {
    concatFileName,
    removeThemePathFromFilePath
}