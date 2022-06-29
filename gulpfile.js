"use strict";

const core = require("./src/core/hello-plugin");
const testPlugin = require("./src/build/test-plugin")


module.exports = {
	hello: core.hello,
	test: testPlugin.test
}