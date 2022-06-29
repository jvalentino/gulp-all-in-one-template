const expect    = require("chai").expect;
const sinon = require('sinon');
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const subject = require("../../src/buildsys/common-build");

const gulp = require("gulp");
const testPlugin = require("../../src/buildsys/test-plugin");
const prettierEslintPlugin = require("../../src/buildsys/prettier-eslint-plugin");

describe("common-build.js", function() {

    it("test apply", function() {
        // given
        const exports = {};

        // when
        subject.apply(exports);

        // then
        expect(exports.test).to.equal(testPlugin.test);
        expect(exports.prettiereslint).to.equal(prettierEslintPlugin.prettiereslint);
        expect(exports.sca).to.equal(prettierEslintPlugin.prettiereslint);
        

    });
});