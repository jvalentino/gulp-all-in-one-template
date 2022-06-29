const expect    = require("chai").expect;
const sinon = require('sinon');
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const subject = require("../../src/util/cli");

describe("cli.js", function() {

    it("test execute with no output", async function() {
        const result = await subject.execute('ls -la');
        expect(result).to.equal("");
    });

    it("test execute with output", async function() {
        const result = await subject.execute('ls -la', true);
        expect(result).to.contain('package.json');
    });

});