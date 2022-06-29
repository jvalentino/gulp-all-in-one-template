"use strict";

const cli = require("../util/cli");
const packageJson = require("../util/package-json");

function retire(done) {
  retireAsync().then(() => {
    done();
  });
}

async function retireAsync() {
  const json = packageJson.parse();

  let command =
    "node_modules/.bin/./retire --js src --outputformat json --outputpath build/retire.json";

  if (json.settings != null && json.settings.securityFailsOnSeverity != null) {
    command += " --severity " + json.settings.securityFailsOnSeverity;
  } else {
    command += " --severity none";
  }

  await cli.execute(command);
}

module.exports = {
  retire: retire,
};
