"use strict";

const gulp = require("gulp");
const testPlugin = require("./test-plugin");
const prettierEslintPlugin = require("./prettier-eslint-plugin");

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

  exports.check = gulp.series(
    prettierEslintPlugin.prettiereslint,
    testPlugin.test
  );
}

module.exports = {
  apply: apply,
};
