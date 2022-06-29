"use strict";

const cli = require("../util/cli");
const packageJson = require("../util/package-json");

/**
 * An abstraction for "gulp prettiereslint", which handles running prettier-eslint against src
 * if the package.json's settings.formatAndFixCode is set to true.
 *
 * @param {callback} done
 */
function prettiereslint(done) {
  prettiereslintAsync().then(() => {
    done();
  });
}

async function prettiereslintAsync() {
  const json = packageJson.parse();

  if (json.settings != null && json.settings.formatAndFixCode == true) {
    await cli.execute(
      `node_modules/.bin/./prettier-eslint "src/**/*.js" --write -l info`
    );
  }
}

module.exports = {
  prettiereslint: prettiereslint,
};
