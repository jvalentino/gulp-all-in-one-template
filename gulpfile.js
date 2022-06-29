"use strict";

const core = require("./src/core/hello-plugin");
const testPlugin = require("./src/buildsys/test-plugin")
const prettierEslint = require("./src/buildsys/prettier-eslint-plugin");


module.exports = {
	hello: core.hello,
	test: testPlugin.test,
	prettiereslint: prettierEslint.prettiereslint
}