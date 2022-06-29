"use strict";

const cli = require("../util/cli");
const packageJson = require("../util/package-json");

function test(done) {
  testAsync().then(() => {
    done();
  });
}

async function testAsync() {
  const command =
    "node_modules/.bin/./c8 node_modules/.bin/./mocha --reporter spec ./test --recursive";

  await cli.execute(command);

  const json = packageJson.parse();
  if (json.settings != null && json.settings.requireCodeCoverageAbove != null) {
    console.log(
      `node_modules/.bin/./c8 check-coverage --lines ${json.settings.requireCodeCoverageAbove}`
    );
    await cli.execute(
      `node_modules/.bin/./c8 check-coverage --lines ${json.settings.requireCodeCoverageAbove}`
    );
  }
}

module.exports = {
  test: test,
};
