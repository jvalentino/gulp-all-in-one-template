"use strict";

const gulp = require("gulp");
const testPlugin = require("./test-plugin");
const prettierEslintPlugin = require("./prettier-eslint-plugin");
const retirePlugin = require("./retire-plugin");

/**
 * Represents a collection of gulp tasks that will make up the common build. When this method
 * is called it injects these gulp tasks and series into the current environment.
 *
 * @param {module.exports} exports
 */
function apply(exports) {
  exports.test = testPlugin.test;
  exports.prettiereslint = prettierEslintPlugin.prettiereslint;
  exports.sca = prettierEslintPlugin.prettiereslint;
  exports.retire = retirePlugin.retire;
  exports.security = retirePlugin.retire;

  exports.check = gulp.series(
    prettierEslintPlugin.prettiereslint,
    retirePlugin.retire,
    testPlugin.test
  );
}

module.exports = {
  apply: apply,
};
