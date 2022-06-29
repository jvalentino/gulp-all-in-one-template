"use strict";

const core = require("./src/core/hello-plugin");
const commonBuild = require("./src/buildsys/common-build");

module.exports = {
	hello: core.hello,
}

commonBuild.apply(module.exports);