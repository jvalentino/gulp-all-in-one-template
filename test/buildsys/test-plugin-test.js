const expect    = require("chai").expect;
const sinon = require('sinon');
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const subject = require("../../src/buildsys/test-plugin");
const cli = require("../../src/util/cli");
const packageJson = require("../../src/util/package-json");

let cliMock = null;

describe("test-plugin.js", function() {

    beforeEach(() => {
        cliMock = sinon.mock(cli);
    });
  
    afterEach(() => {
        cliMock.restore();
    })
  
    it("test test when no quality gate", function(done) {
        // given
        cliMock.expects("execute").once().withArgs("node_modules/.bin/./c8 node_modules/.bin/./mocha --reporter spec ./test --recursive");
        sinon.stub(packageJson, 'parse').returns({});

        // when
        subject.test(done);

        // then
        cliMock.verify();
    });
  
    
  
  });