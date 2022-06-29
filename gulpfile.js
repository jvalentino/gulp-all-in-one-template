"use strict";

const core = require("./src/core/hello-plugin");
const testPlugin = require("./src/buildsys/test-plugin")


module.exports = {
	hello: core.hello,
	test: testPlugin.test
}